export interface Usuario {
  // creadoEn: string | number | Date;
  id: number;
  nombre: string;
  email: string;
  creadoEn: string;
  
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


