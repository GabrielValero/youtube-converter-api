import { FetchDownloadTrackDto } from './dto/fetch-download-url.dto';
import { TrackData } from 'src/types';
export declare class TrackService {
    fetchDownloadUrl(id: string): Promise<FetchDownloadTrackDto>;
    fetchTrackList(key: string, limit?: number): Promise<TrackData[]>;
    fetchTrackById(id: string): void;
    fetchLyricTrack(id: string): void;
    getContentDuration(id: any): Promise<string>;
}
