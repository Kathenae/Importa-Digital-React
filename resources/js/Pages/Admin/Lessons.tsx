import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TableList from "@/Components/TableList";
import TextInput from "@/Components/TextInput";
import Layout from "@/Layouts/Layout";
import { Lesson, PageProps } from "@/types";
import { Transition } from "@headlessui/react";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

interface LessonsProps extends PageProps {
    lessons: Lesson[]
}

export default function Lessons(props: LessonsProps) {
    const { lessons } = props
    const [searchText, setSearchText] = useState('')
    const [checkedItems, setCheckedItems] = useState<Lesson[]>([])

    const handleDelete = () => {
        router.delete(route('admin.lessons.destroyMany'), {
            data: { ids: checkedItems.map((item) => item.id) },
            only: ['lessons']
        })
    }

    return (
        <Layout {...props}>
            <Head title="Administração" />
            <div className="container pt-12 pb-32 mb-32">
                <h1 className="text-4xl font-bold mb-8">
                    <Link className="text-primary-500 underline" href={route('admin')}>Administração</Link> / Aulas
                </h1>
                <div className="flex items-center justify-between mb-6 space-x-12">
                    <div className="flex items-center space-x-2 w-full">
                        <TextInput
                            className="w-full"
                            autoComplete="off"
                            type="text"
                            name="search"
                            placeholder="Procurar..."
                            spellCheck="false"
                            value={searchText}
                            onChange={(e) => setSearchText(e.currentTarget.value)}
                        />
                    </div>
                    <div className="flex space-x-4">
                        <PrimaryButton
                            onClick={() => router.get(route('admin.lessons.create'))}
                        >
                            Nova<span className="hidden md:inline">&nbsp;Aula</span>
                        </PrimaryButton>
                        <SecondaryButton
                            onClick={() => router.get(route('admin.courses.create'))}
                        >
                            Novo<span className="hidden md:inline">&nbsp;Curso</span>
                        </SecondaryButton>
                    </div>
                </div>

                <TableList
                    columns={['id', 'title']}
                    detailRoute="admin.lessons.edit"
                    searchText={searchText}
                    items={lessons}
                    checkedItems={checkedItems}
                    onCheck={(item, checked) => {
                        if (checked) {
                            setCheckedItems(current => [...current, item as Lesson])
                        } else {
                            setCheckedItems(current => current.filter(i => i.id !== item.id))
                        }
                    }}
                />

                <Transition
                    show={checkedItems.length > 0}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="flex items-center fixed bottom-0 p-4 space-x-4">
                        <DangerButton onClick={handleDelete}>
                            Eliminar
                        </DangerButton>
                    </div>
                </Transition>
            </div>
        </Layout>
    )
}
