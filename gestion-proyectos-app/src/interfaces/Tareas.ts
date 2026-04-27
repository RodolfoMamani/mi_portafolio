export const Estado = {
  PENDIENTE: 'PENDIENTE',
  EN_PROGRESO: 'EN_PROGRESO',
  COMPLETADA: 'COMPLETADA',
} as const;

export type Estado = typeof Estado[keyof typeof Estado];

export interface Proyecto {
  id: number;
  nombre: string;
}

export interface Usuario {
  id: number;
  nombre: string;
}

export interface Tarea {
  id: number;
  titulo: string;
  descripcion: string | null;
  estado: Estado;
  creadoEn: string;
  proyectoId: number;
  proyecto?: {
    id: number;
    nombre: string;
  };
  usuarioId: number | null;
  usuario?: {
    id: number;
    nombre: string;
  };
}

export interface CrearTareaDTO {
  titulo: string;
  descripcion?: string;
  proyectoId: number;
  usuarioId: number;
}

export interface ActualizarTareaDTO {
  titulo?: string;
  descripcion?: string;
  estado?: Estado;
  proyectoId?: number;
  usuarioId?: number;
}