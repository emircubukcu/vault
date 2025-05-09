"use client"

import { Member, Message, Profile } from "@prisma/client";
import { ChatWelcome } from "./chat-welcome";
import { useChatQuery } from "@/hooks/use-chat-query";
import { Loader2, ServerCrash } from "lucide-react";
import { Fragment, useState, useRef, ElementRef } from "react";
import { ChatItem } from "./chat-item";
import { format } from "date-fns";
import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult } from "@tanstack/react-query";
import { useChatSocket } from "@/hooks/use-chat-socket";
import { useChatScroll } from "@/hooks/use-chat-scroll";

import {motion} from "motion/react";

const DATE_FORMAT = "d MMM yyyy HH:mm"

interface ChatMessagesProps {
    name: string;
    member: Member;
    chatId: string;
    apiUrl: string;
    socketUrl: string;
    socketQuery: Record<string, string>;
    paramKey: "channelId" | "conversationId";
    paramValue: string;
    type: "channel" | "conversation";
}

type MessageWithMemberWithProfile = Message & {
    member: Member & {
        profile: Profile
    }
}

export const ChatMessages = ({
    name,
    member,
    chatId,
    apiUrl,
    socketUrl,
    socketQuery,
    paramKey,
    paramValue,
    type
}: ChatMessagesProps) => {

    const queryKey = `chat:${chatId}`;
    const addKey = `chat:${chatId}:messages`;
    const updateKey = `chat:${chatId}:messages:update`

    const chatRef = useRef<ElementRef<"div">>(null)
    const bottomRef = useRef<ElementRef<"div">>(null)

    const [data, setData] = useState<InfiniteData<any, unknown> | undefined>(undefined)
    const [status, setStatus] = useState<"pending" | "error" | "success">()

    let fetchNextPage!:(options?:FetchNextPageOptions)=> Promise<InfiniteQueryObserverResult<InfiniteData<any,unknown>,Error>>|((e:any)=>void)
    let hasNextPage, isFetchingNextPage

    useChatQuery({
        queryKey: queryKey,
        apiUrl: apiUrl,
        paramKey: paramKey,
        paramValue: paramValue
    }).then((e) => {
        let { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = e
        fetchNextPage = fetchNextPage, hasNextPage = hasNextPage, isFetchingNextPage = isFetchingNextPage
        setData(data)
        setStatus(status)
    })

    useChatSocket({ queryKey, addKey, updateKey })

    useChatScroll({chatRef,bottomRef,loadMore:fetchNextPage,shouldLoadMore:!isFetchingNextPage && !!hasNextPage,count:data?.pages?.[0]?.items.length??0})


    if (status === "pending") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader2 className="w-7 h-7 text-zinc-500 animate-spin my-4" />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Mesajlar yükleniyor..
                </p>
            </div>
        )
    }
    if (status === "error") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <ServerCrash className="w-7 h-7 text-zinc-500  my-4" />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Bir şeyler yanlış gitti
                </p>
            </div>
        )
    }


    return (
        <motion.div initial={{opacity:0,y:-20,filter:"blur(2px)"}} animate={{opacity:1,y:0,filter:"blur(0px)"}} ref={chatRef} className="flex-1 flex flex-col py-4 overflow-y-auto">
            {!hasNextPage && <div className="flex-1" />}
            {!hasNextPage && (
                <ChatWelcome type={type} name={name} />
            )}
            {hasNextPage &&(
                <div className="flex justify-center">
                    {isFetchingNextPage?(
                        <Loader2 className="h-6 w-6 text-zinc-500 animate-sping my-4" />
                    ):(
                        <button onClick={()=>{fetchNextPage()}} className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 text-xs my-4 dark:hover:text-zinc-300 transition">
                            Önceki mesajları yükle
                        </button>
                    )}
                </div>
            )}
            <div className="flex flex-col-reverse mt-auto">
                {data?.pages?.map((group, i) => (
                    <Fragment key={i}>
                        {group.items.map((message: MessageWithMemberWithProfile) => (
                            <ChatItem key={message.id} id={message.id} member={message.member} currentMember={member} content={message.content} fileUrl={message.fileUrl} deleted={message.deleted} timestamp={format(new Date(message.createdAt), DATE_FORMAT)} isUpdated={message.updatedAt !== message.createdAt} socketUrl={socketUrl} socketQuery={socketQuery} />
                        ))}
                    </Fragment>
                ))}
            </div>
            <div ref={bottomRef} />
        </motion.div>
    )
}