import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FetchDownloadTrackDto } from './dto/fetch-download-url.dto';

@Injectable()
export class TrackService {
  async fetchDownloadUrl(id: string): Promise<FetchDownloadTrackDto> {
    const link = `https://youtube-mp36.p.rapidapi.com/dl?id=${id}`;

    let fetchResponse = await fetch(link, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.RA_KEY,
        'X-RapidAPI-Host': process.env.RA_HOST,
      },
    });

    if (!fetchResponse.ok) {
      const errorData = await fetchResponse.json();
      // Puedes usar HttpException para lanzar errores HTTP con códigos de estado
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Error en la solicitud: ${errorData.msg || fetchResponse.status}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const resp = await fetchResponse.json();

    if (resp.status === 'fail') {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Error en la API: ${resp.msg}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return {
      link: resp?.link || null,
      status: 'success',
    };
  }
}
