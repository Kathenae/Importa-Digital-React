import DynamicForm from "@/Components/DynamicForm";
import Layout from "@/Layouts/Layout";
import { LessonForm } from "@/forms";
import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";

export default function LessonCreate(props : PageProps)
{
    const  { } = props
    return (
        <Layout {...props}>
            <Head title="Administração" />
            <div className="container pt-12 pb-32 mb-32">
                <h1 className="text-4xl font-bold mb-8">
                    <Link className="text-primary-500 underline" href={route('admin')}>Administração</Link> / <Link className="text-primary-500 underline" href={route('admin.lessons')}>Aulas</Link> / Criar
                </h1>
                <DynamicForm
                    method="post"
                    submitUrl={route('admin.lessons.store')}
                    inputs={LessonForm()}
                />
            </div>
        </Layout>
    )
}
