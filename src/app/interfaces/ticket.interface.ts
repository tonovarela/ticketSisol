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