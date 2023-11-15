export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    is_approved: boolean,
}

export interface UserPermission{
    id: number;
    action: string;
    user_id: string;
}

export interface Lesson {
    id: number;
    title: string;
    description: string;
    videoUrl: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
        permissions?: string[];
    };
};
