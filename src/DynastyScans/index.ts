import {
    Chapter,
    ChapterDetails,
    ContentRating,
    HomeSection,
    Manga,
    MangaUpdates,
    PagedResults,
    SearchRequest,
    Source,
    SourceInfo,
    TagSection,
    TagType,
    Request,
    HomeSectionType,
    RequestManager
} from 'paperback-extensions-common'

import {Parser} from './Parser'

const WEBSITE_URL = "https://dynasty-scans.com"

export class DynastyScans extends Source {
    parser = new Parser()
    requestManager = createRequestManager({
        requestsPerSecond: 10,
        requestTimeout: 10000
    })
    async getMangaDetails(mangaId: string): Promise<Manga> {
        let request = createRequestObject({
            url: `${WEBSITE_URL}/series/${mangaId}.json`,
            method: 'GET'
        })
        let data = await this.requestManager.schedule(request, 1)
        return this.parser.getMangaDetails(data.data, mangaId)
    }
    async getChapters(mangaId: string): Promise<Chapter[]> {
        let request = createRequestObject({
            url: `${WEBSITE_URL}/series/${mangaId}.json`,
            method: 'GET'
        })
        let data = await this.requestManager.schedule(request, 1)
        return this.parser.getChapters(data.data, mangaId)
    }
    async getChapterDetails(mangaId: string, chapterId: string): Promise<ChapterDetails> {
        let request = createRequestObject({
            url: `${WEBSITE_URL}/chapters/${chapterId}.json`,
            method: 'GET'
        })
        let data = await this.requestManager.schedule(request, 1)
        return this.parser.getChapterDetails(data.data, mangaId, chapterId)
    }
    async getSearchResults(query: SearchRequest, metadata: any): Promise<PagedResults> {
        let request = createRequestObject({
            url: `https://dynasty-scans.com/search?q=${query.title}&classes%5B%5D=Series&classes%5B%5D=Author&classes%5B%5D=Scanlator&classes%5B%5D=General`,
            method: 'GET'
        })
        let data = await this.requestManager.schedule(request, 1)
        let $ = this.cheerio.load(data.data)
        return createPagedResults({
            results: await this.parser.getSearchResults($, this.requestManager)
        })
    }
}

export const DynastyScansInfo: SourceInfo = {
    version: '1.0.0',
    name: 'Dynasty Scans',
    icon: 'icon.jpg',
    author: 'JimIsWayTooEpic',
    authorWebsite: 'https://jimphieffer.com',
    description: 'Source for Dynasty Scans, a (generally) yuri/yaoi source. Created by JimIsWayTooEpic.',
    contentRating: ContentRating.MATURE,
    websiteBaseURL: 'https://dynasty-scans.com'
}