"use client"
import { currentUser } from "@clerk/nextjs/server"
import { initialProfile } from "@/lib/inital-profile";
import { db } from "@/lib/db"
import { read } from "fs";
import { redirect } from "next/navigation";
import { InitialModal } from "@/components/modals/initial-modal";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Head from "next/head";
import { ModeToggle } from "@/components/mode-toggle";

const HomePage = async () => {

    const onClick = () => {
        redirect("/");
    }

    return (
        <>
            <div>
                <div className="sticky top-0 bg-[#E3E5E8] dark:bg-[#1E1F22] flex flex-row justify-start items-center">
                    <div className="w-full mx-8 my-4 p-4 rounded-lg bg-[#E3E5E8] dark:bg-[#1E1F22] flex flex-row justify-start items-center">
                        <div className="h-[40px] w-[40px]">
                            <picture>
                                <img src="/darkIcon.png" />
                            </picture>
                        </div>
                        <div className="text-black dark:text-white pl-5 text-xl antialiased font-bold">Vault</div>
                        <div className="flex-1 flex justify-end items-center">
                            <ModeToggle />
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
                <div className="bg-gradient-to-b from-[#E3E5E8] to-white pb-32  dark:from-[#1E1F22] dark:to-[#313338] overflow-y-scroll w-full">
                    <div className="w-full flex">
                        <div className="w-full flex flex-col justify-center items-center mt-6">
                            <div className="text-gray-600 dark:text-white text-6xl font-bold mb-4 ">Vault'a Hoşgeldiniz</div>
                            <div className="text-gray-500 dark:text-gray-300">Arkadaşlarınız ve topluluklarınızla kesintisiz bir iletişim deneyimi yaşayın.</div>
                        </div>
                    </div>
                    <div className="w-full flex mt-8">
                        <div className="w-full flex justify-center items-center">
                            <div className="aspect-video transition-all hover:cursor-pointer hover:scale-[105%] bg-gray-500 w-1/2 rounded-xl overflow-hidden border-[1px] border-gray-800 dark:border-gray-700">
                                <picture>
                                    <img src="darkMode1.png" className="w-full h-full" />
                                </picture>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-center items-center mt-8 p-5">
                        <button type="button" className="bg-[#1E1F22] dark:bg-white p-4 dark:text-black rounded-2xl hover:rounded-md transition-all hover:scale-[105%]">Daha fazla Bilgi</button>
                    </div>
                </div>
                <div className="w-full flex flex-row">
                    <div className="w-full flex justify-center items-center p-8">
                        <div className="aspect-video transition-all hover:cursor-pointer hover:scale-[105%] bg-gray-500 w-full rounded-xl overflow-hidden border-[1px] border-gray-800 dark:border-gray-700">
                            <picture>
                                <img src="darkMode1.png" className="w-full h-full" />
                            </picture>
                        </div>
                    </div>
                    <div className="w-full flex justify-center items-center flex-col px-12">
                        <div className="text-2xl text-gray-600 dark:text-white">Sunucu Oluştur</div>
                        <div className="text-lg text-gray-500 dark:text-gray-300 ">Kendi alanınızı yaratmak için bir sunucu oluşturun. Sunucu ismi belirleyin, topluluğunuzu yansıtan bir resim ekleyin.</div>
                    </div>
                </div>
                <div className="w-full pt-32 flex flex-row">
                    <div className="w-full flex justify-center items-center flex-col px-12">
                        <div className="text-2xl text-gray-600 dark:text-white">Arkadaşlarını Davet Et</div>
                        <div className="text-lg text-gray-500 dark:text-gray-300 ">Sunucunuza katılmaları için arkadaşlarına davet bağlantısı gönderin. Bağlantıyı paylaş ve topluluğunu büyüt.</div>
                    </div>
                    <div className="w-full flex justify-center items-center p-8">
                        <div className="aspect-video transition-all hover:cursor-pointer hover:scale-[105%] bg-gray-500 w-full rounded-xl overflow-hidden border-[1px] border-gray-800 dark:border-gray-700">
                            <picture>
                                <img src="darkMode1.png" className="w-full h-full" />
                            </picture>
                        </div>
                    </div>
                </div>
                <div className="w-full pt-32 flex flex-row">
                    <div className="w-full flex justify-center items-center p-8">
                        <div className="aspect-video transition-all hover:cursor-pointer hover:scale-[105%] bg-gray-500 w-full rounded-xl overflow-hidden border-[1px] border-gray-800 dark:border-gray-700">
                            <picture>
                                <img src="darkMode1.png" className="w-full h-full" />
                            </picture>
                        </div>
                    </div>
                    <div className="w-full flex justify-center items-center flex-col px-12">
                        <div className="text-2xl text-gray-600 dark:text-white">Sesli Sohbete Katıl</div>
                        <div className="text-lg text-gray-500 dark:text-gray-300">Topluluğunuzla birlikte sesli ve görüntülü sohbetler için oluşturulan sohbet kanallarına girin.</div>
                    </div>
                </div>
                <div className="w-full pt-32 flex flex-row">
                    <div className="w-full flex justify-center items-center flex-col px-12">
                        <div className="text-2xl text-gray-600 dark:text-white">Uygulama Olarak İndir</div>
                        <div className="text-lg text-gray-500 dark:text-gray-300">Sunucuna ulaşımını kolaylaştırmak için uygulamayı indir</div>
                    </div>
                    <div className="w-full flex justify-center items-center p-8">
                        <div className="aspect-video transition-all hover:cursor-pointer hover:scale-[105%] bg-gray-500 w-full rounded-xl overflow-hidden border-[1px] border-gray-800 dark:border-gray-700">
                            <picture>
                                <img src="darkMode1.png" className="w-full h-full" />
                            </picture>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;