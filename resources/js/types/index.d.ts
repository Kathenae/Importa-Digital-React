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
    description: string
    subscribers?: User[],
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

export interface Course {
    id: number;
    name: string;
    description: string;
    plans?: Plan[];
    lessons?: Lesson[];
}

export type Flash = {
    success?: string,
    error?: string,
    warning?: string,
}

export type Popup = {
    message: string;
    type: 'alert' | 'confirm';
    variant: 'success' | 'warning' | 'danger' | 'info'
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
        permissions?: string[];
    };
    flash: Flash;
    popup?: Popup;
    
};
