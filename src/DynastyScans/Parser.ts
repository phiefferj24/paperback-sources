import {
    Manga,
    Chapter,
    ChapterDetails,
    MangaStatus,
    Tag,
    LanguageCode,
    RequestManager,
    MangaTile
} from 'paperback-extensions-common'

const WEBSITE_URL = "https://dynasty-scans.com"

export class Parser {
    getMangaDetails(jsonRecieved: any, mangaId: string): Manga {
        const json = JSON.parse(jsonRecieved)
        var status: MangaStatus = MangaStatus.UNKNOWN
        const tags = json.tags
        const chapters = json.taggings
        const tagList: Tag[] = []
        tags.foreach((tag: any) => {
            if(tag.type === "General") tagList.push(createTag({
                id: tag.permalink,
                label: tag.name
            }))
            else if(tag.type === "Status") {
                if(tag.name === "Ongoing") {
                    status = MangaStatus.ONGOING
                }
            }
        })
        var lastUpdated: Date | undefined = undefined
        chapters.foreach((chapter: any) => {
            if(chapter.hasOwnProperty('released_on')) {
                lastUpdated = new Date(chapter.released_on)
            }
        })
        return createManga({
            id: mangaId,
            titles: [json.title],
            image: `${WEBSITE_URL}${json.cover}`,
            status: status,
            desc: json.description,
            tags: [createTagSection({
                id: 'genres',
                label: 'Genres',
                tags: tagList
            })],
            lastUpdate: lastUpdated
        })
    }
    getChapters(jsonRecieved: any, mangaId: string): Chapter[] {
        const json = JSON.parse(jsonRecieved)
        var chapterList: Chapter[] = []
        json.taggings.foreach((chapter: any) => {
            if(chapter.hasOwnProperty('title')) {
                let title = chapter.title
                let permalink = String(chapter.permalink)
                let chapterNumber = Number(permalink.substring(permalink.lastIndexOf("ch"))+2)
                chapterList.push(createChapter({
                    id: permalink,
                    mangaId: mangaId,
                    chapNum: Number.isNaN(chapterNumber) ? 0 : chapterNumber,
                    langCode: LanguageCode.ENGLISH,
                    name: title
                }))
            }
        })
        return chapterList
    }
    getChapterDetails(jsonRecieved: any, mangaId: string, chapterId: string): ChapterDetails {
        const json = JSON.parse(jsonRecieved)
        let pages: string[] = []
        let longStrip: boolean = false
        json.tags.foreach((tag: any) => {
            if(tag.permalink === "long_strip") {
                longStrip = true
            }
        })
        json.pages.foreach((page: any) => {
            pages.push(`${WEBSITE_URL}${page.url}`)
        })
        return createChapterDetails({
                id: chapterId,
                mangaId: mangaId,
                pages: pages,
                longStrip: longStrip
            })
    }
    async getSearchResults($: any, requestManager: RequestManager, _metadata: any): Promise<MangaTile[]> {
        let mangaTiles: MangaTile[] = []
        let chapters = $("dl.chapter-list dd")
        await chapters.foreach(async (chapter: any) => {
            const permalink: String = $("a.name", chapter).attr("href")
            const request = createRequestObject({
                url: `${WEBSITE_URL}${permalink}.json`,
                method: 'GET'
            })
            const data = await requestManager.schedule(request, 1)
            const json = JSON.parse(data.data)
            mangaTiles.push(createMangaTile({
                id: permalink.substring(permalink.lastIndexOf("/")+1),
                title: createIconText({
                    text: $("a.name", chapter).text()
                }),
                image: `${WEBSITE_URL}${json.cover}`
            }))
        })
        return mangaTiles
    }
}