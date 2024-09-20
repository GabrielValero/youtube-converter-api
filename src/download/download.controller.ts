import { Controller, Get, Query } from '@nestjs/common';
import { DownloadService } from './download.service';

@Controller('download')
export class DownloadController {
    downloadService: DownloadService;

    constructor(downloadService: DownloadService){
        this.downloadService = downloadService
    }

    @Get()
    async getDownloadTrack(@Query('id') id: string) {
        const trackUrl = await this.downloadService.fetchDownloadUrl(id);
        return trackUrl;
    }
}
