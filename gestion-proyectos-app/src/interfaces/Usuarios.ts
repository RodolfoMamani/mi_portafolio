export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  createAt: string;
}

export interface CrearUsuarioDTO {
  nombre: string;
  email: string;
  password: string;
}

export interface ActualizarUsuarioDTO {
  nombre?: string;
  email?: string;
}
