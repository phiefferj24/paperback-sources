import {
    Chapter,
    ChapterDetails,
    ContentRating,
    HomeSection,
    LanguageCode,
    Manga,
    MangaStatus,
    MangaTile,
    PagedResults,
    SearchRequest,
    Source,
    SourceInfo,
    Tag
} from 'paperback-extensions-common'

const WEBSITE_URL = "https://dynasty-scans.com"
const AMT_IN_HOMEPAGE = 10
const AMT_PER_VIEW_MORE_CALL = 10

export class DynastyScans extends Source {
    baseURL = WEBSITE_URL
    GITHUB_REPOSITORY = "https://github.com/phiefferj24/paperback-sources"
    requestManager = createRequestManager({
        requestsPerSecond: 10,
        requestTimeout: 5000
    })
    async getMangaDetails(mangaId: string): Promise<Manga> {
        let request = createRequestObject({
            url: `${WEBSITE_URL}/${mangaId}.json`,
            method: 'GET'
        })
        let data = (await this.requestManager.schedule(request, 3)).data
        const json = JSON.parse(data)
        var status: MangaStatus = MangaStatus.UNKNOWN
        const tags = json.tags
        const chapters = json.taggings
        const tagList: Tag[] = []
        const $ = this.cheerio.load(`<div>${json.description}</div>`)
        const description = $('div').text()
        var author: string | undefined = undefined
        for(let index in tags) {
            let tag = tags[index]
            if(tag.type === "General") tagList.push(createTag({
                id: tag.permalink,
                label: tag.name
            }))
            else if(tag.type === "Status") {
                if(tag.name === "Ongoing") {
                    status = MangaStatus.ONGOING
                }
            }
            else if(tag.type === "Author") {
                author = tag.name
            }
        }
        var lastUpdated: Date | undefined = undefined
        for(let index in chapters) {
            let chapter = chapters[index]
            if(chapter.hasOwnProperty('released_on')) {
                lastUpdated = new Date(chapter.released_on)
            }
        }
        return createManga({
            id: mangaId,
            titles: [json.name],
            image: `${WEBSITE_URL}${json.cover}`,
            status: status,
            desc: description,
            tags: [createTagSection({
                id: 'genres',
                label: 'Genres',
                tags: tagList
            })],
            lastUpdate: lastUpdated,
            author: author,
        })
    }
    async getChapters(mangaId: string): Promise<Chapter[]> {
        let request = createRequestObject({
            url: `${WEBSITE_URL}/${mangaId}.json`,
            method: 'GET'
        })
        let data = (await this.requestManager.schedule(request, 3)).data
        const json = JSON.parse(data)
        var chapterList: Chapter[] = []
        const chapters = json.taggings
        var chapterIterator = 1
        for(let index in chapters) {
            let chapter = chapters[index]
            if(chapter.hasOwnProperty('title')) {
                let lastUpdated = new Date(chapter.released_on)
                var group: string | undefined = undefined
                for(let index2 in chapter.tags) {
                    let tag = chapter.tags[index2]
                    if(tag.type === "Scanlator") {
                        group = tag.name
                    }
                }
                let title = chapter.title
                let permalink = String(chapter.permalink)
                let chapterNumber = Number(permalink.substring(permalink.lastIndexOf("ch")+2).replace("_", "."))
                chapterList.push(createChapter({
                    id: permalink,
                    mangaId: mangaId,
                    chapNum: Number.isNaN(chapterNumber) ? chapterIterator : chapterNumber,
                    langCode: LanguageCode.ENGLISH,
                    name: title,
                    time: lastUpdated,
                    group: group
                }))
            }
            chapterIterator++
        }
        return chapterList
    }
    async getChapterDetails(mangaId: string, chapterId: string): Promise<ChapterDetails> {
        let request = createRequestObject({
            url: `${WEBSITE_URL}/chapters/${chapterId}.json`,
            method: 'GET'
        })
        let data = (await this.requestManager.schedule(request, 3)).data
        const json = JSON.parse(data)
        let pages: string[] = []
        var longStrip: boolean = false
        const tags = json.tags
        for(let index in tags) {
            let tag = tags[index]
            if(tag.permalink === "long_strip") {
                longStrip = true
            }
        }
        const jsonpages = json.pages
        for(let index in jsonpages) {
            pages.push(`${WEBSITE_URL}${jsonpages[index].url}`)
        }
        return createChapterDetails({
            id: chapterId,
            mangaId: mangaId,
            pages: pages,
            longStrip: longStrip
        })
    }
    async getSearchResults(query: SearchRequest, metadata: any): Promise<PagedResults> {
        let page: number = metadata?.page ?? 1
        let search = encodeURIComponent(query.title ?? "")
        let request = createRequestObject({
            url: `https://dynasty-scans.com/search?q=${search}&classes%5B%5D=Anthology&classes%5B%5D=Doujin&classes%5B%5D=Issue&classes%5B%5D=Series&classes%5B%5D=Author&classes%5B%5D=Scanlator&classes%5B%5D=General&sort=&page=${page}`,
            method: 'GET'
        })
        let data = await this.requestManager.schedule(request, 3)
        let $ = this.cheerio.load(data.data)
        let mangaTiles: MangaTile[] = []
        let mangas = $("dl.chapter-list dd").toArray()
        for(let index in mangas) {
            let chapter = mangas[index]
            const permalink = $("a.name", chapter).attr("href").toString().substring(1)
            const type = permalink.substring(0, permalink.indexOf("/"))
            if(type !== "series" && type !== "doujins") {
                continue
            }
            const title = `${$("a.name", chapter).text()} (${type === "series" ? "Series" : "Doujin"})`
            const request = createRequestObject({
                url: `${WEBSITE_URL}/${permalink}.json`,
                method: 'GET'
            })
            const data = await this.requestManager.schedule(request, 3)
            const json = JSON.parse(data.data)
            mangaTiles.push(createMangaTile({
                id: permalink,
                title: createIconText({
                    text: title
                }),
                image: `${WEBSITE_URL}${json.cover}`
            }))
        }
        const navItems = $("div.pagination ul li").toArray()
        var lastPageNum = 1
        for(let index in navItems) {
            let navItem = navItems[index]
            let possibleNumber = Number($("a", navItem).text())
            if(!Number.isNaN(possibleNumber)) {
                lastPageNum = possibleNumber
            }
        }
        let newMetadata: object | undefined
        if(lastPageNum === page) {
            newMetadata = undefined
        }
        else {
            newMetadata = {page: (page + 1)}
        }
        return createPagedResults({
            results: mangaTiles,
            metadata: newMetadata
        })
    }
    override async getHomePageSections(sectionCallback: (section: HomeSection) => void): Promise<void> {
        let request = createRequestObject({
            url: `${WEBSITE_URL}/chapters/added.json`,
            method: 'GET',
        })
        let data = (await this.requestManager.schedule(request, 3)).data
        let section = createHomeSection({
            id: 'recently_updated',
            title: 'Recently Updated Mangas',
            view_more: true,
        })
        sectionCallback(section)
        let tiles: MangaTile[] = []
        let addedManga: string[] = []
        let json = JSON.parse(data)
        var offset = 0
        for(var i = 0; i < AMT_IN_HOMEPAGE + offset; i++) {
            let chapter = json.chapters[i]
            if(chapter === null) {
                break
            }
            let id: string | undefined = undefined
            let name: string | undefined = undefined
            for(let tag of chapter.tags) {
                if(tag.type === "Series") {
                    id = tag.permalink
                    name = tag.name
                }
            }
            if(id === undefined || name === undefined || addedManga.includes(id)) {
                offset++
                continue
            }
            let request2 = createRequestObject({
                url: `${WEBSITE_URL}/series/${id}.json`,
                method: 'GET',
            })
            let data2 = (await this.requestManager.schedule(request2, 1)).data
            let json2 = JSON.parse(data2)
            tiles.push(createMangaTile({
                id: `series/${id}`,
                title: createIconText({text: name}),
                image: `${WEBSITE_URL}${json2.cover}`
            }))
            addedManga.push(id)
        }
        section.items = tiles
        sectionCallback(section)
    }
    override getMangaShareUrl(mangaId: string): string {
        return `${WEBSITE_URL}/${mangaId}`
    }
    override async getViewMoreItems(homepageSectionId: string, metadata: any): Promise<PagedResults> {
        let page: number = metadata?.page ?? 1
        let request = createRequestObject({
            url: `${WEBSITE_URL}/chapters/added.json?page=${page}`,
            method: 'GET',
        })
        let data = (await this.requestManager.schedule(request, 3)).data
        let json = JSON.parse(data)
        var newPageNeeded = false
        var lastPageNum = Number.isNaN(Number(json.total_pages)) ? 1 : Number(json.total_pages)
        var offset = 0
        let at = metadata?.at ?? 0
        let tiles: MangaTile[] = []
        let addedManga: string[] = []
        for(var i = at; i < AMT_PER_VIEW_MORE_CALL + offset + at; i++) {
            if(i >= json.chapters.length) {
                newPageNeeded = true
                break
            }
            let chapter = json.chapters[i]
            let id: string | undefined = undefined
            let name: string | undefined = undefined
            if(chapter === undefined || !chapter.hasOwnProperty('tags')) {
                offset++
                continue
            }
            for(let tag of chapter.tags) {
                if(tag.type === "Series") {
                    id = tag.permalink
                    name = tag.name
                }
            }
            if(id === undefined || name === undefined || addedManga.includes(id)) {
                offset++
                continue
            }
            let request2 = createRequestObject({
                url: `${WEBSITE_URL}/series/${id}.json`,
                method: 'GET',
            })
            let data2 = (await this.requestManager.schedule(request2, 1)).data
            let json2 = JSON.parse(data2)
            tiles.push(createMangaTile({
                id: `series/${id}`,
                title: createIconText({text: name}),
                image: `${WEBSITE_URL}${json2.cover}`
            }))
            addedManga.push(id)
        }
        let newMetadata: object | undefined
        if(lastPageNum === page && newPageNeeded) {
            newMetadata = undefined
        }
        else {
            if(newPageNeeded) newMetadata = {page: (page + 1), at: 0}
            else newMetadata = {page: page, at: at + offset + AMT_PER_VIEW_MORE_CALL}
        }
        return createPagedResults({
            results: tiles,
            metadata: newMetadata
        })
    }
}

export const DynastyScansInfo: SourceInfo = {
    version: '1.0.0',
    name: 'Dynasty Scans',
    icon: 'icon.jpg',
    author: 'JimIsWayTooEpic',
    authorWebsite: 'https://jimphieffer.com/paperback/',
    description: 'Source for Dynasty Scans. Created by JimIsWayTooEpic.',
    contentRating: ContentRating.ADULT,
    websiteBaseURL: WEBSITE_URL,
    language: "English"
}