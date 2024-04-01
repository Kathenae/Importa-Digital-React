import DynamicForm from "@/Components/DynamicForm";
import Layout from "@/Layouts/Layout";
import { UserForm } from "@/forms";
import { Course, PageProps, Plan } from "@/types";
import { Head, Link } from "@inertiajs/react";

export default function UserCreate(props: PageProps & { courses: Course[]}) {
    const { courses } = props
    return (
        <Layout {...props}>
            <Head title="Administração" />
            <div className="container pt-12 pb-32 mb-32">
                <h1 className="text-4xl font-bold mb-8">
                <Link className="text-primary-500 underline" href={route('admin')}>Administração</Link>  / <Link className="text-primary-500 underline" href={route('admin.users')}>Utilizadores</Link> / Novo
                </h1>
                <DynamicForm
                    method="post"
                    submitUrl={route('admin.users.store')}
                    inputs={UserForm({ courses })}
                />
            </div>
        </Layout>
    )
}
