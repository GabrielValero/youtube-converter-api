# YouTube Converter API

YouTube Converter API es una solución para realizar búsquedas de videos en YouTube y generar enlaces para reproducir o descargar audio en formato MP3.

## Tabla de contenido

1. [Descripción del proyecto](#descripción-del-proyecto)
2. [Características](#características)
3. [Requisitos](#requisitos)
4. [Instalación](#instalación)
5. [Endpoints](#endpoints)

---

## Descripción del proyecto

Este proyecto ofrece una API que permite buscar videos en YouTube y obtener enlaces para reproducir o descargar audio en formato MP3. La API utiliza la **YouTube Data API** para realizar las búsquedas y **RapidAPI** para gestionar la conversión y descarga de los audios.

El objetivo de la API es simplificar el acceso a contenido de YouTube para convertirlo en audio, facilitando la integración en aplicaciones que necesiten esta funcionalidad.

---

## Características

- **Búsqueda de videos en YouTube**: Realiza búsquedas de videos mediante la API de YouTube.
- **Conversión a MP3**: Genera enlaces de descarga o reproducción en formato MP3.
- **Fácil integración**: Con un diseño simple y modular, es ideal para cualquier aplicación que requiera conversión de audio.

---

## Requisitos

Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas:

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [npm](https://www.npmjs.com/)
- Claves de las siguientes APIs:
  - **[YouTube Data API](https://developers.google.com/youtube/v3/getting-started)**
  - **[YouTube MP3 API](https://rapidapi.com/ytjar/api/youtube-mp36)**

---

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto:

1. Clona este repositorio:
    ```bash
    git clone https://github.com/GabrielValero/youtube-converter-api.git
    ```

2. Dirígete a la carpeta del proyecto:
    ```bash
    cd youtube-converter-api
    ```

3. Instala las dependencias:
    ```bash
    npm install
    ```

4. Configura las variables de entorno:

    - Renombra el archivo `.env.template` a `.env`.
    - Completa las claves necesarias en el archivo `.env`:

      ```env
      YT_API_URL = "https://www.googleapis.com/youtube/v3"
      YT_API_KEY = TU_CLAVE_DE_YOUTUBE
      RA_KEY = TU_CLAVE_DE_RAPIDAPI
      RA_HOST = "youtube-mp36.p.rapidapi.com"
      ```

5. Ejecuta el proyecto con uno de los siguientes comandos:

    ```bash
    # Desarrollo
    npm run start

    # Desarrollo con hot reload
    npm run start:dev

    # Producción
    npm run start:prod
    ```

---

## Endpoints

### Búsqueda de videos

- **Descripción**: Busca videos en YouTube basados en una consulta.
- **Ruta**: `/search`
- **Método**: `GET`
- **Parámetros de consulta**:
  - `key`: El término de búsqueda (por ejemplo, `coldplay viva la vida`).
- **Respuesta**: Lista de videos coincidentes con la búsqueda.
```typescript
export interface TrackData {
  title: string;
  artwork: thumbnailType;
  videoId: string;
  artist: string;
  description: string;
  publishedAt: Date;
  channelId: string;
  duration?: string;
}

type thumbnailType = {
  [key: string]: {
    url: string;
    width: number;
    height: number;
  };
}

```

### Conversión a MP3

- **Descripción**: Obtiene un enlace para reproducir o descargar el audio de un video en formato MP3.
- **Ruta**: `/track`
- **Método**: `GET`
- **Parámetros de consulta**:
  - `id`: El ID del video de YouTube que deseas convertir.
- **Respuesta**: Enlace (un string) para reproducir o descargar el audio en formato MP3.

---