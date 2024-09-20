export interface GetDownloadTrackDto {
    link?: string;
    title?: string;
    filesize?: number;
    progress?: number;
    duration?: number;
    status: string;
    msg: string;
    code?: number;
    error?: string;
}
