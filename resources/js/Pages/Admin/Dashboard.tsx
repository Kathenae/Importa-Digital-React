import PrimaryButton from "@/Components/PrimaryButton";
import Layout from "@/Layouts/Layout";
import { PageProps } from "@/types";
import { Head, router } from "@inertiajs/react";

export default function Dashboard(props: PageProps) {
    const { } = props
    return (
        <Layout {...props}>
            <Head title="Administração" />
            <div className="container pt-12 pb-32 mb-32">
                <div>
                    <h1 className="text-4xl font-bold">Conteudo</h1>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-8">
                        <div className="bg-white rounded-lg px-12 py-8 shadow-xl">
                            <h3 className="text-xl font-bold mb-2 space-x-2 flex items-center">
                                <i className="i-mdi-video text-3xl" />
                                <span>Aulas</span>
                            </h3>
                            <p>Crie contas para utilizadores do teu aplicativo</p>
                            <PrimaryButton onClick={() => router.get(route('admin.lessons'))} className="mt-6">Ir Agora</PrimaryButton>
                        </div>
                        <div className="bg-white rounded-lg px-12 py-8 shadow-xl">
                            <h3 className="text-xl font-bold mb-2 space-x-2 flex items-center">
                                <i className="i-mdi-book-open text-3xl" />
                                <span>Cursos</span>
                            </h3>
                            <p>Crie cursos para utilizadores do teu aplicativo</p>
                            <PrimaryButton onClick={() => router.get(route('admin.courses'))} className="mt-6">Ir Agora</PrimaryButton>
                        </div>
                    </div>
                </div>
                <div className="mt-12">
                    <h1 className="text-4xl font-bold">Utilizadores</h1>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-8">
                        <div className="bg-white rounded-lg px-12 py-8 shadow-xl">
                            <h3 className="text-xl font-bold mb-2 space-x-2 flex items-center">
                                <i className="i-mdi-teacher text-3xl" />
                                <span>Professores</span>
                            </h3>
                            <p>Gerir contas de professores do applicativo</p>
                            <PrimaryButton onClick={() => router.get(route('admin.users') + "?mode=teacher")} className="mt-6">Ir Agora</PrimaryButton>
                        </div>
                        <div className="bg-white rounded-lg px-12 py-8 shadow-xl">
                            <h3 className="text-xl font-bold mb-2 space-x-2 flex items-center">
                                <i className="i-mdi-account-student text-3xl" />
                                <span>Estudantes</span>
                            </h3>
                            <p>Gerir Estudantes do applicativo</p>
                            <PrimaryButton onClick={() => router.get(route('admin.users') + "?mode=student")} className="mt-6">Ir Agora</PrimaryButton>
                        </div>
                        <div className="bg-white rounded-lg px-12 py-8 shadow-xl">
                            <h3 className="text-xl font-bold mb-2 space-x-2 flex items-center">
                                <i className="i-mdi-shield-account text-3xl" />
                                <span>Gestores</span>
                            </h3>
                            <p>Gerir Administradores e Moderadores do applicativo</p>
                            <PrimaryButton onClick={() => router.get(route('admin.users') + "?mode=manager")} className="mt-6">Ir Agora</PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
