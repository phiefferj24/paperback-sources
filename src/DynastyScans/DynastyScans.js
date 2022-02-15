"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynastyScansInfo = exports.DynastyScans = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const WEBSITE_URL = "https://dynasty-scans.com";
const REQUEST_RETRIES = 1;
const POST_REQUEST_RETRIES = 3;
class DynastyScans extends paperback_extensions_common_1.Source {
    constructor() {
        super(...arguments);
        this.baseURL = WEBSITE_URL;
        this.GITHUB_REPOSITORY = "https://github.com/phiefferj24/paperback-sources";
        this.requestManager = createRequestManager({
            requestsPerSecond: 5,
            requestTimeout: 20000
        });
        this.postRequestManager = createRequestManager({
            requestsPerSecond: 1,
            requestTimeout: 15000
        });
    }
    getMangaDetails(mangaId) {
        return __awaiter(this, void 0, void 0, function* () {
            let request = createRequestObject({
                url: `${WEBSITE_URL}/${mangaId}.json`,
                method: 'GET'
            });
            let data = (yield this.requestManager.schedule(request, REQUEST_RETRIES)).data;
            const json = JSON.parse(data);
            let status = paperback_extensions_common_1.MangaStatus.UNKNOWN;
            const tags = json.tags;
            const chapters = json.taggings;
            const tagList = [];
            const $ = this.cheerio.load(`<div>${json.description}</div>`);
            const description = $('div').text();
            let author = undefined;
            for (let tag of tags) {
                if (tag.type === "General")
                    tagList.push(createTag({
                        id: tag.permalink,
                        label: tag.name
                    }));
                else if (tag.type === "Status") {
                    if (tag.name === "Ongoing") {
                        status = paperback_extensions_common_1.MangaStatus.ONGOING;
                    }
                }
                else if (tag.type === "Author") {
                    author = tag.name;
                }
            }
            let lastUpdated = undefined;
            for (let chapter of chapters) {
                if (chapter.hasOwnProperty('released_on')) {
                    lastUpdated = new Date(chapter.released_on);
                }
            }
            return createManga({
                id: mangaId,
                titles: [json.name],
                image: `${WEBSITE_URL}${json.cover}`,
                status: status,
                desc: description === "null" ? undefined : description,
                tags: [createTagSection({
                        id: 'genres',
                        label: 'Genres',
                        tags: tagList
                    })],
                lastUpdate: lastUpdated,
                author: author,
            });
        });
    }
    getChapters(mangaId) {
        return __awaiter(this, void 0, void 0, function* () {
            let request = createRequestObject({
                url: `${WEBSITE_URL}/${mangaId}.json`,
                method: 'GET'
            });
            let data = (yield this.requestManager.schedule(request, REQUEST_RETRIES)).data;
            const json = JSON.parse(data);
            let chapterList = [];
            const chapters = json.taggings;
            let chapterIterator = 1;
            for (let chapter of chapters) {
                if (chapter.hasOwnProperty('title')) {
                    let lastUpdated = new Date(chapter.released_on);
                    let group = undefined;
                    for (let tag of chapter.tags) {
                        if (tag.type === "Scanlator") {
                            group = tag.name;
                        }
                    }
                    let title = chapter.title;
                    let permalink = String(chapter.permalink);
                    let chapterNumber = Number(permalink.substring(permalink.lastIndexOf("ch") + 2).replace("_", "."));
                    chapterList.push(createChapter({
                        id: permalink,
                        mangaId: mangaId,
                        chapNum: Number.isNaN(chapterNumber) ? chapterIterator : chapterNumber,
                        langCode: paperback_extensions_common_1.LanguageCode.ENGLISH,
                        name: title,
                        time: lastUpdated,
                        group: group
                    }));
                }
                chapterIterator++;
            }
            return chapterList;
        });
    }
    getChapterDetails(mangaId, chapterId) {
        return __awaiter(this, void 0, void 0, function* () {
            let request = createRequestObject({
                url: `${WEBSITE_URL}/chapters/${chapterId}.json`,
                method: 'GET'
            });
            let data = (yield this.requestManager.schedule(request, REQUEST_RETRIES)).data;
            const json = JSON.parse(data);
            let pages = [];
            let longStrip = false;
            const tags = json.tags;
            for (let tag of tags) {
                if (tag.permalink === "long_strip") {
                    longStrip = true;
                }
            }
            const jsonpages = json.pages;
            for (let jsonpage of jsonpages) {
                pages.push(`${WEBSITE_URL}${jsonpage.url}`);
            }
            return createChapterDetails({
                id: chapterId,
                mangaId: mangaId,
                pages: pages,
                longStrip: longStrip
            });
        });
    }
    supportsTagExclusion() {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    getSearchResults(query, metadata) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function* () {
            let page = (_a = metadata === null || metadata === void 0 ? void 0 : metadata.page) !== null && _a !== void 0 ? _a : 1;
            let search = encodeURIComponent((_b = query.title) !== null && _b !== void 0 ? _b : " ");
            let tagId = (_c = metadata === null || metadata === void 0 ? void 0 : metadata.tagId) !== null && _c !== void 0 ? _c : undefined;
            const includedTags = query.includedTags;
            if (includedTags !== undefined && tagId === undefined && includedTags[0] !== undefined) {
                const request2 = createRequestObject({
                    url: `${WEBSITE_URL}/tags/suggest?query=${encodeURIComponent(includedTags[0].label)}`,
                    method: 'POST'
                });
                let data2 = (_e = (_d = (yield this.postRequestManager.schedule(request2, POST_REQUEST_RETRIES))) === null || _d === void 0 ? void 0 : _d.data) !== null && _e !== void 0 ? _e : undefined;
                if (data2 !== undefined) {
                    let json2 = JSON.parse(data2);
                    for (let tag of json2) {
                        if (tag.type === "General") {
                            tagId = tag.id;
                            break;
                        }
                    }
                }
            }
            let request = createRequestObject({
                url: `${WEBSITE_URL}/search?q=${search}&classes%5B%5D=Doujin&classes%5B%5D=Series&with%5B%5D=${tagId === undefined ? "" : `&with%5B%5D=${tagId}`}&page=${page}&sort=`,
                method: 'GET'
            });
            let data = yield this.requestManager.schedule(request, 3);
            let $ = this.cheerio.load(data.data);
            let mangaTiles = [];
            let mangas = $("dl.chapter-list dd").toArray();
            let chapterJSONPromises = [];
            for (let chapter of mangas) {
                const permalink = (_g = (_f = $("a.name", chapter).attr("href")) === null || _f === void 0 ? void 0 : _f.toString().substring(1)) !== null && _g !== void 0 ? _g : "";
                const type = permalink.substring(0, permalink.indexOf("/"));
                if (type !== "series" && type !== "doujins") {
                    continue;
                }
                const request = createRequestObject({
                    url: `${WEBSITE_URL}/${permalink}.json`,
                    method: 'GET'
                });
                chapterJSONPromises.push(this.requestManager.schedule(request, REQUEST_RETRIES));
            }
            const chapterJSONs = yield Promise.all(chapterJSONPromises);
            for (let chapterJSON of chapterJSONs) {
                const json = JSON.parse(chapterJSON.data);
                const permalink = chapterJSON.request.url.substring(WEBSITE_URL.length + 1, chapterJSON.request.url.length - 5);
                let latestChapter = (json.taggings[json.taggings.length - 1] && json.taggings[json.taggings.length - 1].hasOwnProperty('title')) ? json.taggings[json.taggings.length - 1].title : "";
                mangaTiles.push(createMangaTile({
                    id: permalink,
                    title: createIconText({
                        text: json.name
                    }),
                    image: `${WEBSITE_URL}${json.cover}`,
                    subtitleText: createIconText({
                        text: latestChapter
                    })
                }));
            }
            const navItems = $("div.pagination ul li").toArray();
            let lastPageNum = 1;
            for (let navItem of navItems) {
                let possibleNumber = Number($("a", navItem).text());
                if (!Number.isNaN(possibleNumber)) {
                    lastPageNum = possibleNumber;
                }
            }
            let newMetadata;
            if (lastPageNum === page) {
                newMetadata = undefined;
            }
            else {
                newMetadata = { page: (page + 1), tagId: tagId };
            }
            return createPagedResults({
                results: mangaTiles,
                metadata: newMetadata
            });
        });
    }
    getHomePageSections(sectionCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            let request = createRequestObject({
                url: `${WEBSITE_URL}/chapters/added.json`,
                method: 'GET',
            });
            let section = createHomeSection({
                id: 'recently_updated',
                title: 'Recently Updated Mangas',
                view_more: true,
            });
            return this.requestManager.schedule(request, REQUEST_RETRIES).then((data) => __awaiter(this, void 0, void 0, function* () {
                sectionCallback(section);
                const json = JSON.parse(data.data);
                const chapters = [];
                const addedSeries = [];
                for (let chapter of json.chapters) {
                    if (chapter.series !== null && chapter.hasOwnProperty('tags') && !addedSeries.includes(chapter.series)) {
                        chapters.push(chapter);
                        addedSeries.push(chapter.series);
                    }
                }
                const seriesJSONPromises = [];
                for (let chapter of chapters) {
                    let id = undefined;
                    for (let tag of chapter.tags) {
                        if (tag.type === "Series") {
                            id = tag.permalink;
                        }
                    }
                    if (id !== undefined) {
                        let request2 = createRequestObject({
                            url: `${WEBSITE_URL}/series/${id}.json`,
                            method: 'GET',
                        });
                        seriesJSONPromises.push(this.requestManager.schedule(request2, REQUEST_RETRIES));
                    }
                }
                const seriesJSONs = yield Promise.all(seriesJSONPromises);
                const tiles = [];
                for (let seriesJSON of seriesJSONs) {
                    const json2 = JSON.parse(seriesJSON.data);
                    let latestChapter = (json2.taggings[json2.taggings.length - 1] && json2.taggings[json2.taggings.length - 1].hasOwnProperty('title')) ? json2.taggings[json2.taggings.length - 1].title : "";
                    tiles.push(createMangaTile({
                        id: `series/${json2.permalink}`,
                        title: createIconText({ text: json2.name }),
                        image: json2.cover === undefined || json2.cover === null ? "" : `${WEBSITE_URL}${json2.cover}`,
                        subtitleText: createIconText({ text: latestChapter })
                    }));
                }
                section.items = tiles;
                sectionCallback(section);
            }));
        });
    }
    getViewMoreItems(_homepageSectionId, metadata) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let page = (_a = metadata === null || metadata === void 0 ? void 0 : metadata.page) !== null && _a !== void 0 ? _a : 1;
            let request = createRequestObject({
                url: `${WEBSITE_URL}/chapters/added.json?page=${page}`,
                method: 'GET',
            });
            return this.requestManager.schedule(request, REQUEST_RETRIES).then((data) => __awaiter(this, void 0, void 0, function* () {
                var _b;
                const json = JSON.parse(data.data);
                var lastPageNum = Number.isNaN(Number(json.total_pages)) ? 1 : Number(json.total_pages);
                const chapters = [];
                const addedSeries = (_b = metadata === null || metadata === void 0 ? void 0 : metadata.addedSeries) !== null && _b !== void 0 ? _b : [];
                for (let chapter of json.chapters) {
                    if (chapter.series !== null && chapter.hasOwnProperty('tags') && !addedSeries.includes(chapter.series)) {
                        chapters.push(chapter);
                        addedSeries.push(chapter.series);
                    }
                }
                const seriesJSONPromises = [];
                for (let chapter of chapters) {
                    let id = undefined;
                    for (let tag of chapter.tags) {
                        if (tag.type === "Series") {
                            id = tag.permalink;
                        }
                    }
                    if (id !== undefined) {
                        let request2 = createRequestObject({
                            url: `${WEBSITE_URL}/series/${id}.json`,
                            method: 'GET',
                        });
                        seriesJSONPromises.push(this.requestManager.schedule(request2, REQUEST_RETRIES));
                    }
                }
                const seriesJSONs = yield Promise.all(seriesJSONPromises);
                const tiles = [];
                for (let seriesJSON of seriesJSONs) {
                    const json2 = JSON.parse(seriesJSON.data);
                    let latestChapter = (json2.taggings[json2.taggings.length - 1] && json2.taggings[json2.taggings.length - 1].hasOwnProperty('title')) ? json2.taggings[json2.taggings.length - 1].title : "";
                    tiles.push(createMangaTile({
                        id: `series/${json2.permalink}`,
                        title: createIconText({ text: json2.name }),
                        image: json2.cover === undefined || json2.cover === null ? "" : `${WEBSITE_URL}${json2.cover}`,
                        subtitleText: createIconText({ text: latestChapter })
                    }));
                }
                let newMetadata = lastPageNum === page ? undefined : { page: (page + 1), addedSeries: addedSeries };
                return createPagedResults({
                    results: tiles,
                    metadata: newMetadata
                });
            }));
        });
    }
    getMangaShareUrl(mangaId) {
        return `${WEBSITE_URL}/${mangaId}`;
    }
    getSearchTags() {
        return __awaiter(this, void 0, void 0, function* () {
            let json;
            let page = 1;
            let tagGroups = [];
            do {
                let request = createRequestObject({
                    url: `${WEBSITE_URL}/tags.json?page=${page}`,
                    method: 'GET'
                });
                let data = (yield this.requestManager.schedule(request, REQUEST_RETRIES)).data;
                json = JSON.parse(data);
                for (let tagGroup of json.tags) {
                    for (let key of Object.keys(tagGroup)) {
                        let tags = [];
                        for (let tag of tagGroup[key]) {
                            tags.push(createTag({
                                id: tag.permalink,
                                label: tag.name
                            }));
                        }
                        tagGroups.push({ key: key, tags: tags });
                    }
                }
                page++;
            } while (page <= json.total_pages);
            let tagSections = [];
            for (let tagGroup of tagGroups) {
                tagSections.push(createTagSection({
                    id: tagGroup.key.toLowerCase(),
                    label: tagGroup.key,
                    tags: tagGroup.tags
                }));
            }
            return tagSections;
        });
    }
}
exports.DynastyScans = DynastyScans;
exports.DynastyScansInfo = {
    version: '1.1.1',
    name: 'Dynasty Scans',
    icon: 'icon.jpg',
    author: 'JimIsWayTooEpic',
    authorWebsite: 'https://phiefferj24.github.io/paperback-sources/master/',
    description: 'Source for Dynasty Scans. Created by JimIsWayTooEpic.',
    contentRating: paperback_extensions_common_1.ContentRating.ADULT,
    websiteBaseURL: WEBSITE_URL,
    language: "English"
};
