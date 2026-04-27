import { useState } from "react";
import type {ActualizarUsuarioDTO, CrearUsuarioDTO, Usuario} from "../interfaces/Usuarios";
import Button from "../components/ui/Button";
import UsuariosTable from "../components/tables/UsuariosTable";
import Modal from "../components/ui/Modal";
import { useUsuarios } from "../hooks/useUsuarios";
import { Plus } from "lucide-react";
import UsuarioForm from "../components/forms/UsuarioForm";
import EditarUsuarioForm from "../components/forms/EditarUsuarioForm";
 
export default function UsuariosPage() {
  const { usuarios, loading, error, crear, actualizar, eliminar } =
    useUsuarios();
  const [showCrear, setShowCrear] = useState(false);
  const [seleccionado, setSeleccionado] = useState<Usuario | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const handleCrear = async (data: CrearUsuarioDTO) => {
    try {
      setFormError(null);
      await crear(data);
      setShowCrear(false);
    } catch (err: any) {
      setFormError(err.message);
    }
  };
 
  const handleActualizar = async (data: ActualizarUsuarioDTO) => {
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
    if (!confirm("¿Confirmas eliminar este usuario?")) return;
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
          <h1 className="text-2xl font-bold text-slate-800">Usuarios</h1>
          <p className="text-slate-500 text-sm mt-1">
            {usuarios.length} usuario(s) registrado(s)
          </p>
        </div>
        <Button onClick={() => setShowCrear(true)} icon={<Plus size={16} />}>
          Nuevo Usuario
        </Button>
      </div>
 
      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}
 
      <UsuariosTable
        usuarios={usuarios}
        loading={loading}
        onEditar={(u) => {
          setFormError(null);
          setSeleccionado(u);
        }}
        onEliminar={handleEliminar}
      />
 
      {/* Modal: Crear */}
      <Modal
        open={showCrear}
        onClose={() => setShowCrear(false)}
        title="Crear Usuario"
      >
        {formError && <p className="text-red-600 text-sm mb-3">{formError}</p>}
        { <UsuarioForm onSubmit={handleCrear} onCancel={() => setShowCrear(false)} /> }
      </Modal>
 
      {/* Modal: Editar */}
      <Modal
        open={!!seleccionado}
        onClose={() => setSeleccionado(null)}
        title="Editar Usuario"
      >
        {formError && <p className="text-red-600 text-sm mb-3">{formError}</p>}
        {seleccionado &&
          <EditarUsuarioForm
            usuario={seleccionado}
            onSubmit={handleActualizar}
            onCancel={() => setSeleccionado(null)}
          />
        }
      </Modal>
    </div>
  );
}