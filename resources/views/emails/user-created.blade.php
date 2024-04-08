@component('mail::message')
# Bienvenido a {{env('APP_NAME')}}.

La plataforma que te conecta al mundo del comercio internacional de forma practica y eficiente!

Tu usuario y contraseña son:
- **Usuario**: {{ $data['email'] }}
- **Contraseña**: {{ $data['password'] }}

**Link de acceso**: [{{ $data['link'] }}]({{ $data['link'] }})


@component('mail::button', ['url' => route('courses')])
Ir a la página de cursos
@endcomponent
@endcomponent
