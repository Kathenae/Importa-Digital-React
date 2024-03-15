import { DynamicFormInputs } from "./Components/DynamicForm";
import { Lesson, Plan, User, Course } from "./types";
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
        { name: 'lesson_files', type: 'file', multiple: true, value: '' },
    ]
}

export function PlanForm({plan, users} : {plan?: Plan, users: User[]}): DynamicFormInputs{
    console.log(plan)
    return [
        {
            name: 'Plano',
            inputs: [
                {name: 'name', type: 'text', value: plan?.name ?? ''},
                {name: 'description', type: 'textarea', value: plan?.description ?? ''},
                {
                    name: 'subscribers', 
                    value: plan?.subscribers? plan.subscribers.map(u => u.id) : [], 
                    choices: reduceToRecord(users, 'id', 'email')
                }
            ]
        },
    ];
}

export function CourseForm({ course, lessons, plans }: { course?: Course, plans: Plan[], lessons: Lesson[] }): DynamicFormInputs {
    return [
        { name: 'name', type: 'text', value: course?.name ?? '' },
        { name: 'description', type: 'textarea', value: course?.description ?? '' },
        { name: 'plans', value: course?.plans?.map(p => p.id) ?? [], choices: reduceToRecord(plans, 'id', 'name')},
        { name: 'lessons', value: course?.lessons?.map(l => l.id) ?? [], choices: reduceToRecord(lessons, 'id', 'title') },
    ]
}