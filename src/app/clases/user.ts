export type Roles = 'SUSCRIPTOR' | 'EDITOR' | 'ADMIN';

export class User {
    uid: string;
    email: string;
    displayName?: string;
    emailVerified: boolean;
    password?: string;
    photoURL?: string;
    role?: Roles;
}
