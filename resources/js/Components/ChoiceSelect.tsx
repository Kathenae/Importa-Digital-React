import { cn } from "@/utils";
import SelectInput from "./SelectInput";
import { ChangeEvent } from "react";

interface ChoiceSelect<T> {
    value?: string,
    name?: string,
    className?: string,
    choices: T,
    defaultAny?: boolean,
    onChange?: React.ChangeEventHandler<HTMLSelectElement>
}

export default function ChoiceSelect({ value, name, className, choices, defaultAny, onChange }: ChoiceSelect<Record<string, string | number>>) {
    return (
        <SelectInput
            name={name}
            className={cn("shadow-md", className)}
            value={value}
            onChange={onChange}
            autoComplete="off"
            aria-autocomplete="none"
        >
            {defaultAny &&
                <option value=''>Qualquer</option>
            }
            {Object.keys(choices).map((value, index) => (
                <option key={index} value={value}>{choices[value]}</option>
            ))}
        </SelectInput>
    )
}
