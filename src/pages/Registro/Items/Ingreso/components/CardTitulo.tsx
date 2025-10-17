import { CardHeader, CardTitle } from "@/components/ui/card"
interface props {
    title: string;
    icono : React.ReactNode
}


export const CardTitulo = ({title, icono}:props) => {
  return (
    <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
            {icono}
            {title}
        </CardTitle>
    </CardHeader>
  )
}
