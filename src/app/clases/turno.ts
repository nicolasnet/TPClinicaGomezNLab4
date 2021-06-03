import { User } from "./user";

export type Estado = 'disponible' | 'ocupado' | 'cancelado'| 'finalizado'| 'rechazado'| 'aceptado';

export class Turno {
    id: string;
    // emailMedico: string;
    medico: User;
    especialidad: string;
    dia: Date;
    // horario: number;
    duracion: number;
    estado: Estado;
    paciente?: User;
    emailPaciente?: string;
    reseñaMedico?: string;
    calificacion?: number;
    comentario?: string;
}
