import PrimaryButton from "@/Components/PrimaryButton";
import Layout from "@/Layouts/Layout";
import { PageProps } from "@/types";
import { Head, router } from "@inertiajs/react";

export default function Dashboard(props : PageProps)
{
    const  { } = props
    return (
        <Layout {...props}>
            <Head title="Administração" />
            <div className="container pt-12 pb-32 mb-32">
                <h1 className="text-4xl font-bold">Administração</h1>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-12">
                    <div className="bg-white rounded-lg px-12 py-8 shadow-xl">
                        <h3 className="text-xl font-bold mb-2 space-x-2 flex items-center">
                            <i className="i-mdi-shield-user text-3xl"/>
                            <span>Utilizadores</span>
                        </h3>
                        <p>Crie contas para utilizadores do teu aplicativo</p>
                        <PrimaryButton onClick={() => router.get(route('admin.users'))} className="mt-6">Ir Agora</PrimaryButton>
                    </div>
                    <div className="bg-white rounded-lg px-12 py-8 shadow-xl">
                        <h3 className="text-xl font-bold mb-2 space-x-2 flex items-center">
                            <i className="i-mdi-video text-3xl"/>
                            <span>Aulas</span>
                        </h3>
                        <p>Crie contas para utilizadores do teu aplicativo</p>
                        <PrimaryButton onClick={() => router.get(route('admin.lessons'))} className="mt-6">Ir Agora</PrimaryButton>
                    </div>
                    <div className="bg-white rounded-lg px-12 py-8 shadow-xl">
                        <h3 className="text-xl font-bold mb-2 space-x-2 flex items-center">
                            <i className="i-mdi-book-open text-3xl"/>
                            <span>Cursos</span>
                        </h3>
                        <p>Crie cursos para utilizadores do teu aplicativo</p>
                        <PrimaryButton onClick={() => router.get(route('admin.courses'))} className="mt-6">Ir Agora</PrimaryButton>
                    </div>
                    <div className="bg-white rounded-lg px-12 py-8 shadow-xl">
                        <h3 className="text-xl font-bold mb-2 space-x-2 flex items-center">
                            <i className="i-mdi-cash text-3xl"/>
                            <span>Planos</span>
                        </h3>
                        <p>Crie planos para utilizadores do teu aplicativo</p>
                        <PrimaryButton onClick={() => router.get(route('admin.plans'))} className="mt-6">Ir Agora</PrimaryButton>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
