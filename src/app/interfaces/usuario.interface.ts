

export enum StatusLogin {
    LOGGED = 'LOGGED',
    NOT_LOGGED = 'NOT_LOGGED',
    LOGGING = 'LOGGING',
    ERROR = 'ERROR'
}

export  type TypeAuth = 'GOOGLE'|'MICROSOFT';


export interface ResponseCheckToken {
    usuario: UsuarioApp;
    token: string;
}

export interface UsuarioApp {
    id: string;
    name: string;
    username: string;
    email: string;
    photoURL: string;
}

export interface StateAuth {
    statusLogin: StatusLogin;
    usuario: UsuarioApp | null;
    mensaje?: string
}