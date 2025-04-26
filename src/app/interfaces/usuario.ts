export interface Usuario {
  _id: string;
  nombre: string;
  correoElectronico: string;
  contrasena?: string;
  rol: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  }

  export interface userLogin {
    nombre: string,
    correo:string,
  }