@component('mail::message')
# Inscripción en Curso

Has recibido una nueva solicitud de inscripción para el curso **{{ $data['course_name'] }}**.

@component('mail::table')
    |                            |                             |
    | -------------------------- | --------------------------- |
    | **Nombre**                 | {{ $data['name'] }}         |
    | **Correo electrónico**     | {{ $data['email'] }}        |
    | **Contacto**               | {{ $data['phone_number'] }} |
    | **Curso**                  | {{ $data['course_name'] }}  |
@endcomponent

Visita la página de administración para registrar al estudiante en el curso. Sigue estos pasos:
- Haz clic en el botón de abajo
- Inicia sesión con tus credenciales si es necesario
- Haz clic en "Gestionar Usuarios"
- Haz clic en "Nuevo Usuario"
- Completa los campos con los datos mencionados anteriormente
- Elige una contraseña segura para el estudiante
- Haz clic en "enviar"
- Por último, no olvides enviar la información de acceso al estudiante (correo electrónico y contraseña)

@component('mail::button', ['url' => route('admin')])
Ir a la página de administración
@endcomponent
@endcomponent
