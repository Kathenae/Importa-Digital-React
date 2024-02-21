import { DynamicFormInputs } from "./Components/DynamicForm";
import { Lesson, Plan, User } from "./types";
import { reduceToRecord } from "./utils";

export function UserForm( {user, plans} : {user?: User, plans: Plan[]}): DynamicFormInputs {
    return [
        { name: 'name', type: 'text', value: user?.name ?? '' },
        { name: 'email', type: 'email', value: user?.email ?? '' },
        { name: 'password', type: 'password', value: '' },
        { name: 'password_confirmation', type: 'password', value: '' },
        { name: 'role', choices: { 'admin': 'Super Admin', 'student': 'Estudante' }, value: 'student' },
        { name: 'plan_id', value: user?.plan? user.plan.id : plans[0].id, choices: reduceToRecord(plans, 'id', 'name')}
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
                {
                    name: 'lessons', 
                    value: plan?.lessons? plan.lessons.map(l => l.id) : [], 
                    choices: reduceToRecord(lessons, 'id', 'title')
                }
            ]
        },
    ];
}