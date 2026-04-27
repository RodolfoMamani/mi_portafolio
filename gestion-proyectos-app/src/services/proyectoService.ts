import axiosInstance from "../api/axiosInstance";
import type { ActualizarProyectoDTO, CrearProyectoDTO, Proyecto } from "../interfaces/Proyectos";

export const proyectoService = {
  getAll: async (): Promise<Proyecto[]> => {
    const { data } = await axiosInstance.get<Proyecto[]>('/proyectos?include=tareas');
    return data;
  },

  getById: async (id: number): Promise<Proyecto> => {
    const { data } = await axiosInstance.get<Proyecto>(`/proyectos/${id}`);
    return data;
  },

  create: async (payload: CrearProyectoDTO): Promise<Proyecto> => {
    const { data } = await axiosInstance.post<Proyecto>('/proyectos', payload);
    return data;
  },

  update: async (id: number, payload: ActualizarProyectoDTO): Promise<Proyecto> => {
    const { data } = await axiosInstance.patch<Proyecto>(`/proyectos/${id}`, payload);
    return data;
  },

  remove: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/proyectos/${id}`);
  },
};