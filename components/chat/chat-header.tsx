import { Hash } from "lucide-react";
import { MobileToggle } from "@/components/mobile-toggle";
import { UserAvatar } from "@/components/user-avatar";
import { SocketIndicator } from "@/components/socket-indicator";
import { ChatVideoButton } from "./chat-video-button";

import * as motion from "motion/react-client"

interface ChatHeaderProps {
    serverId: string;
    name: string;
    type: "channel" | "conversation";
    imageUrl?: string;
}

export const ChatHeader = ({
    serverId,
    name,
    type,
    imageUrl
}: ChatHeaderProps) => {
    return (
        <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
            <MobileToggle serverId={serverId} />
            {type === "channel" && (
                <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
            )}
            {type === "conversation" && (
                <UserAvatar src={imageUrl} className="h-8 w-8 md:h-8 md:w-8 mr-2" />
            )}
            <motion.p initial={{y:-10,filter:"blur(4px)"}} animate={{y:0,filter:"blur(0px)"}} className="font-semibold text-md text-black dark:text-white">{name}</motion.p>
            <div className="ml-auto flex items-center">
                {type==="conversation" &&(
                    <ChatVideoButton />
                )}
            </div>
        </div>
    )
}