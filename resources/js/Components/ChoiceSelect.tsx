import { cn } from "@/utils";
import SelectInput from "./SelectInput";
import { ChangeEvent } from "react";
import Checkbox from "./Checkbox";

interface ChoiceSelect<T> {
    value?: string | number[],
    name?: string,
    className?: string,
    choices: T,
    defaultAny?: boolean,
    onChange?: (value: string | number[]) => void
}

export default function ChoiceSelect({ value, name, className, choices, defaultAny, onChange }: ChoiceSelect<Record<string, string | number>>) {
    return (
        <>
            {typeof value == 'string'? 
                <SelectInput
                    name={name}
                    className={cn("shadow-md", className)}
                    value={value}
                    onChange={(e) => {
                        if(onChange){
                            onChange(e.target.value)
                        }
                    }}
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
                :
                <div className={cn("", className)}>
                    {Object.keys(choices).map(c => Number.parseInt(c)).map((choice) => (
                        <label key={choice} className="block space-x-3">
                            <Checkbox
                                type="checkbox"
                                name={name}
                                value={choice}
                                checked={value?.includes(choice)}
                                onChange={(e) => {
                                    if(onChange && value != null){
                                        let newValue = [...value]
                                        if(e.target.checked){
                                            newValue.push(choice)
                                        }
                                        else{
                                            newValue = newValue.filter((c) => c != choice)
                                        }
                                        onChange(newValue)
                                    }
                                }}
                            />
                            <span>{choices[choice]}</span>
                        </label>
                    ))}
                </div>
            }
        </>
    )
}
