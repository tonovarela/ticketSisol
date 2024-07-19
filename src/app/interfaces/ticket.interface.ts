export interface Ticket {
    id_ticket: string;
    zona:string;
    solicitante: string;
    titulo:string;
    registro: Date;
    dias_respuesta: number;
    fecha_respuesta: Date;
    categoria: string;
    es_queja: boolean;
    asignado: string;
    compromiso:string;
    situacion: string;
    estado:string;
    id_estado: number;
    
}

export interface SolicitudAlta {
    id_zona:number;
    id_categoria:number;
    titulo:string;
    descripcion:string;
    esqueja:boolean;
    id_solicitante:string;
    archivo?:File 
}


export interface Zona {
    id_zona: number;
    descripcion: string;
}

export interface Categoria {
    id_categoria: number;
    descripcion: string;
}