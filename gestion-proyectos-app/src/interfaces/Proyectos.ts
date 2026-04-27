export interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

export interface Proyecto {
  id: number;
  nombre: string;
  descripcion: string | null;
  creadoEn: string;
  usuarioId: number;
  usuario?: {
    nombre: string;
  };
  tareas?: import('./Tareas').Tarea[];
}

export interface CrearProyectoDTO {
  nombre: string;
  descripcion?: string;
  usuarioId: number;
}

export interface ActualizarProyectoDTO {
  nombre?: string;
  descripcion?: string;
  usuarioId?: number;
}