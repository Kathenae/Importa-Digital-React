import DynamicForm from "@/Components/DynamicForm";
import Layout from "@/Layouts/Layout";
import { CourseForm } from "@/forms";
import { Course, Lesson, PageProps, Plan } from "@/types";
import { Head, Link } from "@inertiajs/react";

export default function CourseCreate(props : PageProps & { course: Course, lessons: Lesson[], plans: Plan[]})
{
    const  { course, lessons, plans } = props
    return (
        <Layout {...props}>
            <Head title="Administração" />
            <div className="container pt-12 pb-32 mb-32">
                <h1 className="text-4xl font-bold mb-8">
                    <Link className="text-primary-500 underline" href={route('admin')}>Administração</Link> / <Link className="text-primary-500 underline" href={route('admin.lessons')}>Cursos</Link> / Alterar Curso
                </h1>
                <DynamicForm
                    method="post"
                    submitUrl={route('admin.courses.update', course.id)}
                    inputs={CourseForm({course, lessons, plans})}
                />
            </div>
        </Layout>
    )
}
