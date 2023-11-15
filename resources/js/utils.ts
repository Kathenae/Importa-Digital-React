import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getQueryParams(): Record<string, string> {
    const searchParams = new URLSearchParams(window.location.search);
    const queryParams: Record<string, string> = {};

    for (const [key, value] of searchParams.entries()) {
        queryParams[key] = value;
    }

    return queryParams;
}

export function lerp(start: number, end: number, t: number) {
    return start * (1 - t) + end * t;
}

export async function downloadFiles(urls: string[]) {
    const filePromises = urls.map(async url => {
        const response = await fetch(url)
        const blob = await response.blob();
        return blob;
    });

    const files = await Promise.all(filePromises);
    return files ?? []
}

/**
 * This function translates English words into Portuguese.
 * It takes a string as an input and checks if it exists in the dictionary object.
 * If the input string exists as a key in the dictionary, it returns the corresponding value.
 * If the input string does not exist in the dictionary, it returns the input string as is.
 */
export function translate(value: string | boolean | number | null) {

    if(value == null){
        return ''
    }

    if(typeof value == 'boolean'){
        value = value? 'true' : 'false'
    }

    if(typeof value == 'number'){
        value = value.toString()
    }

    const dictionary = {
        'id': 'ID',

        // User Credentials/Authentication
        'name': 'Nome',
        'email': 'Email',
        'password': 'Palavra-passe',
        'password_confirmation': 'Confirme a Palavra-passe',
        'role': 'Função',
        'admin': 'Administrador',
        'moderator': 'Moderador',
        'guest': 'Utilizador',

        // Lesson
        'title': 'Titulo',
        'description': 'Descrição',
        'video': 'Vídeo',
        'videourl': 'Link do Vídeo',

        // Navigation
        'next': 'Seguinte',
        'previous': 'Anterior',

        'true': 'Sim',
        'false': 'Não',
        'submit': 'Enviar',

        // Permissions
        'permissions': 'Permissões',
        'is_approved': 'Aprovado',
        'view-admin-dashboard': 'Ver Painel de Controlo',

        // User Permissions
        'view@user': 'Ver Utilizadores',
        'create@user': 'Criar Utilizadores',
        'edit@user': 'Editar Utilizadores',
        'update@user': 'Atualizar Utilizadores',
        'destroy@user': 'Eliminar Utilizadores',
        'destroymany@user': 'Eliminar Vários Utilizadores',

        // Lesson Permissions
        'view@lesson': 'Ver Lições',
        'watch@lesson': 'Ver Vídeos',
        'create@lesson': 'Criar Lições',
        'edit@lesson': 'Editar Lições',
        'update@lesson': 'Atualizar Lições',
        'destroy@lesson': 'Eliminar Lições',
        'destroymany@lesson': 'Eliminar Várias Lições',
    }

    if (value.toLocaleLowerCase() in dictionary) {
        return dictionary[value.toLocaleLowerCase() as keyof typeof dictionary]
    }
    else {
        return value
    }
}

/**
 * converts a string to boolean
 *
 * @param yesNoString the string to be converted to boolean
 * @returns boolean representation of yesNoString
 */
export function yesNo(yesNoString: string){
    return yesNoString == 'yes'? true : yesNoString == 'no'? false : undefined
}
