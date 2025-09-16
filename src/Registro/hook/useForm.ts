import { useEffect, useState } from "react"
import type { PropsRegitros } from "../types/typeRegistro"

export const useForm = (initialForm: PropsRegitros) => {
  const [formState, setFormState] = useState(initialForm)

  //Esto hace que cuando se reciba un nuevo "registro" desde afuera, se cargue al form
  useEffect(() => {
    setFormState(initialForm)
  },[initialForm])

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> ) => {
    const { name, value } = e.target
    setFormState({
      ...formState,
      [name]: value
    })
  }

  const onCustomChange = (name: string, value: any) => {
    setFormState({
      ...formState,
      [name]: value
    })
  }

  const onResetForm = () => setFormState(initialForm)

  return {
    ...formState,
    formState,
    onInputChange,
    onCustomChange,
    onResetForm
  }
}
