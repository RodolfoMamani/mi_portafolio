import { useProyectos } from "../hooks/useProyectos";
import { useTareas } from "../hooks/useTareas";
import { useUsuarios } from "../hooks/useUsuarios";
import { FolderKanban, CheckSquare, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { proyectos, loading: loadingProyectos } = useProyectos();
  const { tareas, loading: loadingTareas } = useTareas();
  const { usuarios, loading: loadingUsuarios } = useUsuarios();

  // Calcular estadísticas globales
  const totalProyectos = proyectos.length;
  const totalTareas = tareas.length;
  const totalUsuarios = usuarios.length;
  const tareasCompletadas = tareas.filter(t => t.estado === "COMPLETADA").length;
  const tareasPendientes = tareas.filter(t => t.estado === "PENDIENTE").length;
  const tareasEnProgreso = tareas.filter(t => t.estado === "EN_PROGRESO").length;
  
  // Calcular porcentaje de completación
  const porcentajeCompletado = totalTareas > 0 ? Math.round((tareasCompletadas / totalTareas) * 100) : 0;

  // Calcular avance por proyecto
  const getProyectoAvance = (proyectoId: number) => {
    const tareasProyecto = tareas.filter(t => t.proyectoId === proyectoId);
    if (tareasProyecto.length === 0) return 0;
    const completadas = tareasProyecto.filter(t => t.estado === "COMPLETADA").length;
    return Math.round((completadas / tareasProyecto.length) * 100);
  };

  // Obtener estado de proyecto basado en sus tareas
  const getProyectoEstado = (proyectoId: number) => {
    const tareasProyecto = tareas.filter(t => t.proyectoId === proyectoId);
    if (tareasProyecto.length === 0) return "sin-tareas";
    const completadas = tareasProyecto.filter(t => t.estado === "COMPLETADA").length;
    if (completadas === tareasProyecto.length) return "completado";
    const enProgreso = tareasProyecto.filter(t => t.estado === "EN_PROGRESO").length;
    if (enProgreso > 0) return "en-progreso";
    return "pendiente";
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "completado": return "bg-green-100 text-green-700 border-green-200";
      case "en-progreso": return "bg-blue-100 text-blue-700 border-blue-200";
      case "pendiente": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default: return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  const getEstadoLabel = (estado: string) => {
    switch (estado) {
      case "completado": return "Completado";
      case "en-progreso": return "En Progreso";
      case "pendiente": return "Pendiente";
      default: return "Sin Tareas";
    }
  };

  if (loadingProyectos || loadingTareas || loadingUsuarios) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-slate-400 animate-pulse">Cargando datos...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-500 mt-1">Resumen general de gestión de proyectos</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-400">{new Date().toLocaleDateString('es-BO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Proyectos Activos</p>
              <p className="text-4xl font-bold mt-1">{totalProyectos}</p>
            </div>
            <div className="p-3 bg-white/20 rounded-xl">
              <FolderKanban size={28} />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-blue-100 text-sm">+{proyectos.filter(p => getProyectoEstado(p.id) === 'en-progreso').length} en progreso</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm font-medium">Tareas Totales</p>
              <p className="text-4xl font-bold mt-1">{totalTareas}</p>
            </div>
            <div className="p-3 bg-white/20 rounded-xl">
              <CheckSquare size={28} />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-emerald-100 text-sm">{tareasCompletadas} completadas</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100 text-sm font-medium">Pendientes</p>
              <p className="text-4xl font-bold mt-1">{tareasPendientes}</p>
            </div>
            <div className="p-3 bg-white/20 rounded-xl">
              <Clock size={28} />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-amber-100 text-sm">{tareasEnProgreso} en proceso</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Equipo</p>
              <p className="text-4xl font-bold mt-1">{totalUsuarios}</p>
            </div>
            <div className="p-3 bg-white/20 rounded-xl">
              <Users size={28} />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-purple-100 text-sm">Miembros registrados</p>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overall Progress */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Progreso General</h3>
          <div className="flex items-center justify-center">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="80" cy="80" r="70" fill="none" stroke="#e2e8f0" strokeWidth="12" />
                <circle 
                  cx="80" cy="80" r="70" fill="none" 
                  stroke="#10b981" strokeWidth="12" 
                  strokeDasharray={`${porcentajeCompletado * 4.4} 440`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-4xl font-bold text-slate-800">{porcentajeCompletado}%</span>
                  <p className="text-sm text-slate-500">Completado</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-yellow-600">{tareasPendientes}</p>
              <p className="text-xs text-slate-500">Pendientes</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{tareasEnProgreso}</p>
              <p className="text-xs text-slate-500">En Progreso</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{tareasCompletadas}</p>
              <p className="text-xs text-slate-500">Completadas</p>
            </div>
          </div>
        </div>

        {/* Proyectos con avance */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm lg:col-span-2">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800">Estado de Proyectos</h3>
            <Link to="/proyectos" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Ver todos →
            </Link>
          </div>

          {proyectos.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              <FolderKanban className="mx-auto mb-2" size={32} />
              <p>No hay proyectos registrados</p>
              <Link to="/proyectos" className="text-blue-600 hover:text-blue-700 text-sm">
                Crear primer proyecto
              </Link>
            </div>
          ) : (
            <div className="p-5 space-y-4">
              {proyectos.slice(0, 4).map((proyecto) => {
                const avance = getProyectoAvance(proyecto.id);
                const estado = getProyectoEstado(proyecto.id);
                const tareasProyecto = tareas.filter(t => t.proyectoId === proyecto.id);
                const tareasCount = tareasProyecto.length;

                return (
                  <div key={proyecto.id} className="p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-slate-800">{proyecto.nombre}</h4>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getEstadoColor(estado)}`}>
                            {getEstadoLabel(estado)}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">
                          {proyecto.usuario?.nombre || "Sin responsable"} • {tareasCount} {tareasCount === 1 ? "tarea" : "tareas"}
                        </p>
                      </div>
                      <span className="text-xl font-bold text-slate-800">{avance}%</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          estado === "completado" ? "bg-green-500" :
                          estado === "en-progreso" ? "bg-blue-500" :
                          estado === "pendiente" ? "bg-yellow-500" : "bg-slate-400"
                        }`}
                        style={{ width: `${avance}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Tareas recientes */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-800">Últimas Tareas</h3>
          <Link to="/tareas" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Ver todas →
          </Link>
        </div>

        {tareas.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            <CheckSquare className="mx-auto mb-2" size={32} />
            <p>No hay tareas registradas</p>
            <Link to="/tareas" className="text-blue-600 hover:text-blue-700 text-sm">
              Crear primera tarea
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600 font-semibold">
                <tr>
                  <th className="text-left px-5 py-3">Tarea</th>
                  <th className="text-left px-5 py-3">Proyecto</th>
                  <th className="text-left px-5 py-3">Asignado a</th>
                  <th className="text-left px-5 py-3">Estado</th>
                  <th className="text-left px-5 py-3">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {tareas.slice(0, 5).map((tarea) => (
                  <tr key={tarea.id} className="border-t border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="font-medium text-slate-800">{tarea.titulo}</div>
                      <div className="text-xs text-slate-400">{tarea.descripcion?.substring(0, 50) || "Sin descripción"}...</div>
                    </td>
                    <td className="px-5 py-3 text-slate-600">{tarea.proyecto?.nombre || '-'}</td>
                    <td className="px-5 py-3 text-slate-600">{tarea.usuario?.nombre || '-'}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        tarea.estado === "COMPLETADA" ? "bg-green-100 text-green-700" :
                        tarea.estado === "EN_PROGRESO" ? "bg-blue-100 text-blue-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>
                        {tarea.estado === "COMPLETADA" ? "Completada" :
                         tarea.estado === "EN_PROGRESO" ? "En Progreso" : "Pendiente"}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-slate-400 text-xs">
                      {new Date(tarea.creadoEn).toLocaleDateString("es-BO")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
