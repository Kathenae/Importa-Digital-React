import PrimaryButton from "@/Components/PrimaryButton";
import Layout from "@/Layouts/Layout";
import { Course, PageProps } from "@/types";
import { Head, Link, router } from "@inertiajs/react";
import Capa1 from '@img/capa-1.png'


const CourseCard = ({ id, name, bg }: { id: number, name: string, bg: string }) => {

   return (
      <>
         <div className='flex flex-col items-center justify-center transform hover:scale-110 transition-transform group hover:cursor-pointer'>
            <div className="relative" onClick={() => router.get(route('courses.show', id))}>
               <img src={bg} className="group-hover:shadow-xl "/>
               <h5 className='absolute bottom-0 text-xs left-0 w-full px-2 pb-4 uppercase font-semibold text-white text-center'>
                  {name}
               </h5>
            </div>

            <div className='flex flex-col items-center justify-center w-full mt-4 relative'>
            <  Link
                  href={route('courses.show', id)}
                  className='text-lg rounded-full font-bold px-14 py-1 group-hover:shadow-xl  from-primary-base to-primary-accent bg-gradient-to-br text-secondary-base hover:text-white transition'
               >
                     ¡Inscribite ya!
               </Link>
               <Link href={route('courses.show', id)} className="text-sm mt-2 text-center font-bold text-gray-700 hover:underline group flex items-center space-x-2">
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
   const tecnicaturas = courses.filter(c => c.type == 'tecnicatura')
   const capacitaciones = courses.filter(c => c.type == 'capacitacione')

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
                  {tecnicaturas.map((course) => (
                     <CourseCard
                        key={course.id}
                        id={course.id}
                        name={course.name}
                        bg={course.cover_url ?? Capa1} 
                     />
                  ))}
               </div>

               <div className='mt-24'>
                  <h3 className="uppercase text-secondary-base text-4xl font-extrabold">Capacitaciones</h3>
                  <div className="w-full border-b-2 border-gray-300 mt-2" />
               </div>

               <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-x-12 lg:gap-y-16 mt-6">
                  {capacitaciones.map((course) => (
                     <CourseCard 
                        key={course.id}
                        id={course.id}
                        name={course.name}
                        bg={course.cover_url ?? Capa1}
                     />
                  ))}
               </div>
            </section>
         </div>
      </Layout>
   )
}