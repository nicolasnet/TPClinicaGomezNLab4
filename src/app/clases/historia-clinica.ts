import { Turno } from "./turno";

export class HistoriaClinica {
    emailPaciente: string;
    turno?: Turno;
    altura: number;
    peso: number;
    temperatura: number;
    presion: number;
    otrosDatos?: string;
    clave1?: string;
    valor1?: string;
    clave2?: string;
    valor2?: string;
    clave3?: string;
    valor3?: string;
}
