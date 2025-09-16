import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"


interface props {
    name: string;
    title: string;
    type:  React.HTMLInputTypeAttribute | undefined;
    value: string | number 
    className: string;
    step?: string;
    placeholder?: string;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void  

}
export const InputCard = ({name, title, type, value, className, step, placeholder,onInputChange}:props) => {
  return (
    <div className="space-y-2">
        <Label htmlFor={name} className={className}>
            {title}
        </Label>
        <Input
            id={name}
            name={name}
            type={type}
            value={value}
            step={step}
            placeholder={placeholder}
            onChange={onInputChange}
            className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
            required
        />
    </div>
  )
}
