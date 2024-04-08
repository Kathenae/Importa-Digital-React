import DynamicForm from "@/Components/DynamicForm";
import Layout from "@/Layouts/Layout";
import { CourseForm } from "@/forms";
import { Lesson, PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";

export default function CourseCreate(props : PageProps & { lessons: Lesson[] })
{
    const  { lessons } = props
    return (
        <Layout {...props}>
            <Head title="Administração" />
            <div className="container pt-12 pb-32 mb-32">
                <h1 className="text-4xl font-bold mb-8">
                    <Link className="text-primary-500 underline" href={route('admin')}>Administração</Link> / <Link className="text-primary-500 underline" href={route('admin.courses')}>Cursos</Link> / Novo Curso
                </h1>
                <DynamicForm
                    method="post"
                    showProgress={true}
                    submitUrl={route('admin.courses.store')}
                    inputs={CourseForm({})}
                />
            </div>
        </Layout>
    )
}
