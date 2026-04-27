import { useForm } from "react-hook-form";
import type { ActualizarTareaDTO, Tarea, Estado, Proyecto, Usuario } from "../../interfaces/Tareas";
import Button from "../ui/Button";

interface Props {
    tarea: Tarea;
    proyectos: Proyecto[];
    usuarios: Usuario[];
    onSubmit: (data: ActualizarTareaDTO) => Promise<void>;
    onCancel: () => void;
}

export default function EditarTareaForm({
    tarea,
    proyectos,
    usuarios,
    onSubmit,
    onCancel,
}: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ActualizarTareaDTO>({
        defaultValues: { 
            titulo: tarea.titulo, 
            descripcion: tarea.descripcion || '',
            estado: tarea.estado as Estado,
            proyectoId: tarea.proyectoId,
            usuarioId: tarea.usuarioId ?? undefined,
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
                    Título *
                </label>
                <input
                    {...register("titulo", {
                        required: "El título es obligatorio",
                        minLength: { value: 3, message: "Mínimo 3 caracteres" },
                    })}
                    className={`${campo} ${errors.titulo ? error : normal}`}
                />
                {errors.titulo && (
                    <p className="text-red-500 text-xs mt-1">{errors.titulo.message}</p>
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
                    Estado
                </label>
                <select
                    {...register("estado")}
                    className={`${campo} ${errors.estado ? error : normal}`}
                >
                    <option value="PENDIENTE">Pendiente</option>
                    <option value="EN_PROGRESO">En Progreso</option>
                    <option value="COMPLETADA">Completada</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Proyecto *
                </label>
                <select
                    {...register("proyectoId", {
                        required: "El proyecto es obligatorio",
                        valueAsNumber: true,
                    })}
                    className={`${campo} ${errors.proyectoId ? error : normal}`}
                >
                    <option value="">Seleccionar proyecto...</option>
                    {proyectos.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.nombre}
                        </option>
                    ))}
                </select>
                {errors.proyectoId && (
                    <p className="text-red-500 text-xs mt-1">{errors.proyectoId.message}</p>
                )}
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Asignado a
                </label>
                <select
                    {...register("usuarioId", {
                        valueAsNumber: true,
                    })}
                    className={`${campo} ${errors.usuarioId ? error : normal}`}
                >
                    <option value="">Sin asignar</option>
                    {usuarios.map((u) => (
                        <option key={u.id} value={u.id}>
                            {u.nombre}
                        </option>
                    ))}
                </select>
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