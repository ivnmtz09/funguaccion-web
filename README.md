# Funguacción Web API

Este es el backend de la Fundación Funguacción desarrollado con Django + DRF + JWT + MySQL.

## Características

- Autenticación con JWT
- Sistema de roles
- Registro de usuarios
- Subida de documentos
- CRUD de contenido
- API documentada con Swagger

## Instalación local

1. Clona el repositorio
2. Crea un entorno virtual
3. Instala dependencias: `pip install -r requirements.txt`
4. Crea un archivo `.env` con tus credenciales MySQL
5. Ejecuta `python manage.py migrate`
6. Corre el servidor con `python manage.py runserver`
