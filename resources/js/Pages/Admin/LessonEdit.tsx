import DynamicForm from "@/Components/DynamicForm";
import Layout from "@/Layouts/Layout";
import { LessonForm } from "@/forms";
import { Lesson, PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";

interface LessonEditProps extends PageProps {
    lesson: Lesson
}

export default function LessonEdit(props: LessonEditProps) {
    const { lesson } = props
    return (
        <Layout {...props}>
            <Head title="Administração" />
            <div className="container pt-12 pb-32 mb-32">
                <h1 className="text-4xl font-bold mb-8">
                    <Link className="text-primary-500 underline" href={route('admin')}>Administração</Link> / <Link className="text-primary-500 underline" href={route('admin.lessons')}>Aulas</Link> / Editar
                </h1>
                <DynamicForm
                    method="post"
                    submitUrl={route('admin.lessons.update', lesson.id)}
                    inputs={LessonForm(lesson)}
                />
            </div>
        </Layout>
    )
}
