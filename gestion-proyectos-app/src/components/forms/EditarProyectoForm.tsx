import { useForm } from "react-hook-form";
import type { ActualizarProyectoDTO, Proyecto, Usuario } from "../../interfaces/Proyectos";
import Button from "../ui/Button";

interface Props {
    proyecto: Proyecto;
    usuarios: Usuario[];
    onSubmit: (data: ActualizarProyectoDTO) => Promise<void>;
    onCancel: () => void;
}

export default function EditarProyectoForm({
    proyecto,
    usuarios,
    onSubmit,
    onCancel,
}: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ActualizarProyectoDTO>({
        defaultValues: { 
            nombre: proyecto.nombre, 
            descripcion: proyecto.descripcion || '',
            usuarioId: proyecto.usuarioId,
        },
    });
    const campo =
        "block w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
    const error = "border-red-400 bg-red-50";
    const normal = "border-slate-200 bg-white";
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Nombre *
                </label>
                <input
                    {...register("nombre", {
                        required: "El nombre es obligatorio",
                        minLength: { value: 3, message: "Mínimo 3 caracteres" },
                    })}
                    className={`${campo} ${errors.nombre ? error : normal}`}
                />
                {errors.nombre && (
                    <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>
                )}
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Descripción
                </label>
                <textarea
                    {...register("descripcion", {
                        required: "La descripción es obligatoria",
                    })}
                    className={`${campo} ${errors.descripcion ? error : normal}`}
                    rows={3}
                />
                {errors.descripcion && (
                    <p className="text-red-500 text-xs mt-1">{errors.descripcion.message}</p>
                )}
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Responsable *
                </label>
                <select
                    {...register("usuarioId", {
                        required: "El responsable es obligatorio",
                        valueAsNumber: true,
                    })}
                    className={`${campo} ${errors.usuarioId ? error : normal}`}
                >
                    <option value="">Seleccionar usuario...</option>
                    {usuarios.map((u) => (
                        <option key={u.id} value={u.id}>
                            {u.nombre}
                        </option>
                    ))}
                </select>
                {errors.usuarioId && (
                    <p className="text-red-500 text-xs mt-1">{errors.usuarioId.message}</p>
                )}
            </div>
            <div className="flex gap-3 pt-2">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Guardando..." : "Actualizar"}
                </Button>
                <Button type="button" variant="secondary" onClick={onCancel}>
                    Cancelar
                </Button>
            </div>
        </form>
    );
}