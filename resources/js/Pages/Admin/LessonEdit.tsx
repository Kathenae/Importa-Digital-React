import DangerButton from "@/Components/DangerButton";
import DynamicForm from "@/Components/DynamicForm";
import Layout from "@/Layouts/Layout";
import { LessonForm } from "@/forms";
import { Lesson, PageProps } from "@/types";
import { translate } from "@/utils";
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
                    method="put"
                    submitUrl={route('admin.lessons.update', lesson.id)}
                    showProgress
                    preserveScroll={true}
                    only={['lesson']}
                    inputs={LessonForm(lesson)}
                >
                    <div className="mt-4">
                        
                        {lesson.files?.map(file => (
                            <div className="w-full flex items-center p-2 justify-between" key={file.id}>
                                <span className="font-semibold text-lg">{file.filename}</span>
                                <DangerButton type="button">
                                    <Link 
                                        href={route('admin.lessons.destroyFile', file.id)} 
                                        method="delete" 
                                        preserveState 
                                        preserveScroll
                                        only={['lesson']}
                                    >
                                        Apagar
                                    </Link>
                                </DangerButton>
                            </div>
                        ))}
                    </div>
                </DynamicForm>                
            </div>
        </Layout>
    )
}
