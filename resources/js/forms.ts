import { DynamicFormInputs } from "./Components/DynamicForm";
import { Lesson, Plan, User } from "./types";

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

export function PlanForm({plan, lessons} : {plan?: Plan, lessons: Lesson[]}): DynamicFormInputs{
    return [
        {
            name: 'Plano',
            inputs: [
                {name: 'name', type: 'text', value: plan?.name ?? ''},
                {name: 'description', type: 'textarea', value: plan?.description ?? ''},
                {name: 'lessons', value: plan?.lessons? plan.lessons.map(l => l.id) : [], choices: lessons.reduce((result, item) => {
                    result[item.id] = item.title
                    return result;
                }, {} as Record<string, string>)}
            ]
        },
    ];
}