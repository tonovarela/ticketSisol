export interface  Mensaje {
    categoria:'SYSTEM' | 'USER'
    usuario: string;
    mensaje: string;    
    archivo?:Archivo
    propio: boolean;
    avatar: string;    
    fecha?: Date;
    id?: string;
    tipo: TipoMensaje;    
}

export interface Archivo {
    url:string;
    nombre:string;
}
export enum TipoMensaje {
    TEXTO = 'TEXTO',
    IMAGEN = 'IMAGEN',
    ARCHIVO = 'ARCHIVO'
}