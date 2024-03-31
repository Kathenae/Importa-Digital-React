import Banner from '@img/background.png';

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from "react";

export default function SlideBanner() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: false }, [Autoplay()])
    const [selectedIndex, setSelectedIndex] = useState(0)

    const scrollTo = (index: number) => {

        if (index < 0) {
            index = 5
        }
        else if (index >= 6) {
            index = 0
        }

        emblaApi?.scrollTo(index)
        setSelectedIndex(index)
    }

    const onSelect = useCallback((api: any) => {
        setSelectedIndex(api?.selectedScrollSnap())
    }, [])

    useEffect(() => {
        if (!emblaApi) return
        onSelect(emblaApi)
        emblaApi.on('reInit', onSelect)
        emblaApi.on('select', onSelect)
    }, [emblaApi, onSelect])

    return (
        <>
            <section id="banner-section" className="overflow-hidden p-0 relative hidden lg:block" ref={emblaRef}>
                <div className="flex h-[800px] lg:h-full">
                    <img src={Banner} className="w-full mx-12 object-cover" style={{ flex: "0 0 100%", boxShadow: "black 20px 20px 100px" }} />
                    <img src={Banner} className="w-full mx-12 object-cover" style={{ flex: "0 0 100%", boxShadow: "black 20px 20px 100px" }} />
                    <img src={Banner} className="w-full mx-12 object-cover" style={{ flex: "0 0 100%", boxShadow: "black 20px 20px 100px" }} />
                    <img src={Banner} className="w-full mx-12 object-cover" style={{ flex: "0 0 100%", boxShadow: "black 20px 20px 100px" }} />
                    <img src={Banner} className="w-full mx-12 object-cover" style={{ flex: "0 0 100%", boxShadow: "black 20px 20px 100px" }} />
                    <img src={Banner} className="w-full mx-12 object-cover" style={{ flex: "0 0 100%", boxShadow: "black 20px 20px 100px" }} />
                </div>

                {/* Arrows */}
                <div className="absolute pointer-events-none z-10 top-0 left-0 w-full h-full px-2 lg:px-16 flex items-center justify-between space-x-4">
                    <button className="embla__prev pointer-events-auto transition-all opacity-100 hover:opacity-50 p-4 rounded-full h-16 w-16" onClick={() => scrollTo(selectedIndex - 1)}>
                        <img src={""} className='transform rotate-180' />
                    </button>
                    <button className="embla__next pointer-events-auto transition-all opacity-100 hover:opacity-50 p-4 rounded-full h-16 w-16" onClick={() => scrollTo(selectedIndex + 1)}>
                        <img src={""} />
                    </button>
                </div>

                {/* Dots */}
                <div className="absolute bottom-4 left-0 w-full flex items-center justify-center space-x-4">
                    <button onClick={() => scrollTo(0)} className={`h-2 w-2 bg-black border rounded-full transition-all scale-100 hover:scale-125 ${selectedIndex === 0 && "bg-white border-secondary-base opacity-100" } `} />
                    <button onClick={() => scrollTo(1)} className={`h-2 w-2 bg-black border rounded-full transition-all scale-100 hover:scale-125 ${selectedIndex === 1 && "bg-white border-secondary-base opacity-100" } `} />
                    <button onClick={() => scrollTo(2)} className={`h-2 w-2 bg-black border rounded-full transition-all scale-100 hover:scale-125 ${selectedIndex === 2 && "bg-white border-secondary-base opacity-100" } `} />
                    <button onClick={() => scrollTo(3)} className={`h-2 w-2 bg-black border rounded-full transition-all scale-100 hover:scale-125 ${selectedIndex === 3 && "bg-white border-secondary-base opacity-100" } `} />
                    <button onClick={() => scrollTo(4)} className={`h-2 w-2 bg-black border rounded-full transition-all scale-100 hover:scale-125 ${selectedIndex === 4 && "bg-white border-secondary-base opacity-100" } `} />
                    <button onClick={() => scrollTo(5)} className={`h-2 w-2 bg-black border rounded-full transition-all scale-100 hover:scale-125 ${selectedIndex === 5 && "bg-white border-secondary-base opacity-100" } `} />
                </div>
            </section>
        </>
    )
}
