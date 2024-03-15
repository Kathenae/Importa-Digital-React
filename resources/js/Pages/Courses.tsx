import PrimaryButton from "@/Components/PrimaryButton";
import Layout from "@/Layouts/Layout";
import { Course, PageProps } from "@/types";
import { Head, Link, router } from "@inertiajs/react";

export default function CoursesPage(props: PageProps & { courses: (Course & { lessons_count: number })[] }) {
   const { courses } = props;
   console.log(courses);
   console.log("Hello")

   return (
      <Layout {...props}>
         <Head title={"Cursos"} />

         <div className="container py-12">
            <h1 className="text-4xl font-bold mb-6">Cursos</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {courses.map(course => (
                  <div key={course.id} className="bg-white flex flex-col w-full shadow-xl rounded-lg px-2 py-4">
                     <Link href={route('lessons', [course.id])}><h3 className="text-lg font-bold border-b-2 pb-2 border-primary-600 line-clamp-2">{course.name}</h3></Link>
                     <p className="mt-4 line-clamp-2 mb-2">{course.description}</p>
                     <div className="flex items-center justify-between mt-auto">
                        <p className="text-gray-400">{course.lessons_count} Aulas</p>
                        <PrimaryButton onClick={() => {router.get(route('lessons', [course.id]))}}>Ver aulas</PrimaryButton>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </Layout>
   )
}