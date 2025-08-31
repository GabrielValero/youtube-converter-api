import { Controller, Get, Query } from '@nestjs/common';
import { get } from 'http';
import { YoutubeService } from './youtube.service';

@Controller('youtube')
export class YoutubeController {
  youtubeService: YoutubeService;
  constructor(youtubeService: YoutubeService){
    this.youtubeService = youtubeService
  }

  @Get('/search')
  async getListBySearch(@Query('maxResults') maxResults:number, @Query('query') query:string){

    return this.youtubeService.getListBySearch(query, maxResults)
  }
  @Get('/video_info')
  async getInfoListById(@Query('listId') listId:string){
    return this.youtubeService.getInfoListById(listId)
  }
  @Get('video_related')
  async getVideoRelatedListById(@Query('videoId') videoId:string){
    return this.youtubeService.getVideoRelatedListById(videoId)
  }

}
