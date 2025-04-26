export interface Tarea {

    _id?: string;
    titulo: string;
    descripcion?: string;
    completada?: boolean;
    fechaCreacion?: Date;
    fechaVencimiento?: Date;
    prioridad?: 'alta' | 'media' | 'baja';
    imagen?: string;
    
}

export interface Cancion {
    _id?: string;
    titulo: string;
    descripcion?: string;
    imagen?: string;
    categoria?: string; 

  }