'use client'

import { useState, useEffect } from 'react'
import { subscribeUser, unsubscribeUser, sendNotification } from "@/app/actions"

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";



import webpush from 'web-push'

function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding)
        .replace(/\\-/g, '+')
        .replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}

function PushNotificationManager() {
    const [isSupported, setIsSupported] = useState(false)
    const [subscription, setSubscription] = useState<PushSubscription | null>(
        null
    )
    const [message, setMessage] = useState('')

    useEffect(() => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            setIsSupported(true)
            registerServiceWorker()
        }
    }, [])

    async function registerServiceWorker() {
        const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
            updateViaCache: 'none',
        })
        const sub = await registration.pushManager.getSubscription()
        setSubscription(sub)
    }

    async function subscribeToPush() {
        const registration = await navigator.serviceWorker.ready
        const sub = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
                process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
            ),
        })
        setSubscription(sub)

        const decoder=new TextDecoder();

        var tempAuth= sub.getKey("auth")!
        var tempP256dh=sub.getKey("p256dh")!

        var authStr=decoder.decode(tempAuth)
        var p256Str=decoder.decode(tempP256dh)

        var tempSub: webpush.PushSubscription={
            keys:{
                auth:authStr,
                p256dh:p256Str
            },
            endpoint:sub.endpoint,
            expirationTime:sub.expirationTime
        }

        await subscribeUser(tempSub)
    }

    async function unsubscribeFromPush() {
        await subscription?.unsubscribe()
        setSubscription(null)
        await unsubscribeUser()
    }

    async function sendTestNotification() {
        if (subscription) {
            await sendNotification(message)
            setMessage('')
        }
    }

    if (!isSupported) {
        return <p>Push notifications are not supported in this browser.</p>
    }

    return (
        <div>
            <h3>Push Notifications</h3>
            {subscription ? (
                <>
                    <p>You are subscribed to push notifications.</p>
                    <button onClick={unsubscribeFromPush}>Unsubscribe</button>
                    <input
                        type="text"
                        placeholder="Enter notification message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button onClick={sendTestNotification}>Send Test</button>
                </>
            ) : (
                <>
                    <p>You are not subscribed to push notifications.</p>
                    <button onClick={subscribeToPush}>Subscribe</button>
                </>
            )}
        </div>
    )
} function InstallPrompt() {
    const [isIOS, setIsIOS] = useState(false)
    const [isStandalone, setIsStandalone] = useState(false)

    useEffect(() => {
        setIsIOS(
            /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
        )

        setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
    }, [])

    if (isStandalone) {
        return null // Don't show install button if already installed
    }

    return (
        <div>
            <h3>Install App</h3>
            <button>Add to Home Screen</button>
            {isIOS && (
                <p>
                    
                </p>
            )}
        </div>
    )
}
interface ServerIdPageProps {
    params: Promise<{
        serverId: string;
    }>
}


const ServerPage = async ({
    params
}: ServerIdPageProps) => {
    const profile = await currentProfile()
    const { serverId } = await params

    if (!profile) {
        return RedirectToSignIn;
    }

    const server = await db.server.findUnique({
        where: {
            id: serverId,
            members: {
                some: {
                    profileId: profile.id,
                }
            }
        },
        include: {
            channels: {
                where: {
                    name: "general"
                },
                orderBy: {
                    createdAt: "asc"
                }
            }
        }
    })

    const initialChannel = server?.channels[0];

    if (initialChannel?.name !== "general") {
        return null;
    }

    return redirect(`/servers/${serverId}/channels/${initialChannel?.id}`)
}

export default ServerPage;