import { HelpSection } from "@/components/home/help-section"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export const CreateServerHomeModal = () => {

    return (
        <>
            <div className="w-full h-full flex items-center">
                <Carousel className="w-full flex h-full">
                    <CarouselContent className="w-full h-full">
                        <CarouselItem className="w-full h-full">
                            <div className="w-full h-full flex md:!flex-row flex-col justify-evenly ml-4">
                                <div className="md:w-full md:h-full flex justify-center flex-col">
                                    <div className="w-full text-3xl text-gray-600 dark:text-white font-semibold">Sunucu Oluştur</div>
                                    <div className="text-gray-500 dark:text-gray-300 mt-8 tracking-wide">Kayıt olduktan sonra kendi sunucunuzu oluşturmanız için pencere açılır.Kendi topluluğunuzu yansıtan bir resim ve isim belirleyin.</div>
                                </div>
                                <div className="w-full flex justify-center items-center md:pr-4">
                                    <Carousel className="w-full flex">
                                        <CarouselContent className="w-full ">
                                            <CarouselItem className="w-full ">
                                                <div className="aspect-video transition-all bg-gray-500 w-full rounded-xl overflow-hidden border-[1px] border-gray-800 dark:border-gray-700">
                                                    <picture>
                                                        <img src="sc0.png" className="w-full h-full object-cover" />
                                                    </picture>
                                                </div>
                                            </CarouselItem>
                                            <CarouselItem className="w-full ">
                                                <div className="aspect-video transition-all bg-gray-500 w-full rounded-xl overflow-hidden border-[1px] border-gray-800 dark:border-gray-700">
                                                    <picture>
                                                        <img src="sc1.png" className="w-full h-full object-cover" />
                                                    </picture>
                                                </div>
                                            </CarouselItem>
                                        </CarouselContent>
                                        <CarouselPrevious className="left-[-20px]" />
                                        <CarouselNext className="right-0" />
                                    </Carousel>
                                </div>
                            </div>
                        </CarouselItem>
                        <CarouselItem className="w-full h-full">
                            <div className="w-full h-full flex md:!flex-row flex-col justify-evenly ml-4">
                                <div className="md:w-full md:h-full flex justify-center flex-col">
                                    <div className="w-full text-3xl text-gray-600 dark:text-white font-semibold">Kanal Oluştur</div>
                                    <div className="text-gray-500 dark:text-gray-300 mt-8 tracking-wide">Sunucuna özel sesli,görüntülü veya yazılı sohbet kanalları oluştur.</div>
                                </div>
                                <div className="w-full flex justify-center items-center md:pr-4">
                                    <Carousel className="w-full flex">
                                        <CarouselContent className="w-full ">
                                            <CarouselItem className="w-full ">
                                                <div className="aspect-video transition-all bg-gray-500 w-full rounded-xl overflow-hidden border-[1px] border-gray-800 dark:border-gray-700">
                                                    <picture>
                                                        <img src="cc0.png" className="w-full h-full object-cover" />
                                                    </picture>
                                                </div>
                                            </CarouselItem>
                                            <CarouselItem className="w-full ">
                                                <div className="aspect-video transition-all bg-gray-500 w-full rounded-xl overflow-hidden border-[1px] border-gray-800 dark:border-gray-700">
                                                    <picture>
                                                        <img src="cc1.png" className="w-full h-full object-cover" />
                                                    </picture>
                                                </div>
                                            </CarouselItem>
                                            <CarouselItem className="w-full ">
                                                <div className="aspect-video transition-all bg-gray-500 w-full rounded-xl overflow-hidden border-[1px] border-gray-800 dark:border-gray-700">
                                                    <picture>
                                                        <img src="cc2.png" className="w-full h-full object-cover" />
                                                    </picture>
                                                </div>
                                            </CarouselItem>
                                            <CarouselItem className="w-full ">
                                                <div className="aspect-video transition-all bg-gray-500 w-full rounded-xl overflow-hidden border-[1px] border-gray-800 dark:border-gray-700">
                                                    <picture>
                                                        <img src="cc3.png" className="w-full h-full object-cover" />
                                                    </picture>
                                                </div>
                                            </CarouselItem>
                                        </CarouselContent>
                                        <CarouselPrevious className="left-[-20px]" />
                                        <CarouselNext className="right-0" />
                                    </Carousel>
                                </div>
                            </div>
                        </CarouselItem>
                        <CarouselItem className="w-full h-full">
                            <div className="w-full h-full flex md:!flex-row flex-col justify-evenly ml-4">
                                <div className="md:w-full md:h-full flex justify-center flex-col">
                                    <div className="w-full text-3xl text-gray-600 dark:text-white font-semibold">Kullanıcıları Yönet</div>
                                    <div className="text-gray-500 dark:text-gray-300 mt-8 tracking-wide">Topluluğunuza katılan kullanıcıları yönetin. Yönetimi kolaylaştırmak için yetkilendirme yapın.</div>
                                </div>
                                <div className="w-full flex justify-center items-center md:pr-4">
                                    <Carousel className="w-full flex">
                                        <CarouselContent className="w-full ">
                                            <CarouselItem className="w-full ">
                                                <div className="aspect-video transition-all bg-gray-500 w-full rounded-xl overflow-hidden border-[1px] border-gray-800 dark:border-gray-700">
                                                    <picture>
                                                        <img src="mu0.png" className="w-full h-full object-cover" />
                                                    </picture>
                                                </div>
                                            </CarouselItem>
                                            <CarouselItem className="w-full ">
                                                <div className="aspect-video transition-all bg-gray-500 w-full rounded-xl overflow-hidden border-[1px] border-gray-800 dark:border-gray-700">
                                                    <picture>
                                                        <img src="mu1.png" className="w-full h-full object-cover" />
                                                    </picture>
                                                </div>
                                            </CarouselItem>
                                            <CarouselItem className="w-full ">
                                                <div className="aspect-video transition-all bg-gray-500 w-full rounded-xl overflow-hidden border-[1px] border-gray-800 dark:border-gray-700">
                                                    <picture>
                                                        <img src="mu2.png" className="w-full h-full object-cover" />
                                                    </picture>
                                                </div>
                                            </CarouselItem>
                                        </CarouselContent>
                                        <CarouselPrevious className="left-[-20px]" />
                                        <CarouselNext className="right-0" />
                                    </Carousel>
                                </div>
                            </div>
                        </CarouselItem>
                        <CarouselItem className="w-full h-full">
                            <div className="w-full h-full flex md:!flex-row flex-col justify-evenly ml-4">
                                <div className="md:w-full md:h-full flex justify-center flex-col">
                                    <div className="w-full text-3xl text-gray-600 dark:text-white font-semibold">Sunucunuzu Kişiselleştirin</div>
                                    <div className="text-gray-500 dark:text-gray-300 mt-8 tracking-wide">Topluluğunuzun isteklerine göre sunucunuzun ismini ve temsil için olan resmini değiştirebilirsiniz.</div>
                                </div>
                                <div className="w-full flex justify-center items-center md:pr-4">
                                    <Carousel className="w-full flex">
                                        <CarouselContent className="w-full ">
                                            <CarouselItem className="w-full ">
                                                <div className="aspect-video transition-all bg-gray-500 w-full rounded-xl overflow-hidden border-[1px] border-gray-800 dark:border-gray-700">
                                                    <picture>
                                                        <img src="mss0.png" className="w-full h-full object-cover" />
                                                    </picture>
                                                </div>
                                            </CarouselItem>
                                            <CarouselItem className="w-full ">
                                                <div className="aspect-video transition-all bg-gray-500 w-full rounded-xl overflow-hidden border-[1px] border-gray-800 dark:border-gray-700">
                                                    <picture>
                                                        <img src="mss1.png" className="w-full h-full object-cover" />
                                                    </picture>
                                                </div>
                                            </CarouselItem>
                                        </CarouselContent>
                                        <CarouselPrevious className="left-[-20px]" />
                                        <CarouselNext className="right-0" />
                                    </Carousel>
                                </div>
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className="ml-6"/>
                    <CarouselNext className="mr-6" />
                </Carousel>
            </div>

        </>
    )
}