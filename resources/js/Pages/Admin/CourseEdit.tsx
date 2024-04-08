import Collapsable from "@/Components/Collapsable";
import DangerButton from "@/Components/DangerButton";
import DynamicForm from "@/Components/DynamicForm";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SecondaryButton from "@/Components/SecondaryButton";
import TableList from "@/Components/TableList";
import TextInput from "@/Components/TextInput";
import Layout from "@/Layouts/Layout";
import { CourseForm, SubjectForm } from "@/forms";
import { Course, PageProps, Plan, Subject } from "@/types";
import { Transition } from "@headlessui/react";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function CourseCreate(props: PageProps & { course: Course, courses: Course[] }) {
    const { course, courses } = props
    const [checkedItems, setCheckedItems] = useState<Subject[]>([])
    const { setData, data, post, processing, errors } = useForm({
        name: '',
        year: '',
    })

    const handleAddSubject = () => {
        post(route('admin.courses.createSubject', course.id), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setData({...data, name: ""})
            }
        });
    }

    const handleDeleteSubject = () => {
        router.delete(route('admin.courses.destroySubject', course.id), {
            data: { ids: checkedItems.map((item) => item.id) },
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setCheckedItems([])
            },
        })
    }

    return (
        <Layout {...props}>
            <Head title="Administração" />
            <div className="container pt-12 pb-32 mb-32">
                <h1 className="text-4xl font-bold mb-8">
                    <Link className="text-primary-500 underline" href={route('admin')}>Administração</Link> / <Link className="text-primary-500 underline" href={route('admin.courses')}>Cursos</Link> / Alterar Curso
                </h1>
                <DynamicForm
                    method="post"
                    showProgress={true}
                    submitUrl={route('admin.courses.update', course.id)}
                    inputs={CourseForm({ course })}
                >
                    <div className="mt-4">
                        <Collapsable title="Malla Curricular">
                            <div className="flex space-x-2 w-full">
                                <div className="w-full">
                                    <InputLabel htmlFor="name">Topico</InputLabel>
                                    <TextInput
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Ex: Administración de recursos humanos"
                                        className="w-full"
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="name">Año</InputLabel>
                                    <TextInput
                                        type="number"
                                        name="year"
                                        value={data.year}
                                        onChange={(e) => setData('year', e.target.value)}
                                        placeholder="Año"
                                    />
                                    <InputError message={errors.year} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel className="opacity-0" htmlFor="">Enviar</InputLabel>
                                    <SecondaryButton disabled={processing} onClick={handleAddSubject} className="h-11 space-x-2" type="button">
                                        <span>add</span>
                                        {processing && <i className="i-lucide-loader animate-spin"/>}
                                    </SecondaryButton>
                                </div>
                            </div>

                            <TableList
                                borderless
                                columns={['name', 'year']}
                                items={course.subjects?.sort((a, b) => a.year - b.year) ?? []}
                                onCheck={(item, checked) => {
                                    if (checked) {
                                        setCheckedItems(current => [...current, item as Subject])
                                    } else {
                                        setCheckedItems(current => current.filter(i => i.id !== item.id))
                                    }
                                }}
                            />
                        </Collapsable>
                    </div>
                </DynamicForm>

                <Transition
                    show={checkedItems.length > 0}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="flex items-center justify-end fixed left-0 pointer-events-none bottom-0 p-4 w-full space-x-4">
                        <DangerButton className="pointer-events-auto" onClick={handleDeleteSubject}>
                            Eliminar
                        </DangerButton>
                    </div>
                </Transition>
            </div>
        </Layout>
    )
}
