import { DynamicFormInputs } from "./Components/DynamicForm";
import { Lesson, Plan, User, Course, Subject } from "./types";
import { reduceToRecord } from "./utils";

export function UserForm({ user, courses }: { user?: User, courses: Course[] }): DynamicFormInputs {
    return [
        { name: 'name', type: 'text', value: user?.name ?? '' },
        { name: 'email', type: 'email', value: user?.email ?? '' },
        { name: 'password', type: 'password', value: '' },
        { name: 'password_confirmation', type: 'password', value: '' },
        { name: 'role', choices: { 'admin': 'Super Admin', 'student': 'Estudante' }, value: 'student' },
        { name: 'courses', value: user?.courses?.map(l => l.id) ?? [], choices: reduceToRecord(courses, 'id', 'name') },
    ]
}

export function LessonForm({ lesson, courses }: { lesson?: Lesson, courses: Pick<Course, 'id' | 'name'>[]  }): DynamicFormInputs {
    return [
        { name: 'title', type: 'text', value: lesson?.title ?? '' },
        { name: 'description', type: 'textarea', value: lesson?.description ?? '' },
        { name: 'video', type: 'file', accept: 'video/*', value: '' },
        { name: 'lesson_files', type: 'file', multiple: true, value: '' },
        { name: 'course', choices: reduceToRecord(courses, 'id', 'name'), value: lesson?.courses ? lesson.courses[0].id : courses[0].id },
    ]
}

export function PlanForm({ plan, users }: { plan?: Plan, users: User[] }): DynamicFormInputs {
    return [
        {
            name: 'Plano',
            inputs: [
                { name: 'name', type: 'text', value: plan?.name ?? '' },
                { name: 'description', type: 'textarea', value: plan?.description ?? '' },
                {
                    name: 'subscribers',
                    value: plan?.subscribers ? plan.subscribers.map(u => u.id) : [],
                    choices: reduceToRecord(users, 'id', 'email')
                }
            ]
        },
    ];
}

export function CourseForm({ course }: { course?: Course }): DynamicFormInputs {
    return [
        {
            name: 'Basico',
            inputs: [
                { name: 'name', type: 'text', value: course?.name ?? '' },
                { name: 'type', choices: { tecnicatura: 'Tecnicatura', capacitacione: 'Capacitacione' }, value: course?.type },
                { name: 'duration_years', type: 'number', value: course?.duration_years ?? 1 },
                { name: 'headquarters', type: 'text', placeholder: 'ejemplo: Ciudad del Este y Fernando de la Mora.', value: course?.headquarters ?? '' },
                { name: 'schedule', type: 'text', placeholder: 'ejemplo: Sábado 08:00 a 17:00.', value: course?.schedule ?? '' },
            ]
        },
        {
            name: 'Info da carreira',
            inputs: [
                { name: 'description', type: 'textarea', placeholder: 'ejemplo: Dirigida a egresados de colegios secundarios que...', value: course?.description ?? '' },
                { name: 'candidate_profile', type: 'textarea', placeholder: 'ejemplo: El egresado de curso será capaz de...', value: course?.candidate_profile ?? '' },
            ]
        },
        {
            name: 'Ficheros',
            inputs: [
                { name: 'cover_url', type: 'file', accept: 'image/*', value: '' },
                { name: 'banner_url', type: 'file', accept: 'image/*', value: '' },
                { name: 'video_url', type: 'file', accept: 'video/*', value: '' },
            ]
        }
    ]
}

export function SubjectForm({ subject }: { subject?: Subject }): DynamicFormInputs {
    return [
        { name: 'name', type: 'text', value: subject?.name ?? '' },
        { name: 'year', type: 'number', value: subject?.year ?? '' },
    ]
}