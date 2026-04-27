import { useProyectos } from "../hooks/useProyectos";
import { useTareas } from "../hooks/useTareas";
import { FolderKanban, CheckSquare, TrendingUp, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { proyectos, loading: loadingProyectos } = useProyectos();
  const { tareas, loading: loadingTareas } = useTareas();

  // Calcular estadísticas globales
  const totalProyectos = proyectos.length;
  const totalTareas = tareas.length;
  const tareasCompletadas = tareas.filter(t => t.estado === "COMPLETADA").length;
  const tareasEnProgreso = tareas.filter(t => t.estado === "EN_PROGRESO").length;
  const tareasPendientes = tareas.filter(t => t.estado === "PENDIENTE").length;

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

  if (loadingProyectos || loadingTareas) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-slate-400 animate-pulse">Cargando datos...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Resumen de proyectos y tareas</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FolderKanban className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Proyectos</p>
              <p className="text-2xl font-bold text-slate-800">{totalProyectos}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckSquare className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Tareas Totales</p>
              <p className="text-2xl font-bold text-slate-800">{totalTareas}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Clock className="text-amber-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Pendientes</p>
              <p className="text-2xl font-bold text-slate-800">{tareasPendientes}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <TrendingUp className="text-emerald-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Completadas</p>
              <p className="text-2xl font-bold text-slate-800">{tareasCompletadas}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Proyectos con avance */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm">
        <div className="p-5 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">Proyectos y Avance</h2>
            <Link to="/proyectos" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Ver todos →
            </Link>
          </div>
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
          <div className="divide-y divide-slate-100">
            {proyectos.map((proyecto) => {
              const avance = getProyectoAvance(proyecto.id);
              const estado = getProyectoEstado(proyecto.id);
              const tareasProyecto = tareas.filter(t => t.proyectoId === proyecto.id);
              const tareasCount = tareasProyecto.length;

              return (
                <div key={proyecto.id} className="p-5 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-slate-800">{proyecto.nombre}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getEstadoColor(estado)}`}>
                          {getEstadoLabel(estado)}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500">{proyecto.descripcion || "Sin descripción"}</p>
                      <p className="text-xs text-slate-400 mt-1">
                        Responsable: {proyecto.usuario?.nombre || "Sin asignar"}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-slate-800">{avance}%</span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-2">
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          estado === "completado" ? "bg-green-500" :
                          estado === "en-progreso" ? "bg-blue-500" :
                          estado === "pendiente" ? "bg-yellow-500" : "bg-slate-300"
                        }`}
                        style={{ width: `${avance}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      {tareasCount} {tareasCount === 1 ? "tarea" : "tareas"}
                    </span>
                    <span className="text-slate-400">
                      {new Date(proyecto.creadoEn).toLocaleDateString("es-BO")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Tareas recientes */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm">
        <div className="p-5 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">Tareas Recientes</h2>
            <Link to="/tareas" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Ver todas →
            </Link>
          </div>
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
          <div className="divide-y divide-slate-100">
            {tareas.slice(0, 5).map((tarea) => (
              <div key={tarea.id} className="p-5 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-slate-800">{tarea.titulo}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        tarea.estado === "COMPLETADA" ? "bg-green-100 text-green-700" :
                        tarea.estado === "EN_PROGRESO" ? "bg-blue-100 text-blue-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>
                        {tarea.estado === "COMPLETADA" ? "Completada" :
                         tarea.estado === "EN_PROGRESO" ? "En Progreso" : "Pendiente"}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500">{tarea.descripcion || "Sin descripción"}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Proyecto: {tarea.proyecto?.nombre || "Sin proyecto"} • 
                      Asignado: {tarea.usuario?.nombre || "Sin asignar"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
