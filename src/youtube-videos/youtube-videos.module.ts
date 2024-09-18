import { Module } from '@nestjs/common';
import { YoutubeVideosController } from './youtube-videos.controller';
import { YoutubeVideosService } from './youtube-videos.service';

@Module({
  controllers: [YoutubeVideosController],
  providers: [YoutubeVideosService]
})
export class YoutubeVideosModule {}
