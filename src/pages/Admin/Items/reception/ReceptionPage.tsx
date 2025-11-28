
import { Button } from "@/components/ui/button"
import {
  SaveIcon,
  ArrowLeftIcon,
} from "lucide-react"

import { VolumenForm } from "./components/VolumenForm"
import { useNavigate } from "react-router"
import { CustomJumbotron } from "../../Components/CustomJumbotron"
import { NotesFrom } from "./components/NotesFrom"
import { ResponsibleForm } from "./components/ResponsibleForm"
import { useOptions } from "@/pages/hook/useOptions"
import type { PropsRegitros } from "../../types/typeRegistro"
import { useForm } from "react-hook-form"
import { InfGeneralFrom } from "./components/InfGeneralFrom"
import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useCreateRemission } from "../../hook/useCreateRemission"
import CustomFullScreenLoading from "@/components/CustomFullScreenLoading"



export const ReceptionPage = () => {
  
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<PropsRegitros>({
    defaultValues: {
      provider: undefined,
      tank: undefined,
      supervisor: undefined,
      analyst: undefined

    },
  });

  useEffect(() => {
    register("provider", {
      validate: (value) =>
        value?._id ? true : "Debe seleccionar un proveedor",
    });
    register("tank", {
      validate: (value) =>
        value?._id ? true : "Debe seleccionar un Tanque",
    });
    register("supervisor", {
      validate: (value) =>
        value?._id ? true : "Debe seleccionar un Supervisor",
    });
    register("analyst", {
      validate: (value) =>
        value?._id ? true : "Debe seleccionar un Analista de Laboratorio",
    });
  }, [register]);


  const { createRemission, isPending } = useCreateRemission()
  const { providers, supervisors, analysts, tanks} = useOptions()
  console.log('Supervisor', supervisors, 'Calidad', analysts)
  
  const formState = watch();

  const onBack = () =>{
    navigate('/adm/inicio')
  }

  



  const onSubmit = async (data: PropsRegitros) => {
    const customDate = new Date(`${data.date}T${data.time}:00`).toISOString();

    const payload = {
      provider: data.provider?._id,
      tank: data.tank?._id,
      supervisor: data.supervisor?._id,
      analyst: data.analyst?._id,
      volume: Number(data.volume),
      realVolume: Number(data.realVolume),
      customDate,
      notes: data.notes ?? []
    }

    try {

      await createRemission(payload);

      toast.dismiss();
      toast.success("Registro creado correctamente");

      // Invalidar para refrescar la lista
      await queryClient.invalidateQueries({ queryKey: ["ingresos"] });
      await queryClient.refetchQueries({ queryKey: ["ingresos"] });


      // Navegar automáticamente
      navigate("/adm/remission");
      reset();
      
    } catch (err) {
      console.error(err);
      toast.dismiss();
      toast.error("Error al crear el registro");
    }
  };

  if (isPending) {
    return <CustomFullScreenLoading message="Creando remisión..." />;
  }


  return (

    <>
    
    {/* Titulo */}
    <CustomJumbotron
    title="Ingreso de Leche"
    subtitle="Registra los datos de calidad y cantidad de la recepción de leche"
    />
    {/* Contenido */}
      <main className="container mx-auto px-6 py-8">
        
        {/* Boton de Volver  */}
        <div className="mb-6">
            <Button
              variant="outline"
              onClick={onBack}
              className="flex items-center gap-2 border-amber-200 text-amber-700 hover:bg-amber-50 bg-transparent"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Volver al Inicio
            </Button>
        </div>


        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-8 lg:grid-cols-2">

            {/* Información General */}
            <InfGeneralFrom 
              formState={formState}
              providers={providers}
              register={register}
              setValue={setValue}
              errors={errors}
            />

            {/* Volúmenes */}
            <VolumenForm 
              formState={formState}
              tank={tanks}
              register={register}
              setValue={setValue}
              errors={errors}
            />

            <ResponsibleForm
              formState={formState} 
              setValue={setValue}
              supervisor={supervisors}    
              analyst={analysts}
              errors={errors}
            />

            {/* Evaluación y Firma */}
            <NotesFrom
              register={register}
            />
          </div>

          {/* Botones de Acción */}
          <div className="mt-8 flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              // onClick={onBack}
              className="border-amber-200 text-amber-700 hover:bg-amber-50 bg-transparent"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8"
            >
              <SaveIcon className="h-4 w-4 mr-2" />
              Guardar Ingreso
            </Button>
          </div>
        </form>
      </main>
    </>

  )
}
