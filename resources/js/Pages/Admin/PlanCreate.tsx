import DynamicForm from "@/Components/DynamicForm";
import TableList from "@/Components/TableList";
import Layout from "@/Layouts/Layout";
import { PlanForm } from "@/forms";
import { PageProps, User } from "@/types";
import { Head, Link } from "@inertiajs/react";

export default function PlanCreate(props : PageProps & { users: User[] })
{
    const  { users } = props
    return (
        <Layout {...props}>
            <Head title="Administração" />
            <div className="container pt-12 pb-32 mb-32">
                <h1 className="text-4xl font-bold mb-8">
                    <Link className="text-primary-500 underline" href={route('admin')}>Administração</Link> / <Link className="text-primary-500 underline" href={route('admin.plans')}>Planos</Link> / Criar
                </h1>
                <DynamicForm
                    method="post"
                    submitUrl={route('admin.plans.store')}
                    inputs={PlanForm({users})}
                />
                

            </div>
        </Layout>
    )
}
