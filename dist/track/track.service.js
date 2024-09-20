"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackService = void 0;
const common_1 = require("@nestjs/common");
const replaceSpecialCharacters_1 = require("../utils/replaceSpecialCharacters");
let TrackService = class TrackService {
    async fetchDownloadUrl(id) {
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
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: `Error en la solicitud: ${errorData.msg || fetchResponse.status}`,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const resp = await fetchResponse.json();
        if (resp.status === 'fail') {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: `Error en la API: ${resp.msg}`,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        return {
            link: resp?.link || null,
            status: 'success',
        };
    }
    async fetchTrackList(key, limit = 20) {
        const url = `${process.env.YT_API_URL}/search?&key=${process.env.YT_API_KEY}&q=${key}&maxResults=${limit}&order=relevance&type=video&part=snippet`;
        const fetchResponse = await fetch(url);
        if (!fetchResponse.ok) {
            const errorData = await fetchResponse.json();
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: `Error en la solicitud: ${errorData.msg || fetchResponse.status}`,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const trackList = await fetchResponse.json();
        const result = await Promise.all(trackList.items.map(async (track) => ({
            title: (0, replaceSpecialCharacters_1.default)(track.snippet.title),
            artwork: track.snippet.thumbnails,
            videoId: track.id.videoId,
            artist: await (0, replaceSpecialCharacters_1.default)(track.snippet.channelTitle),
            description: track.snippet.description,
            publishedAt: track.snippet.publishedAt,
            channelId: track.snippet.channelId,
            duration: await this.getContentDuration(track.id.videoId),
        })));
        console.log(result);
        return result;
    }
    fetchTrackById(id) { }
    fetchLyricTrack(id) { }
    async getContentDuration(id) {
        const url = `${process.env.YT_API_URL}/videos?&key=${process.env.YT_API_KEY}&id=${id}&part=contentDetails`;
        const fetchResponse = await fetch(url);
        const videoDetails = await fetchResponse.json();
        const duration = videoDetails.items[0].contentDetails.duration;
        return duration;
    }
};
exports.TrackService = TrackService;
exports.TrackService = TrackService = __decorate([
    (0, common_1.Injectable)()
], TrackService);
//# sourceMappingURL=track.service.js.map