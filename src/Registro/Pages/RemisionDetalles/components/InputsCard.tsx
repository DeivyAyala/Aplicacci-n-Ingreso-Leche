import { Input } from "@/components/ui/input"
import type React from "react"

interface props {
    isEditing : boolean
    title: string
    type: string
    name: string
    step?: string
    value: string | number | readonly string[] | undefined
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined
    children?: React.ReactNode

}


export const InputCard = ({isEditing, title, type, name, value, onChange, step, children}: props) => {
  return (
     <div>
        <label className="text-sm font-medium text-amber-800">{title}</label>
            {isEditing ? (
                <Input
                    type={type}
                    name={name}
                    value={value}
                    step={step}
                    onChange={onChange}
                    className="mt-1 border-amber-200"
                />
            ) : (
            <p className="text-amber-900 font-medium">{value}</p>
        )}
        {children}
    </div>
  )
}
