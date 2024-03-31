import PrimaryButton from "@/Components/PrimaryButton";
import Layout from "@/Layouts/Layout";
import { Course, PageProps } from "@/types";
import { Head, Link, router } from "@inertiajs/react";

import Capa1 from '@img/capa-1.png'
import Capa2 from '@img/capa-2.png'
import Capa3 from '@img/capa-3.png'
import Capa4 from '@img/capa-4.png'
import Capa5 from '@img/capa-5.png'
import Capa6 from '@img/capa-6.png'
import Capa7 from '@img/capa-7.png'
import Capa8 from '@img/capa-8.png'
import Capa9 from '@img/capa-9.png'

const CourseCard = ({ name, bg }: { name: string, bg: string }) => {
   return (
      <>
         <div className='flex flex-col items-center justify-center transform hover:scale-110 transition-transform group hover:cursor-pointer'>
            <div className="relative">
               <img src={bg} className="group-hover:shadow-xl "/>
               <h5 className='absolute bottom-0 text-sm left-0 w-full px-8 pb-4 uppercase font-thin text-white text-center'>
                  {name}
               </h5>
            </div>

            <div className='flex flex-col items-center justify-center w-full mt-4 relative'>
               <a className='text-lg rounded-full font-bold px-14 py-1 group-hover:shadow-xl  from-primary-base to-primary-accent bg-gradient-to-br text-secondary-base hover:text-white transition' href="">¡Inscribite ya!</a>
               <Link href={route('courses.show', 1)} className="text-sm mt-2 text-center font-bold text-gray-700 hover:underline group flex items-center space-x-2">
                  <span>Ver más información</span>
                  <i className='i-lucide-chevrons-right scale-150 transform transition-all' />
               </Link>
            </div>
         </div>
      </>
   )
}

export default function CoursesPage(props: PageProps & { courses: (Course & { lessons_count: number })[] }) {
   const { courses } = props;

   return (
      <Layout {...props}>
         <Head title={"Cursos"} />

         <div className="w-full py-12 md:py-32 text-center bg-white">
            <h1 className="text-6xl font-extrabold text-secondary-base">NUESTROS CURSOS</h1>
         </div>

         <div className="bg-gray-100 w-full">
            <section className="container mx-auto py-12">
               <div>
                  <h3 className="uppercase text-secondary-base text-4xl font-extrabold">Tecnicaturas</h3>
                  <div className="w-full border-b-2 border-gray-300 mt-2" />
               </div>
               <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-x-12 lg:gap-y-16 mt-6">
                  <CourseCard bg={Capa1} name="técnico superior en electromecánica" />
                  <CourseCard bg={Capa2} name="Técnico Superior electricista en redes y lineas de distribución mt/bt" />
                  <CourseCard bg={Capa3} name="técnico superior seguridad laboral y salud ocupacional" />
               </div>

               <div className='mt-24'>
                  <h3 className="uppercase text-secondary-base text-4xl font-extrabold">Capacitaciones</h3>
                  <div className="w-full border-b-2 border-gray-300 mt-2" />
               </div>

               <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-x-12 lg:gap-y-16 mt-6">
                  <CourseCard bg={Capa4} name="Curso gestión de contratos de la ande" />
                  <CourseCard bg={Capa5} name="capacitación electricista de distribución mt/bt" />
                  <CourseCard bg={Capa6} name="Operador de grúa e Hidroelevador con énfasis en el sector eléctrico" />
                  <CourseCard bg={Capa7} name="Distribución Eléctrica Subterránea" />
                  <CourseCard bg={Capa8} name="Seguridad en instalaciones eléctricas" />
                  <CourseCard bg={Capa9} name="Construcción y mantenimiento de líneas protegidas de 23KV" />
               </div>
            </section>
         </div>
      </Layout>
   )
}