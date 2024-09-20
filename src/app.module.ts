import { Get, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackModule } from './track/track.module';
import { ConfigModule } from '@nestjs/config';
import { DownloadModule } from './download/download.module';

@Module({
  imports: [ConfigModule.forRoot(),TrackModule, DownloadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  @Get()
  init(){
    return "Hello World"
  }

}
