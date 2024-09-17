import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { GetDownloadTrackDto } from './dto/get-download-url.dto';

@Controller('track')
export class TrackController {
  @Get('/')
  async init(){
    return "Hello World"
  }
  @Get('/:id')
  async getDownloadTrack(@Param('id') id: string) {
    try {
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
    } catch (error) {
      // Si el error es una instancia de HttpException, usa su código de estado
      const statusCode =
        error instanceof HttpException
          ? error.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(
        {
          status: statusCode,
          error: error.message,
        },
        statusCode,
      );
    }
  }
}
