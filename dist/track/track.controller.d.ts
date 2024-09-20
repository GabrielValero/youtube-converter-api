import { TrackService } from './track.service';
export declare class TrackController {
    trackService: TrackService;
    constructor(trackService: TrackService);
    getDownloadTrack(id: string): Promise<import("./dto/fetch-download-url.dto").FetchDownloadTrackDto>;
    searchTracks(key: string, limit: number): Promise<import("../types").TrackData[]>;
}
