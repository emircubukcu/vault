"use client"

import Image from "next/image"
import { useParams, useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { ActionTooltip } from "@/components/action-tooltip"

interface NavigationItemProps {
    id: string;
    imageUrl: string;
    name: string;
}

export const NavigationItem = ({
    id, imageUrl, name
}: NavigationItemProps) => {
    const params = useParams()
    const router = useRouter()

    const onClick=()=>{
        router.push(`/servers/${id}`);
    }

    return (
        <ActionTooltip side="right" align="center" label={name}>
            <button onClick={onClick} className="w-full group relative flex items-center justify-center">
                <div className={cn(
                    "relative group  flex items-center h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
                    params?.serverId === id && "bg-primary/10 text-primary rounded-[16px] border-2 border-black/60 dark:border-white/60"
                )}>
                    <Image fill src={imageUrl} alt="Sunucu" />
                </div>
            </button>
        </ActionTooltip>
    )
}