import { DynamicFormInputs } from "./Components/DynamicForm";
import { Lesson, User } from "./types";

export function UserForm(user?: User): DynamicFormInputs {
    return [
        { name: 'name', type: 'text', value: user?.name ?? '' },
        { name: 'email', type: 'email', value: user?.email ?? '' },
        { name: 'password', type: 'password', value: '' },
        { name: 'password_confirmation', type: 'password', value: '' },
        { name: 'role', choices: { 'admin': 'Super Admin', 'student': 'Estudante' }, value: 'student' },
    ]
}

export function LessonForm(lesson?: Lesson): DynamicFormInputs {
    return [
        { name: 'title', type: 'text', value: lesson?.title ?? '' },
        { name: 'description', type: 'textarea', value: lesson?.description ?? '' },
        { name: 'video', type: 'file', accept: 'video/*', value: '' },
    ]
}
