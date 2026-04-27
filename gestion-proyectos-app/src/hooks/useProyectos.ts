import { useState, useEffect, useCallback } from 'react';
import { proyectoService } from '../services/proyectoService';
import type { ActualizarProyectoDTO, CrearProyectoDTO, Proyecto } from '../interfaces/Proyectos';

export const useProyectos = () => {
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const cargar = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await proyectoService.getAll();
            setProyectos(data);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { cargar(); }, [cargar]);

    const crear = async (payload: CrearProyectoDTO) => {
        const nuevo = await proyectoService.create(payload);
        setProyectos((prev) => [...prev, nuevo]);
        return nuevo;
    };

    const actualizar = async (id: number, payload: ActualizarProyectoDTO) => {
        const actualizado = await proyectoService.update(id, payload);
        setProyectos((prev) => prev.map((p) => (p.id === id ? actualizado : p)));
        return actualizado;
    };

    const eliminar = async (id: number) => {
        await proyectoService.remove(id);
        setProyectos((prev) => prev.filter((p) => p.id !== id));
    };

    return { proyectos, loading, error, cargar, crear, actualizar, eliminar };
};