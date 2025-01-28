import { HelpSection } from "@/components/home/help-section"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export const JoinVCHome = () => {

    return (
        <>
            <div className="w-full h-full flex items-center">
                <Carousel className="w-full flex h-full">
                    <CarouselContent className="w-full h-full">
                        <CarouselItem className="w-full h-full">
                            <div className="w-full h-full flex md:!flex-row flex-col justify-evenly ml-4">
                                <div className="md:w-full md:h-full flex justify-center flex-col">
                                    <div className="w-full text-3xl text-gray-600 dark:text-white font-semibold">Sohbetlere katıl</div>
                                    <div className="text-gray-500 dark:text-gray-300 mt-8 tracking-wide">Sunucunuz üzerindeki sohbet kanallarına katıl. Sunucunun içindeki sohbet kanalları içerisinde oluşturulmuş olan kanallardan istediğinizde arkadaşlarınızla buluşun ve konuşun</div>
                                </div>
                                <div className="w-full flex justify-center items-center md:pr-4">
                                    <Carousel className="w-full flex">
                                        <CarouselContent className="w-full ">
                                            <CarouselItem className="w-full ">
                                                <div className="aspect-video transition-all bg-gray-500 w-full rounded-xl overflow-hidden border-[1px] border-gray-800 dark:border-gray-700">
                                                    <picture>
                                                        <img src="vcj0.png" className="w-full h-full object-cover" />
                                                    </picture>
                                                </div>
                                            </CarouselItem>
                                            <CarouselItem className="w-full ">
                                                <div className="aspect-video transition-all bg-gray-500 w-full rounded-xl overflow-hidden border-[1px] border-gray-800 dark:border-gray-700">
                                                    <picture>
                                                        <img src="vcj1.png" className="w-full h-full object-cover" />
                                                    </picture>
                                                </div>
                                            </CarouselItem>
                                            <CarouselItem className="w-full ">
                                                <div className="aspect-video transition-all bg-gray-500 w-full rounded-xl overflow-hidden border-[1px] border-gray-800 dark:border-gray-700">
                                                    <picture>
                                                        <img src="vcj2.png" className="w-full h-full object-cover" />
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