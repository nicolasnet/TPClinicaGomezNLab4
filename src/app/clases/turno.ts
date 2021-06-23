import { Encuesta } from "./encuesta";
import { HistoriaClinica } from "./historia-clinica";
import { User } from "./user";

export type Estado = 'disponible' | 'ocupado' | 'cancelado'| 'finalizado'| 'rechazado'| 'aceptado';

export class Turno {
    id: string;
    medico: User;
    especialidad: string;
    dia: Date;
    duracion: number;
    estado: Estado;
    paciente?: User;
    emailPaciente?: string;
    comentarioMedico?: string;
    calificacion?: number;
    comentario?: string;
    encuesta?: Encuesta;
    historiaClinica: HistoriaClinica;
}
