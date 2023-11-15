import ChoiceSelect from "@/Components/ChoiceSelect";
import DangerButton from "@/Components/DangerButton";
import Dropdown from "@/Components/Dropdown";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TableList from "@/Components/TableList";
import TextInput from "@/Components/TextInput";
import Layout from "@/Layouts/Layout";
import { PageProps, User, UserPermission } from "@/types";
import { translate } from "@/utils";
import { Transition } from "@headlessui/react";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

interface UsersProps extends PageProps {
    users: User & {
        permissions: UserPermission[];
    }[]
}

export default function Users(props: UsersProps) {
    const { users } = props
    const [searchText, setSearchText] = useState('')
    const [checkedItems, setCheckedItems] = useState<User[]>([])

    const handleDelete = () => {
        router.delete(route('admin.users.destroyMany'), {
            data: { ids: checkedItems.map((item) => item.id) },
            only: ['users']
        })
    }

    const handleAprove = () => {
        const ids = checkedItems.map(item => item.id)
        console.log(ids);
        router.patch(route('admin.users.approve'), {
            ids
        }, {
            only: ['users']
        })
    }

    const handleUnapprove = () => {
        const ids = checkedItems.map(item => item.id)
        console.log(ids);
        router.patch(route('admin.users.unapprove'), {
            ids,
        }, {
            only: ['users'],
        })
    }

    return (
        <Layout {...props}>
            <Head title="Administração" />
            <div className="container pt-12 pb-32 mb-32">
                <h1 className="text-4xl font-bold mb-8">
                    <Link className="text-primary-500 underline" href={route('admin')}>Administração</Link> / Utilizadores
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
                    <PrimaryButton
                        onClick={() => router.get(route('admin.users.create'))}
                    >
                        Novo<span className="hidden md:inline">&nbsp;Utilizador</span>
                    </PrimaryButton>
                </div>

                <TableList
                    columns={['id', 'name', 'email', 'is_approved']}
                    detailRoute="admin.users.edit"
                    items={users}
                    searchText={searchText}
                    checkedItems={checkedItems}
                    onCheck={(item, checked) => {
                        if (checked) {
                            setCheckedItems(current => [...current, item as User])
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
                        <SecondaryButton onClick={handleAprove}>
                            Aprovar
                        </SecondaryButton>
                        <SecondaryButton onClick={handleUnapprove}>
                            Desprovar
                        </SecondaryButton>
                        <DangerButton onClick={handleDelete}>
                            Eliminar
                        </DangerButton>
                    </div>
                </Transition>
            </div>
        </Layout>
    )
}
