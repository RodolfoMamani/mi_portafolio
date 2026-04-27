import { useState } from "react";
import type { ActualizarProyectoDTO, CrearProyectoDTO, Proyecto } from "../interfaces/Proyectos";
import Button from "../components/ui/Button";
import ProyectosTable from "../components/tables/ProyectosTable";
import Modal from "../components/ui/Modal";
import { useProyectos } from "../hooks/useProyectos";
import { useUsuarios } from "../hooks/useUsuarios";
import { Plus } from "lucide-react";
import ProyectoForm from "../components/forms/ProyectoForm";
import EditarProyectoForm from "../components/forms/EditarProyectoForm";

export default function ProyectosPage() {
  const { proyectos, loading, error, crear, actualizar, eliminar } =
    useProyectos();
  const { usuarios } = useUsuarios();
  const [showCrear, setShowCrear] = useState(false);
  const [seleccionado, setSeleccionado] = useState<Proyecto | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const handleCrear = async (data: CrearProyectoDTO) => {
    try {
      setFormError(null);
      await crear(data);
      setShowCrear(false);
    } catch (err: any) {
      setFormError(err.message);
    }
  };

  const handleActualizar = async (data: ActualizarProyectoDTO) => {
    if (!seleccionado) return;
    try {
      setFormError(null);
      await actualizar(seleccionado.id, data);
      setSeleccionado(null);
    } catch (err: any) {
      setFormError(err.message);
    }
  };

  const handleEliminar = async (id: number) => {
    const proyecto = proyectos.find(p => p.id === id);
    const tieneTareas = proyecto?.tareas && proyecto.tareas.length > 0;
    
    let mensaje = "¿Confirmas eliminar este proyecto?";
    if (tieneTareas) {
      mensaje = `⚠️ ADVERTENCIA: Este proyecto tiene ${proyecto.tareas?.length || 0} tarea(s) asociada(s).\n\nAl eliminar el proyecto, también se eliminarán todas sus tareas en cascada.\n\n¿Confirmas eliminar este proyecto?`;
    }
    
    if (!confirm(mensaje)) return;
    try {
      await eliminar(id);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Proyectos</h1>
          <p className="text-slate-500 text-sm mt-1">
            {proyectos.length} proyecto(s) registrado(s)
          </p>
        </div>
        <Button onClick={() => setShowCrear(true)} icon={<Plus size={16} />}>
          Nuevo Proyecto
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <ProyectosTable
        proyectos={proyectos}
        loading={loading}
        onEditar={(p) => {
          setFormError(null);
          setSeleccionado(p);
        }}
        onEliminar={handleEliminar}
      />

      {/* Modal: Crear */}
      <Modal
        open={showCrear}
        onClose={() => setShowCrear(false)}
        title="Crear Proyecto"
      >
        {formError && <p className="text-red-600 text-sm mb-3">{formError}</p>}
        { <ProyectoForm usuarios={usuarios} onSubmit={handleCrear} onCancel={() => setShowCrear(false)} /> }
      </Modal>

      {/* Modal: Editar */}
      <Modal
        open={!!seleccionado}
        onClose={() => setSeleccionado(null)}
        title="Editar Proyecto"
      >
        {formError && <p className="text-red-600 text-sm mb-3">{formError}</p>}
        {seleccionado &&
          <EditarProyectoForm
            proyecto={seleccionado}
            usuarios={usuarios}
            onSubmit={handleActualizar}
            onCancel={() => setSeleccionado(null)}
          />
        }
      </Modal>
    </div>
  );
}
