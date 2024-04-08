import { cn, translate as tr } from "@/utils";
import Checkbox from "./Checkbox";
import { useEffect, useState } from "react";

interface TableListProps {
    columns: string[],
    items: Record<string, any>[],
    borderless?: boolean,
    searchText?: string,
    detailRoute?: string,
    checkedItems?: Record<string, any>[]
    onCheck?: (item: Record<string, any>, checked: boolean) => void
}

function getObjectAttribute(object: any, attributeName: string) {
    const attributes = attributeName.split('.')
    let value = object;
    for (let attribute of attributes) {
        value = value[attribute];
    }
    return value
}

export default function TableList({ columns, items, searchText, detailRoute, checkedItems, onCheck, borderless }: TableListProps) {

    const [filteredItems, setFilteredItems] = useState(items)

    // filter items based on searchText
    useEffect(() => {
        if (searchText) {
            setFilteredItems(items.filter((item) => {
                for (let column of columns) {
                    if (tr(getObjectAttribute(item, column)).toString().toLowerCase().includes(searchText.toLowerCase())) {
                        return true;
                    }
                }
                return false;
            }))
        }
        else {
            setFilteredItems(items)
        }
    }, [searchText, items])

    return (
        <div className={cn("bg-white rounded-md overflow-x-auto", !borderless && 'shadow')}>
            {filteredItems.length <= 0 ?
                <div className="w-full flex items-center justify-center px-4 py-2 font-bold text-gray-400">No entries</div>
                :
                <table className="w-full whitespace-nowrap">
                    <thead>
                        <tr className="text-left font-bold">
                            {onCheck &&
                                <th className="pb-4 pt-6 px-6">
                                    <i className="icon-[mdi--check]" />
                                </th>
                            }
                            {columns.map((columnName, index) => (
                                <th key={index} className="pb-4 pt-6 px-6" colSpan={columnName.indexOf(columnName) >= columns.length - 1 ? 2 : 1}>{tr(columnName)}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-100 focus-within:bg-gray-100">
                                {onCheck &&
                                    <td className="border-t px-6 py-4">
                                        <Checkbox checked={checkedItems ? checkedItems.includes(item) : undefined} onChange={(event) => onCheck(item, event.currentTarget.checked)} />
                                    </td>
                                }
                                {columns.map((column, index) => (
                                    <td key={index} className="border-t">
                                        {detailRoute ?
                                            <a className="flex items-center px-6 py-4 focus:text-primary-500" href={route(detailRoute, item.id)}>{tr(getObjectAttribute(item, column))}</a>
                                            :
                                            <span className="flex items-center px-6 py-4 focus:text-primary-500">{tr(getObjectAttribute(item, column))}</span>
                                        }
                                    </td>
                                ))}
                                <td className="w-px border-t">
                                    {detailRoute ?
                                        <a className="flex items-center px-6 py-4" href={route(detailRoute, item.id)}>
                                            <i className="icon-[mdi--chevron-right] text-2xl" />
                                        </a>
                                        :
                                        <span className="flex items-center px-6 py-4">
                                            <i className="icon-[mdi--chevron-right] text-2xl" />
                                        </span>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </div>
    )
}
