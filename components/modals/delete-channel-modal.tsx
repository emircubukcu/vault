"use client";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useModal } from "@/hooks/use-model.store";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import qs from "query-string"

export const DeleteChannelModal = () => {
    const { isOpen, onClose, type, data } = useModal()
    const router = useRouter()

    const { server, channel } = data;

    const [isLoading, setIsLoading] = useState(false)
    const isModalOpen = isOpen && type === "deleteChannel"

    const onClick = async () => {
        try {
            setIsLoading(true);

            const url = qs.stringifyUrl({
                url: `/api/channels/${channel?.id}`,
                query: {
                    serverId: server?.id
                }
            })

            await axios.delete(url)

            onClose()
            router.refresh()
            router.push(`/servers/${server?.id}`)
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white dark:bg-[#1E1F22] dark:text-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6" >
                    <DialogTitle className="text-2xl text-center font-bold">
                        Kanalı sil
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        İşleme devam etmek istediğinize emin misiniz? <br />
                        <span className="font-semibold text-indigo-500">#{channel?.name}</span> isimli kanal tamamen silinecek
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 dark:bg-[#2B2D31]  px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button disabled={isLoading} onClick={onClose} variant="ghost">İptal</Button>
                        <Button disabled={isLoading} onClick={onClick} variant="primary">Onayla</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}