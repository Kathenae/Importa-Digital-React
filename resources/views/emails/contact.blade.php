@component('mail::message')
# Nuevo mensaje del formulario de contacto en la página de inicio:

"{{$data['message']}}"

De:
- **Nombre**: {{ $data['name'] }}
- **Correo electrónico**: {{ $data['email'] }}

@endcomponent