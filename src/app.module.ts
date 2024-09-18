import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackModule } from './track/track.module';
import { ConfigModule } from '@nestjs/config';
import { YoutubeVideosModule } from './youtube-videos/youtube-videos.module';

@Module({
  imports: [ConfigModule.forRoot(),TrackModule, YoutubeVideosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
