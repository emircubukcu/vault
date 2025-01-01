"use client";




import {Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle} from "@/components/ui/dialog"
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

import { useEffect ,useState} from "react";
import { useForm } from "react-hook-form";

import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { FileUpload } from "@/components/file-upload";
import axios from "axios"
import { useRouter } from "next/navigation";

import { subscribeUser, unsubscribeUser, sendNotification } from '@/app/actions'

import webpush from 'web-push'
import { useModal } from "@/hooks/use-model.store";

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

export default function Page() {
    return (
        <div>
            <PushNotificationManager />
            <InstallPrompt />
        </div>
    )
}



const formSchema=z.object({
    name:z.string().min(1,{message:"Sunucu ismi zorunlu"}),
    imageUrl:z.string().min(1,{message:"Sunucu resmi zorunlu"})
})


export const InitialModal = () => {
    
    const {isOpen,onClose,type}=useModal()
    const [isMounted,setIsMounted]=useState(false)
    const router =useRouter();

    useEffect(()=>{
        setIsMounted(true)
    },[])

    const form=useForm({
        resolver:zodResolver(formSchema),
        defaultValues:{
            name:"",
            imageUrl:""
        }
    })
    const isLoading=form.formState.isSubmitting;
    
    const onSubmit=async(values:z.infer<typeof formSchema>)=>{
        try{
            await axios.post("/api/servers",values);

            form.reset()
            router.refresh()
            window.location.reload()
        }
        catch(error){
            console.log(error)
        }
    }

    if(!isMounted){
        return null
    }
    const handleClose=()=>{
        form.reset()
        onClose()
    }

    return (
        <Dialog open onOpenChange={handleClose}>
            <DialogContent className="bg-white dark:bg-[#1E1F22] dark:text-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6" >
                    <DialogTitle className="text-2xl text-center font-bold">
                        Sunucunuzu özelleştirin
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500 dark:text-white/80">
                        Sunucunuza isim ve resim ekleyin. Sonradan da değişiklik yapabilirsiniz
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField control={form.control} name="imageUrl" render={({field})=>(
                                    <FormItem>
                                        <FormControl >
                                            <FileUpload endPoint="serverImage" value={field.value} onChange={field.onChange} />
                                        </FormControl>
                                    </FormItem>
                                )} />
                            </div>
                            <FormField control={form.control} name="name" render={({field})=>(
                                <FormItem>
                                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white/80">Sunucu ismi</FormLabel>
                                    <FormControl>
                                        <Input disabled={isLoading} className="bg-zinc-300/50 dark:bg-[#2B2D31] dark:text-white/60 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0" placeholder="Sunucu ismi giriniz" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                        </div>
                        <DialogFooter className="bg-gray-100 dark:bg-[#2B2D31] px-6 py-4">
                            <Button type="submit" variant={"primary"} disabled={isLoading}>Oluştur</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}