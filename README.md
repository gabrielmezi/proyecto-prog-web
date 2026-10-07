# Mesa de Ayuda · Campus Ulima

Historia 1 del Tema 5, entrega de interfaz. React, Vite y Tailwind.

## Ejecutar

```bash
npm install
npm run dev
```

## Probar el acceso

No hay usuarios creados de antemano.

1. Abre «Registrarme» y completa tus datos.
2. Crea una contraseña de al menos 8 caracteres, con una mayúscula y un número.
3. Inicia sesión con el correo y la contraseña que registraste.

No recargues la página entre estos pasos: las cuentas se guardan temporalmente en `useState`.

## Pantallas

- `/#/`: landing pública.
- `/#/login`: acceso, mostrar contraseña, carga, errores y bloqueo de 15 minutos al quinto intento fallido.
- `/#/registro`: registro con validaciones.
- `/#/invitacion`: activación de técnico, máximo tres especialidades.
- `/#/invitacion?rol=supervisor`: activación de supervisor.
- `/#/recuperar`: correo, enlace enviado y nueva contraseña.
- `/#/mi-cuenta`: datos personales y cambio de contraseña; requiere entrar primero.
- `/#/403`: acceso denegado con sesión iniciada.
- `/#/404`: página no encontrada.

## Archivos

`src/App.jsx` conecta las pantallas y guarda las cuentas en un arreglo con `useState`. El correo activo identifica al usuario que inició sesión.

`src/components` tiene las cabeceras, pies, campos y mensajes compartidos.

`src/pages` tiene un componente por pantalla. `src/index.css` contiene Tailwind y estilos compartidos.

## Alcance de la demostración

No hay base de datos, servidor ni envío de correos. Recuperar permite avanzar al formulario de nueva contraseña para mostrar los tres pasos y cambiar la clave de una cuenta registrada durante la misma sesión.

La invitación conserva los datos de ejemplo del mockup. Esa cuenta solo se crea al pulsar «Activar mi cuenta». Las cuentas nuevas empiezan con cero tickets y encuestas.

Las cuentas, contraseñas y cambios existen solamente mientras la aplicación está abierta y se reinician al recargar. Solo se guarda el correo si marcas «Recordarme en este equipo».

Las secciones de tickets y encuestas pertenecen a otras historias y muestran una página informativa. Los enlaces de términos y privacidad usan el 404 porque no tienen una pantalla en esta historia.

## Verificación

```bash
npm run build
npm run lint
```

Se comprobó en Edge con Playwright: rechazo del antiguo usuario de ejemplo, registro, validación de correo duplicado, acceso, edición de perfil, cambio y recuperación de contraseña, y pérdida de las cuentas al recargar.
