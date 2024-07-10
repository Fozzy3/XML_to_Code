# Generador de Blogs Web

Prototipo para la creación automática de blogs personalizados basado en las metodologías MDA y MDE.

## Requisitos Previos

- Visual Studio Code
- Node.js
- Python 3.9 o superior

## Instalación en Windows

1. Clona este repositorio.
2. Navega al directorio del proyecto.
3. Asegúrate de tener Python 3.9 o superior instalado.
4. Abre el proyecto en Visual Studio Code.
5. Abre la terminal de Visual Studio Code.
6. Ubícate en la ruta `//creador-blogs-back`.
7. Ejecuta los siguientes comandos uno por uno:
    ```sh
    python3 -m venv venv
    .\venv\Scripts\activate
    pip install -r .\requirements.txt
    hypercorn main:app --bind 0.0.0.0:8000
    ```
8. Abre otra terminal, ubícate en la ruta `//creador-blogs` y ejecuta:
    ```sh
    npm install
    npm start
    ```
    Esto debería abrir el navegador automáticamente en `localhost:3000`. Si no, ábrelo manualmente.

## Funcionalidades

En la aplicación encontrarás tres pestañas:

1. **Upload File**: Carga un archivo `.xml` para validar su estructura con el XSD.
2. **Form XSD**: Selecciona los componentes para tu página web, valida con el metamodelo y genera la página descargable en un archivo `.zip`.

## Estructura del Blog

- **Header**
    - Logo
    - Enlace
    - Barra de búsqueda
- **Columna Principal**
    - Contenido
        - Título
        - Imagen
        - Texto
        - Autor
        - Fecha
- **Barra Lateral**
    - Menú
- **Footer**
    - Texto
    - Enlace
    - Logo

## Comandos de npm

- `npm start`: Ejecuta la app en modo de desarrollo.
- `npm test`: Lanza el test runner.
- `npm run build`: Construye la app para producción.
- `npm run eject`: Copia todas las configuraciones para personalización.

## Plantillas Disponibles

- Header
- Imagen del blog
- Contenido del blog

## Construido con

- [Python](https://www.python.org/) - Lenguaje de programación
- [Node.js](https://nodejs.org/) - Entorno de ejecución de JavaScript
- [ROME](https://rometools.github.io/rome/) - Generación de RSS

## Documentación

Consulta la documentación para más detalles sobre el uso y desarrollo del proyecto.

## Versión

Versión 1.0

## Autores

Estudiantes del grupo Tendencias Avanzadas de Software

