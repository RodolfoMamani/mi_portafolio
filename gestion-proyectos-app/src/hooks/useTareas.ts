import { useState, useEffect, useCallback } from 'react';
import { tareaService } from '../services/tareaService';
import type { ActualizarTareaDTO, CrearTareaDTO, Tarea } from '../interfaces/Tareas';

export const useTareas = (proyectoId?: number, estado?: string) => {
    const [tareas, setTareas] = useState<Tarea[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const cargar = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await tareaService.getAll(proyectoId, estado);
            setTareas(data);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [proyectoId, estado]);

    useEffect(() => { cargar(); }, [cargar]);

    const crear = async (payload: CrearTareaDTO) => {
        const nuevo = await tareaService.create(payload);
        setTareas((prev) => [...prev, nuevo]);
        return nuevo;
    };

    const actualizar = async (id: number, payload: ActualizarTareaDTO) => {
        const actualizado = await tareaService.update(id, payload);
        setTareas((prev) => prev.map((t) => (t.id === id ? actualizado : t)));
        return actualizado;
    };

    const eliminar = async (id: number) => {
        await tareaService.remove(id);
        setTareas((prev) => prev.filter((t) => t.id !== id));
    };

    return { tareas, loading, error, cargar, crear, actualizar, eliminar };
};