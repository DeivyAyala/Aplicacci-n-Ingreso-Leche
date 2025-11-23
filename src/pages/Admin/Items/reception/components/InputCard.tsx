import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import type { UseFormRegisterReturn } from "react-hook-form";


interface Props {
  title: string;
  type: React.HTMLInputTypeAttribute;
  className?: string;
  placeholder?: string;
  step?: string;
  min?: string;
  max? : string;
  register: UseFormRegisterReturn;
}

export const InputCard = ({
  title,
  type,
  className,
  placeholder,
  step,
  min, max,
  register
}: Props) => {
  return (
    <div className="space-y-2">
      <Label className={className}>{title}</Label>

      <Input
        type={type}
        step={step}
        placeholder={placeholder}
        min={min}
        max={max}
        {...register}
        className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
        required
      />
    </div>
  );
};
