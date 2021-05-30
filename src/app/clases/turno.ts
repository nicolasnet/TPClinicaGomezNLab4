import { User } from "./user";

export type Estado = 'disponible' | 'ocupado' | 'cancelado'| 'finalizado'| 'rechazado'| 'aceptado';

export class Turno {
    id: number;
    emailMedico: string;
    medico: User;
    especialidad: string;
    dia: string;
    horario: number;
    duracion: number;
    estado: Estado;
    paciente?: User;
    emailPaciente?: string;
    reseñaMedico?: string;
    calificacion?: number;
    comentario?: string;    
    
}
