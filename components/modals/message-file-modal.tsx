"use client";
import qs from "query-string"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FileUpload } from "@/components/file-upload";
import axios from "axios"
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-model.store";


const formSchema = z.object({
    fileUrl: z.string().min(1, { message: "Eklenti eklenmeli" })
})


export const MessageFileModal = () => {
    const { isOpen, onClose, type, data } = useModal()
    const router = useRouter();

    const isModalOpen = isOpen && type === "messageFile";
    const { apiUrl, query } = data;

    const handleClose = () => {
        form.reset()
        onClose()
    }

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            fileUrl: ""
        }
    })
    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: apiUrl || "",
                query,
            })
            await axios.post(url, {
                ...values,
                content: values.fileUrl,
            });

            form.reset()
            router.refresh()
            handleClose()
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white dark:bg-[#1E1F22] dark:text-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6" >
                    <DialogTitle className="text-2xl text-center font-bold">
                        Dosya Ekle
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Göndermek istediğiniz dosyayı ekleyin
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField control={form.control} name="fileUrl" render={({ field }) => (
                                    <FormItem>
                                        <FormControl >
                                            <FileUpload endPoint="messageFile" value={field.value} onChange={field.onChange} />
                                        </FormControl>
                                    </FormItem>
                                )} />
                            </div>
                        </div>
                        <DialogFooter className="bg-gray-100 dark:bg-[#2B2D31] px-6 py-4">
                            <Button type="submit" variant={"primary"} disabled={isLoading}>Gönder</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}