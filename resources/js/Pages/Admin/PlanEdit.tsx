import DynamicForm from "@/Components/DynamicForm";
import Layout from "@/Layouts/Layout";
import { PlanForm } from "@/forms";
import { PageProps, Plan, User } from "@/types";
import { Head, Link } from "@inertiajs/react";

interface PlanEditProps extends PageProps {
    plan: Plan,
    users: User[]
}

export default function PlanEdit(props: PlanEditProps) {
    const { plan, users } = props
    return (
        <Layout {...props}>
            <Head title="Administração" />
            <div className="container pt-12 pb-32 mb-32">
                <h1 className="text-4xl font-bold mb-8">
                    <Link className="text-primary-500 underline" href={route('admin')}>Administração</Link> / <Link className="text-primary-500 underline" href={route('admin.plans')}>Planos</Link> / Editar
                </h1>
                <DynamicForm
                    method="post"
                    submitUrl={route('admin.plans.update', plan.id)}
                    inputs={PlanForm({plan, users})}
                />
            </div>
        </Layout>
    )
}
