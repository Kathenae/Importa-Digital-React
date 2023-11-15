import DynamicForm from "@/Components/DynamicForm";
import Layout from "@/Layouts/Layout";
import { UserForm } from "@/forms";
import { PageProps, User } from "@/types";
import { Head, Link } from "@inertiajs/react";

interface UserEditProps extends PageProps {
    user: User
}

export default function UserEdit(props: UserEditProps) {
    const { user } = props
    return (
        <Layout {...props}>
            <Head title="Administração" />
            <div className="container pt-12 pb-32 mb-32">
                <h1 className="text-4xl font-bold mb-8">
                <Link className="text-primary-500 underline" href={route('admin')}>Administração</Link> / <Link className="text-primary-500 underline" href={route('admin.users')}>Utilizadores</Link> / Editar
                </h1>
                <DynamicForm
                    method="post"
                    submitUrl={route('admin.users.update', user.id)}
                    inputs={UserForm(user)}
                />
            </div>
        </Layout>
    )
}
