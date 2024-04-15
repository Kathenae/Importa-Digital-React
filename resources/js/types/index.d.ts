import { DynamicFormInputs } from "@/Components/DynamicForm";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    is_approved: boolean,
    plan?: Plan,
    courses?: Course[],
    assigned_courses?: Course[],
    role: string,
    permissions: string[],
}

export type UserType = 'super-admin' | 'teacher' | 'student' | 'moderator'

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
    courses?: Course[]
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
    duration_years: number,
    type: string | null,
    schedule: string | null,
    headquarters: string | null,
    candidate_profile: string | null,
    cover_url: string | null,
    banner_url: string | null,
    video_url: string | null,
    plans?: Plan[];
    lessons?: Lesson[];
    subjects?: Subject[]
}

export interface Subject {
    id: number,
    course_id: number,
    name: string,
    year: number,
}

export type Flash = {
    success?: string,
    error?: string,
    warning?: string,
}

export type Popup = {
    message: string;
    type: 'alert' | 'confirm' | 'ask' | 'form';
    choices?: Record<string, string | number>;
    form?: { title: string, url: string, method?: 'post' | 'put' | 'patch', inputs: DynamicFormInputs };
    variant: 'success' | 'warning' | 'danger' | 'info'
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    flash: Flash;
    popup?: Popup;
};
