export interface Ticket {
    id_ticket?: string;
    id_zona?: string;
    id_categoria?: string;
    zona: string;
    id_solicitante: string;
    solicitante?: string;
    titulo: string;
    fecha_registro: Date;
    dias_respuesta: number;
    fecha_respuesta?: Date;
    descripcion: string;
    categoria: string;
    es_queja: boolean;
    asignado?: string;
    situacion: string;
    id_estado: number;
    color?: string;

}

export interface DocumentoAlta {
    src: string,
    name: string,
    isImage: boolean,
    type: string,
    base64: string
}

export interface SolicitudAlta {
    id_zona: number;
    id_categoria: number;
    titulo: string;
    descripcion: string;
    esqueja: boolean;
    id_solicitante: string;
    archivo?: File
}
export interface Estado {
    id_estado: number;
    descripcion: string;

}


export interface Zona {
    id_zona: number;
    descripcion: string;
}

export interface Categoria {
    id_categoria: number;
    descripcion: string;
}


export interface OnUpdateTicketModel {
    ticket: Ticket;
    cambioFechaCompromiso: boolean;
}


export interface ResponseListadoTickets {
    tickets: Ticket[];
}

export interface ResponseCatalogo {
    estados: Estado[];
    categorias: Categoria[];
    zonas: Zona[];
}




export interface ResponseBitacora {
    bitacora: Bitacora[];
}

export interface Bitacora {
    id_ticket:      string;
    mensaje:        string;
    foto:           string;
    extension:      string;
    movimiento:     string;
    fecha_registro: Date;
    id_usuario:     string;
    categoria:           string;
    username:          string;
    id:string
}

