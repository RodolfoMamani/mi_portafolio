import { Pencil, Trash2, CheckSquare } from "lucide-react";
import type { Tarea, Estado } from "../../interfaces/Tareas";
import Button from "../ui/Button";
import EmptyState from "../ui/EmptyState";

interface Props {
    tareas: Tarea[];
    loading: boolean;
    onEliminar: (id: number) => void;
    onEditar: (tarea: Tarea) => void;
    onCambiarEstado: (id: number, estado: Estado) => void;
}

const estadoColors: Record<Estado, string> = {
  PENDIENTE: 'bg-yellow-100 text-yellow-700',
  EN_PROGRESO: 'bg-blue-100 text-blue-700',
  COMPLETADA: 'bg-green-100 text-green-700',
};

export default function TareasTable({ tareas, loading, onEditar, onEliminar, onCambiarEstado }: Props) {
  if (loading) return <div className="text-center py-12 text-slate-400 animate-pulse">Cargando tareas...</div>;
  if (!tareas.length) return <EmptyState icon={CheckSquare} title="Sin tareas" description="Crea la primera tarea para comenzar." />;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-slate-600 font-semibold">
          <tr>
            <th className="text-left px-5 py-3">#</th>
            <th className="text-left px-5 py-3">Título</th>
            <th className="text-left px-5 py-3">Proyecto</th>
            <th className="text-left px-5 py-3">Usuario</th>
            <th className="text-left px-5 py-3">Estado</th>
            <th className="text-left px-5 py-3">Creado</th>
            <th className="text-left px-5 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tareas.map((t) => (
            <tr key={t.id} className="border-t border-slate-50 hover:bg-slate-50/50 transition-colors">
              <td className="px-5 py-3 text-slate-400">{t.id}</td>
              <td className="px-5 py-3 font-medium text-slate-800">{t.titulo}</td>
              <td className="px-5 py-3 text-slate-600">{t.proyecto?.nombre || '-'}</td>
              <td className="px-5 py-3 text-slate-600">{t.usuario?.nombre || '-'}</td>
              <td className="px-5 py-3">
                <select
                  value={t.estado as Estado}
                  onChange={(e) => onCambiarEstado(t.id, e.target.value as Estado)}
                  className={`px-2 py-1 rounded-full text-xs font-medium border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${estadoColors[t.estado as Estado] || estadoColors.PENDIENTE}`}
                >
                  <option value="PENDIENTE">Pendiente</option>
                  <option value="EN_PROGRESO">En Progreso</option>
                  <option value="COMPLETADA">Completada</option>
                </select>
              </td>
              <td className="px-5 py-3 text-slate-400">{new Date(t.creadoEn).toLocaleDateString('es-BO')}</td>
              <td className="px-5 py-3">
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => onEditar(t)} icon={<Pencil size={14} />}>
                    Editar
                  </Button>
                  <Button variant="danger" onClick={() => onEliminar(t.id)} icon={<Trash2 size={14} />}>
                    Eliminar
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}