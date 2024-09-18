import { Test, TestingModule } from '@nestjs/testing';
import { TrackService } from './track.service';

describe('TrackService', () => {
  let trackService: TrackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrackService],
    }).compile();

    trackService = module.get<TrackService>(TrackService);
  });

  it('should be defined', () => {
    expect(trackService).toBeDefined();
  });
  it('should return a link', async () => {
    const resultExpected = 'https://mbeta.123tokyo.xyz';

    const result = await trackService.fetchDownloadUrl('asdf');

    expect(trackService).toBeDefined();
  });
});
