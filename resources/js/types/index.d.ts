export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    is_approved: boolean,
    plan?: Plan,
}

export interface UserPermission{
    id: number;
    action: string;
    user_id: string;
}

export interface Plan {
    id: number
    name: string,
    lessons?: Lesson[],
    description: string
}

export interface Lesson {
    id: number;
    title: string;
    description: string;
    videoUrl: string;
    files?: LessonFile[]
}

export interface LessonFile{
    id: number,
    filename: string,
    path: string
    full_url: string
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
        permissions?: string[];
    };
};
