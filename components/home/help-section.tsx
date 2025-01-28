"use client";

import { ArrowDown, Plus } from "lucide-react";
import { ActionTooltip } from "@/components/action-tooltip";
import { useModal } from "@/hooks/use-model.store";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";


interface HelpSectionItems {
    sectionID: string,
    side: "left" | "right" | "center",
    title: string,
    description: string,
    image: string,
    sectionType: "createServer" | "inviteFriends" | "joinVC" | "downloadApp" | "finalSection"
}

export const HelpSection = ({ sectionID, side, title, description, image, sectionType }: HelpSectionItems) => {
    const { onOpen } = useModal()

    const onClick = () => {
        redirect("/");
    }

    const openModal = () => {
        onOpen("helpModal", { helpSectionModalInfo: sectionType })
    }

    const nextSection = () => {
        var nextSectionID = parseInt(sectionID) + 1
        const section = document.getElementById(nextSectionID.toString());
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    }

    return (
        <div id={sectionID} className=" h-[calc(100dvh-56px)] md:h-[calc(100dvh-104px)] snap-start w-full flex justify-evenly md:justify-normal md:!flex-row flex-col">
            {side === "left" ? (
                <>
                    <div className="md:!flex hidden  w-full flex-col flex-wrap md:px-12 justify-center items-center">
                        <div className="h-1/2 w-full">
                            <div className="w-full text-2xl text-gray-600 dark:text-white font-semibold">{title}</div>
                            <div className="text-lg text-zinc-600 dark:text-zinc-400 font-normal mt-8">{description}</div>
                            <div className="w-full flex justify-start items-start mt-8">
                                <button type="button" className="bg-[#1E1F22]  text-white dark:bg-white p-4 dark:text-black rounded-2xl hover:rounded-md transition-all hover:scale-[105%]" onClick={openModal}>Detaylı Bilgi</button>
                                <button type="button" className="bg-[#E3E5E8]  text-black dark:bg-[#1E1F22] p-4 dark:text-white rounded-2xl hover:rounded-md transition-all hover:scale-[105%] ml-12 flex justify-between items-center" onClick={nextSection}>Devam et <ArrowDown /></button>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:!flex w-full justify-center items-center md:p-8">
                        <div className="aspect-video transition-all hover:cursor-pointer hover:scale-[105%] bg-gray-500 w-full rounded-xl overflow-hidden border-[1px] border-gray-800 dark:border-gray-700" onClick={openModal}>
                            <picture>
                                <img src={image} className="w-full h-full" />
                            </picture>
                        </div>
                    </div>

                </>
            ) : side === "right" ? (
                <>
                    <div className="hidden md:!flex w-full justify-center items-center md:p-8">
                        <div className="aspect-video transition-all hover:cursor-pointer hover:scale-[105%] bg-gray-500 w-full rounded-xl overflow-hidden border-[1px] border-gray-800 dark:border-gray-700" onClick={openModal}>
                            <picture>
                                <img src={image} className="w-full h-full" />
                            </picture>
                        </div>
                    </div>
                    <div className="hidden md:!flex  w-full flex-col flex-wrap md:px-12 justify-center items-center">
                        <div className="h-1/2 w-full">
                            <div className="w-full text-2xl text-gray-600 dark:text-white font-semibold">{title}</div>
                            <div className="text-lg text-zinc-600 dark:text-zinc-400 font-normal mt-8">{description}</div>
                            <div className="w-full flex justify-start items-start mt-8">
                                <button type="button" className="bg-[#1E1F22]  text-white dark:bg-white p-4 dark:text-black rounded-2xl hover:rounded-md transition-all hover:scale-[105%]" onClick={openModal}>Detaylı Bilgi</button>
                                <button type="button" className="bg-[#E3E5E8]  text-black dark:bg-[#1E1F22] p-4 dark:text-white rounded-2xl hover:rounded-md transition-all hover:scale-[105%] ml-12 flex justify-between items-center" onClick={nextSection}>Devam et <ArrowDown /></button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="w-full flex flex-col flex-wrap px-12 justify-center items-center bg-gradient-to-b from-white dark:from-[#313338] dark:to-[#5C60DE]/40 to-[#5C60DE]/40 ">
                        <div className="">
                            <div className="w-full text-5xl text-gray-600 dark:text-white font-semibold text-center">{title}</div>
                            <div className="text-lg text-zinc-600 dark:text-zinc-400 font-normal mt-8">{description}</div>
                            <div className="w-full flex justify-center items-center mt-16">
                                <SignedOut>
                                    <SignUpButton>
                                        <button type="button" className="flex px-4 py-2 rounded-lg hover:rounded-sm transition-all overflow-hidden items-center justify-center bg-transparent dark:bg-transparent hover:bg-[#4B5EFF] hover:text-white dark:hover:bg-[#4B5EFF]">
                                            Kayıt Ol
                                        </button>
                                    </SignUpButton>
                                    <SignInButton>
                                        <button type="button" className="flex mx-3 px-4 py-2 rounded-lg hover:rounded-sm transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500">
                                            Giriş Yap
                                        </button>
                                    </SignInButton>
                                </SignedOut >
                                <SignedIn>
                                    <button type="button" className="flex mx-3 px-4 py-2 rounded-lg hover:rounded-sm transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500" onClick={onClick}>Uygulamaya Devam Et</button>

                                    <UserButton afterSwitchSessionUrl="/" appearance={{
                                        elements: {
                                            avatarBox: "h-[48px] w-[48px]"
                                        }
                                    }} />
                                </SignedIn>
                            </div>
                        </div>
                    </div>
                </>
            )
            }
            {side !== "center" && (
                <>
                    <div className="md:!hidden flex w-full">
                        <div className="w-full flex flex-col justify-center items-center mt-6">
                            <div className="text-gray-600 dark:text-white text-2xl md:text-6xl font-bold mb-4 ">{title}</div>
                            <div className="text-gray-500 dark:text-gray-300 px-2 md:px-0">{description}</div>
                        </div>
                    </div>
                    <div className="md:!hidden flex w-full  mt-8">
                        <div className="w-full flex justify-center items-center">
                            <div onClick={openModal} className="aspect-video transition-all hover:cursor-pointer hover:scale-[105%] bg-gray-500 w-full mx-2 md:mx-0 md:w-1/2 rounded-xl overflow-hidden border-[1px] border-gray-800 dark:border-gray-700">
                                <picture>
                                    <img src={image} className="w-full h-full" />
                                </picture>
                            </div>
                        </div>
                    </div>
                    <div className="md:!hidden flex w-full justify-center items-center mt-8 p-5">
                        <button type="button" className="bg-[#1E1F22]  text-white dark:bg-white p-4 dark:text-black rounded-2xl hover:rounded-md transition-all hover:scale-[105%]" onClick={openModal}>Detaylı Bilgi</button>
                        <button type="button" className="bg-[#E3E5E8]  text-black dark:bg-[#1E1F22] p-4 dark:text-white rounded-2xl hover:rounded-md transition-all hover:scale-[105%] ml-12 flex justify-between items-center" onClick={nextSection}>Devam et <ArrowDown /></button>
                    </div>
                </>
            )
            }
        </div>
    )
}