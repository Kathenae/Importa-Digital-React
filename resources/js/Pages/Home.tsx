import Layout from "@/Layouts/Layout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import Check from '@img/check.png';

import Hero from '@img/Hero.png'
import Mark from '@img/mark.png';
import Bg1 from '@img/bg-1.png';
import Bg2 from '@img/bg-2.png';
import Bg3 from '@img/bg-3.png';
import Curso1 from '@img/item-1.png';
import Curso2 from '@img/item-2.png';
import Curso3 from '@img/item-3.png';
import SlideBanner from "@/Components/SlideBanner";

export default function Home(props: PageProps) {
    const { } = props
    return (
        <Layout {...props}>
            <Head title="Home" />

            <SlideBanner />
            <div className='w-full relative hidden lg:block'>
                <img src={Bg2} className='w-full' />
                <div className='absolute top-0 left-0 w-full h-full text-center flex justify-center items-center bg-secondary-base bg-opacity-70'>
                    <h3 className='text-3xl font-bold text-white'>EL <span className='text-primary-base'>FUTURO</span> EMPIEZA AQUI</h3>
                </div>
            </div>

            <section className='container py-12 lg:py-32 mx-auto relative'>
                <div className='w-full flex flex-col items-center justify-center'>
                    <h1 className='uppercase text-center font-extrabold text-2xl lg:text-6xl text-secondary-base'>Nuestros Cursos</h1>
                    <img className='ml-[100px] lg:ml-[230px]' width={54} src={Mark} />
                </div>

                <div className='w-full flex flex-col lg:flex-row mt-12 gap-x-4 gap-y-24'>
                    <div className='flex flex-col items-center'>
                        <img src={Curso1} />
                        <img className='mt-4' src={Check} width={24} />
                        <span className='font-bold text-center mt-2'>TÉCNICO SUPERIOR EN ELECTROMECANICA</span>
                    </div>
                    <div className='flex flex-col items-center'>
                        <img src={Curso2} />
                        <img className='mt-4' src={Check} width={24} />
                        <span className='font-bold text-center mt-2'>TÉCNICO SUPERIOR EN ELECTROMECANICA</span>
                    </div>
                    <div className='flex flex-col items-center'>
                        <img src={Curso3} />
                        <img className='mt-4' src={Check} width={24} />
                        <span className='font-bold text-center mt-2'>TÉCNICO SUPERIOR EN ELECTROMECANICA</span>
                    </div>
                </div>

                <div className='flex items-center justify-center w-full mt-12 relative'>
                    <a className='text-lg lg:text-3xl rounded-full font-bold px-14 py-1 from-primary-base to-primary-accent bg-gradient-to-br text-secondary-base hover:text-white transition' href="">¡Inscribite ya!</a>
                    <a className="text-center font-bold text-gray-700 hover:underline group absolute right-4 top-2 xl:flex items-center space-x-2 hidden" href="">
                        <span>Ver más cursos</span>
                        <i className='i-lucide-chevrons-right text-3xl scale-100 group-hover:scale-150 transform transition-all' />
                    </a>
                </div>

                <div className='w-full flex items-center justify-center mt-2 xl:hidden'>
                    <a className="text-center font-bold text-gray-700 hover:underline" href="">Ver más cursos</a>
                </div>
            </section>

            <div className='w-full relative hidden lg:block'>
                <img src={Bg1} className='w-full' />
                <div className='absolute top-0 left-0 w-full h-full text-center flex flex-col justify-center items-center bg-secondary-base bg-opacity-70'>
                    <h3 className='text-5xl font-extrabold text-white'>ACCEDE A LAS CLASES</h3>
                    <a className='text-lg lg:text-3xl rounded-full font-bold px-14 py-1 from-primary-base to-primary-accent bg-gradient-to-br text-secondary-base hover:text-white transition mt-6' href="">EMPEZAR</a>
                </div>
            </div>

            <section className='container py-12 lg:py-32 mx-auto relative'>
                <div className='w-full flex flex-col items-center justify-center mt-12'>
                    <h1 className='uppercase text-center font-extrabold text-2xl lg:text-6xl text-secondary-base'>Quiénes somos</h1>
                    <img className='ml-[100px] lg:ml-[230px]' width={54} src={Mark} />
                </div>
                <div className='w-full flex mt-12 gap-x-4'>
                    <video controls className='object-cover aspect-video w-full bg-gray-500 rounded-xl' />
                </div>

                <div className='w-full mt-32 relative from-primary-base to-primary-accent bg-gradient-to-tr rounded-lg xl:from-transparent xl:to-transparent xl:bg-transparent'>
                    <img src={Bg3} className='hidden xl:block' />
                    <form className='w-full xl:w-[500px] h-full py-4 px-8 xl:absolute top-0 left-0 flex flex-col'>
                        <h2 className='text-white text-4xl font-extrabold uppercase'>habla con nosotros</h2>
                        <input className='rounded-full px-4 py-1 mt-4' placeholder='Nombre y apelidos...' />
                        <input className='rounded-full px-4 py-1 mt-4' placeholder='Correo electrónico...' />
                        <textarea className='rounded-md px-4 py-1 mt-4' placeholder='Mensaje...'></textarea>
                        <button className='ml-auto bg-secondary-base rounded-full text-white px-6 py-1 mt-2'>Enviar</button>
                    </form>
                    <img className='absolute bottom-0 right-24 hidden xl:block' width={280} src={Hero} />
                </div>
            </section>
        </Layout>
    )
}
