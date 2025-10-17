import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface props {
    titulo: string
    subtitulo: string
}

export const Titulo = ({titulo, subtitulo}:props) => {
  return (
    <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">{titulo}</CardTitle>
        <CardDescription className="text-center">{subtitulo}</CardDescription>
    </CardHeader>
  )
}
