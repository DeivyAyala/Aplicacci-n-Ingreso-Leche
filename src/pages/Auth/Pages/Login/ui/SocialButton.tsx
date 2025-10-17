import { Button } from "@/components/ui/button"

interface props {
    onclick: () => void,
    disabled?: boolean,
    icono: React.ReactNode,
    title: string,
}

export const SocialButton = ({onclick, disabled, icono, title}:props) => {
  return (
    <Button
        variant="outline"
        className="w-full h-11 border-border hover:bg-muted bg-transparent"
        onClick={onclick}
        disabled={disabled}
    >
        {icono}
            {title}
    </Button>

  )
}
