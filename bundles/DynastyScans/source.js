(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sources = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
"use strict";
/**
 * Request objects hold information for a particular source (see sources for example)
 * This allows us to to use a generic api to make the calls against any source
 */
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
exports.urlEncodeObject = exports.convertTime = exports.Source = void 0;
class Source {
    constructor(cheerio) {
        this.cheerio = cheerio;
    }
    /**
     * @deprecated use {@link Source.getSearchResults getSearchResults} instead
     */
    searchRequest(query, metadata) {
        return this.getSearchResults(query, metadata);
    }
    /**
     * @deprecated use {@link Source.getSearchTags} instead
     */
    getTags() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            return (_a = this.getSearchTags) === null || _a === void 0 ? void 0 : _a.call(this);
        });
    }
}
exports.Source = Source;
// Many sites use '[x] time ago' - Figured it would be good to handle these cases in general
function convertTime(timeAgo) {
    var _a;
    let time;
    let trimmed = Number(((_a = /\d*/.exec(timeAgo)) !== null && _a !== void 0 ? _a : [])[0]);
    trimmed = (trimmed == 0 && timeAgo.includes('a')) ? 1 : trimmed;
    if (timeAgo.includes('minutes')) {
        time = new Date(Date.now() - trimmed * 60000);
    }
    else if (timeAgo.includes('hours')) {
        time = new Date(Date.now() - trimmed * 3600000);
    }
    else if (timeAgo.includes('days')) {
        time = new Date(Date.now() - trimmed * 86400000);
    }
    else if (timeAgo.includes('year') || timeAgo.includes('years')) {
        time = new Date(Date.now() - trimmed * 31556952000);
    }
    else {
        time = new Date(Date.now());
    }
    return time;
}
exports.convertTime = convertTime;
/**
 * When a function requires a POST body, it always should be defined as a JsonObject
 * and then passed through this function to ensure that it's encoded properly.
 * @param obj
 */
function urlEncodeObject(obj) {
    let ret = {};
    for (const entry of Object.entries(obj)) {
        ret[encodeURIComponent(entry[0])] = encodeURIComponent(entry[1]);
    }
    return ret;
}
exports.urlEncodeObject = urlEncodeObject;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tracker = void 0;
class Tracker {
    constructor(cheerio) {
        this.cheerio = cheerio;
    }
}
exports.Tracker = Tracker;

},{}],4:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Source"), exports);
__exportStar(require("./Tracker"), exports);

},{"./Source":2,"./Tracker":3}],5:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./base"), exports);
__exportStar(require("./models"), exports);
__exportStar(require("./APIWrapper"), exports);

},{"./APIWrapper":1,"./base":4,"./models":47}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],7:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],8:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],9:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],10:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],11:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],12:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],13:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],14:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],15:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],16:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],17:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],18:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],19:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],20:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],21:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],22:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],23:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],24:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Button"), exports);
__exportStar(require("./Form"), exports);
__exportStar(require("./Header"), exports);
__exportStar(require("./InputField"), exports);
__exportStar(require("./Label"), exports);
__exportStar(require("./Link"), exports);
__exportStar(require("./MultilineLabel"), exports);
__exportStar(require("./NavigationButton"), exports);
__exportStar(require("./OAuthButton"), exports);
__exportStar(require("./Section"), exports);
__exportStar(require("./Select"), exports);
__exportStar(require("./Switch"), exports);
__exportStar(require("./WebViewButton"), exports);
__exportStar(require("./FormRow"), exports);
__exportStar(require("./Stepper"), exports);

},{"./Button":9,"./Form":10,"./FormRow":11,"./Header":12,"./InputField":13,"./Label":14,"./Link":15,"./MultilineLabel":16,"./NavigationButton":17,"./OAuthButton":18,"./Section":19,"./Select":20,"./Stepper":21,"./Switch":22,"./WebViewButton":23}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeSectionType = void 0;
var HomeSectionType;
(function (HomeSectionType) {
    HomeSectionType["singleRowNormal"] = "singleRowNormal";
    HomeSectionType["singleRowLarge"] = "singleRowLarge";
    HomeSectionType["doubleRow"] = "doubleRow";
    HomeSectionType["featured"] = "featured";
})(HomeSectionType = exports.HomeSectionType || (exports.HomeSectionType = {}));

},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageCode = void 0;
var LanguageCode;
(function (LanguageCode) {
    LanguageCode["UNKNOWN"] = "_unknown";
    LanguageCode["BENGALI"] = "bd";
    LanguageCode["BULGARIAN"] = "bg";
    LanguageCode["BRAZILIAN"] = "br";
    LanguageCode["CHINEESE"] = "cn";
    LanguageCode["CZECH"] = "cz";
    LanguageCode["GERMAN"] = "de";
    LanguageCode["DANISH"] = "dk";
    LanguageCode["ENGLISH"] = "gb";
    LanguageCode["SPANISH"] = "es";
    LanguageCode["FINNISH"] = "fi";
    LanguageCode["FRENCH"] = "fr";
    LanguageCode["WELSH"] = "gb";
    LanguageCode["GREEK"] = "gr";
    LanguageCode["CHINEESE_HONGKONG"] = "hk";
    LanguageCode["HUNGARIAN"] = "hu";
    LanguageCode["INDONESIAN"] = "id";
    LanguageCode["ISRELI"] = "il";
    LanguageCode["INDIAN"] = "in";
    LanguageCode["IRAN"] = "ir";
    LanguageCode["ITALIAN"] = "it";
    LanguageCode["JAPANESE"] = "jp";
    LanguageCode["KOREAN"] = "kr";
    LanguageCode["LITHUANIAN"] = "lt";
    LanguageCode["MONGOLIAN"] = "mn";
    LanguageCode["MEXIAN"] = "mx";
    LanguageCode["MALAY"] = "my";
    LanguageCode["DUTCH"] = "nl";
    LanguageCode["NORWEGIAN"] = "no";
    LanguageCode["PHILIPPINE"] = "ph";
    LanguageCode["POLISH"] = "pl";
    LanguageCode["PORTUGUESE"] = "pt";
    LanguageCode["ROMANIAN"] = "ro";
    LanguageCode["RUSSIAN"] = "ru";
    LanguageCode["SANSKRIT"] = "sa";
    LanguageCode["SAMI"] = "si";
    LanguageCode["THAI"] = "th";
    LanguageCode["TURKISH"] = "tr";
    LanguageCode["UKRAINIAN"] = "ua";
    LanguageCode["VIETNAMESE"] = "vn";
})(LanguageCode = exports.LanguageCode || (exports.LanguageCode = {}));

},{}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MangaStatus = void 0;
var MangaStatus;
(function (MangaStatus) {
    MangaStatus[MangaStatus["ONGOING"] = 1] = "ONGOING";
    MangaStatus[MangaStatus["COMPLETED"] = 0] = "COMPLETED";
    MangaStatus[MangaStatus["UNKNOWN"] = 2] = "UNKNOWN";
    MangaStatus[MangaStatus["ABANDONED"] = 3] = "ABANDONED";
    MangaStatus[MangaStatus["HIATUS"] = 4] = "HIATUS";
})(MangaStatus = exports.MangaStatus || (exports.MangaStatus = {}));

},{}],28:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],29:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],30:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],31:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],32:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],33:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],34:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],35:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],36:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],37:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchOperator = void 0;
var SearchOperator;
(function (SearchOperator) {
    SearchOperator["AND"] = "AND";
    SearchOperator["OR"] = "OR";
})(SearchOperator = exports.SearchOperator || (exports.SearchOperator = {}));

},{}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentRating = void 0;
/**
 * A content rating to be attributed to each source.
 */
var ContentRating;
(function (ContentRating) {
    ContentRating["EVERYONE"] = "EVERYONE";
    ContentRating["MATURE"] = "MATURE";
    ContentRating["ADULT"] = "ADULT";
})(ContentRating = exports.ContentRating || (exports.ContentRating = {}));

},{}],40:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],41:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagType = void 0;
/**
 * An enumerator which {@link SourceTags} uses to define the color of the tag rendered on the website.
 * Five types are available: blue, green, grey, yellow and red, the default one is blue.
 * Common colors are red for (Broken), yellow for (+18), grey for (Country-Proof)
 */
var TagType;
(function (TagType) {
    TagType["BLUE"] = "default";
    TagType["GREEN"] = "success";
    TagType["GREY"] = "info";
    TagType["YELLOW"] = "warning";
    TagType["RED"] = "danger";
})(TagType = exports.TagType || (exports.TagType = {}));

},{}],43:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],44:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],45:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],46:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],47:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Chapter"), exports);
__exportStar(require("./ChapterDetails"), exports);
__exportStar(require("./HomeSection"), exports);
__exportStar(require("./Manga"), exports);
__exportStar(require("./MangaTile"), exports);
__exportStar(require("./RequestObject"), exports);
__exportStar(require("./SearchRequest"), exports);
__exportStar(require("./TagSection"), exports);
__exportStar(require("./SourceTag"), exports);
__exportStar(require("./Languages"), exports);
__exportStar(require("./Constants"), exports);
__exportStar(require("./MangaUpdate"), exports);
__exportStar(require("./PagedResults"), exports);
__exportStar(require("./ResponseObject"), exports);
__exportStar(require("./RequestManager"), exports);
__exportStar(require("./RequestHeaders"), exports);
__exportStar(require("./SourceInfo"), exports);
__exportStar(require("./SourceStateManager"), exports);
__exportStar(require("./RequestInterceptor"), exports);
__exportStar(require("./DynamicUI"), exports);
__exportStar(require("./TrackedManga"), exports);
__exportStar(require("./SourceManga"), exports);
__exportStar(require("./TrackedMangaChapterReadAction"), exports);
__exportStar(require("./TrackerActionQueue"), exports);
__exportStar(require("./SearchField"), exports);
__exportStar(require("./RawData"), exports);

},{"./Chapter":6,"./ChapterDetails":7,"./Constants":8,"./DynamicUI":24,"./HomeSection":25,"./Languages":26,"./Manga":27,"./MangaTile":28,"./MangaUpdate":29,"./PagedResults":30,"./RawData":31,"./RequestHeaders":32,"./RequestInterceptor":33,"./RequestManager":34,"./RequestObject":35,"./ResponseObject":36,"./SearchField":37,"./SearchRequest":38,"./SourceInfo":39,"./SourceManga":40,"./SourceStateManager":41,"./SourceTag":42,"./TagSection":43,"./TrackedManga":44,"./TrackedMangaChapterReadAction":45,"./TrackerActionQueue":46}],48:[function(require,module,exports){
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
const AMT_IN_HOMEPAGE = 10;
const AMT_PER_VIEW_MORE_CALL = 10;
class DynastyScans extends paperback_extensions_common_1.Source {
    constructor() {
        super(...arguments);
        this.baseURL = WEBSITE_URL;
        this.GITHUB_REPOSITORY = "https://github.com/phiefferj24/paperback-sources";
        this.requestManager = createRequestManager({
            requestsPerSecond: 10,
            requestTimeout: 5000
        });
    }
    getMangaDetails(mangaId) {
        return __awaiter(this, void 0, void 0, function* () {
            let request = createRequestObject({
                url: `${WEBSITE_URL}/${mangaId}.json`,
                method: 'GET'
            });
            let data = (yield this.requestManager.schedule(request, 3)).data;
            const json = JSON.parse(data);
            var status = paperback_extensions_common_1.MangaStatus.UNKNOWN;
            const tags = json.tags;
            const chapters = json.taggings;
            const tagList = [];
            const $ = this.cheerio.load(`<div>${json.description}</div>`);
            const description = $('div').text();
            var author = undefined;
            for (let index in tags) {
                let tag = tags[index];
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
            var lastUpdated = undefined;
            for (let index in chapters) {
                let chapter = chapters[index];
                if (chapter.hasOwnProperty('released_on')) {
                    lastUpdated = new Date(chapter.released_on);
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
            });
        });
    }
    getChapters(mangaId) {
        return __awaiter(this, void 0, void 0, function* () {
            let request = createRequestObject({
                url: `${WEBSITE_URL}/${mangaId}.json`,
                method: 'GET'
            });
            let data = (yield this.requestManager.schedule(request, 3)).data;
            const json = JSON.parse(data);
            var chapterList = [];
            const chapters = json.taggings;
            var chapterIterator = 1;
            for (let index in chapters) {
                let chapter = chapters[index];
                if (chapter.hasOwnProperty('title')) {
                    let lastUpdated = new Date(chapter.released_on);
                    var group = undefined;
                    for (let index2 in chapter.tags) {
                        let tag = chapter.tags[index2];
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
            let data = (yield this.requestManager.schedule(request, 3)).data;
            const json = JSON.parse(data);
            let pages = [];
            var longStrip = false;
            const tags = json.tags;
            for (let index in tags) {
                let tag = tags[index];
                if (tag.permalink === "long_strip") {
                    longStrip = true;
                }
            }
            const jsonpages = json.pages;
            for (let index in jsonpages) {
                pages.push(`${WEBSITE_URL}${jsonpages[index].url}`);
            }
            return createChapterDetails({
                id: chapterId,
                mangaId: mangaId,
                pages: pages,
                longStrip: longStrip
            });
        });
    }
    getSearchResults(query, metadata) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let page = (_a = metadata === null || metadata === void 0 ? void 0 : metadata.page) !== null && _a !== void 0 ? _a : 1;
            let search = encodeURIComponent((_b = query.title) !== null && _b !== void 0 ? _b : "");
            let request = createRequestObject({
                url: `https://dynasty-scans.com/search?q=${search}&classes%5B%5D=Anthology&classes%5B%5D=Doujin&classes%5B%5D=Issue&classes%5B%5D=Series&classes%5B%5D=Author&classes%5B%5D=Scanlator&classes%5B%5D=General&sort=&page=${page}`,
                method: 'GET'
            });
            let data = yield this.requestManager.schedule(request, 3);
            let $ = this.cheerio.load(data.data);
            let mangaTiles = [];
            let mangas = $("dl.chapter-list dd").toArray();
            for (let index in mangas) {
                let chapter = mangas[index];
                const permalink = $("a.name", chapter).attr("href").toString().substring(1);
                const type = permalink.substring(0, permalink.indexOf("/"));
                if (type !== "series" && type !== "doujins") {
                    continue;
                }
                const title = `${$("a.name", chapter).text()} (${type === "series" ? "Series" : "Doujin"})`;
                const request = createRequestObject({
                    url: `${WEBSITE_URL}/${permalink}.json`,
                    method: 'GET'
                });
                const data = yield this.requestManager.schedule(request, 3);
                const json = JSON.parse(data.data);
                mangaTiles.push(createMangaTile({
                    id: permalink,
                    title: createIconText({
                        text: title
                    }),
                    image: `${WEBSITE_URL}${json.cover}`
                }));
            }
            const navItems = $("div.pagination ul li").toArray();
            var lastPageNum = 1;
            for (let index in navItems) {
                let navItem = navItems[index];
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
                newMetadata = { page: (page + 1) };
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
            let data = (yield this.requestManager.schedule(request, 3)).data;
            let section = createHomeSection({
                id: 'recently_updated',
                title: 'Recently Updated Mangas',
                view_more: true,
            });
            sectionCallback(section);
            let tiles = [];
            let addedManga = [];
            let json = JSON.parse(data);
            var offset = 0;
            for (var i = 0; i < AMT_IN_HOMEPAGE + offset; i++) {
                let chapter = json.chapters[i];
                if (chapter === null) {
                    break;
                }
                let id = undefined;
                let name = undefined;
                for (let tag of chapter.tags) {
                    if (tag.type === "Series") {
                        id = tag.permalink;
                        name = tag.name;
                    }
                }
                if (id === undefined || name === undefined || addedManga.includes(id)) {
                    offset++;
                    continue;
                }
                let request2 = createRequestObject({
                    url: `${WEBSITE_URL}/series/${id}.json`,
                    method: 'GET',
                });
                let data2 = (yield this.requestManager.schedule(request2, 1)).data;
                let json2 = JSON.parse(data2);
                tiles.push(createMangaTile({
                    id: `series/${id}`,
                    title: createIconText({ text: name }),
                    image: `${WEBSITE_URL}${json2.cover}`
                }));
                addedManga.push(id);
            }
            section.items = tiles;
            sectionCallback(section);
        });
    }
    getMangaShareUrl(mangaId) {
        return `${WEBSITE_URL}/${mangaId}`;
    }
    getViewMoreItems(homepageSectionId, metadata) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let page = (_a = metadata === null || metadata === void 0 ? void 0 : metadata.page) !== null && _a !== void 0 ? _a : 1;
            let request = createRequestObject({
                url: `${WEBSITE_URL}/chapters/added.json?page=${page}`,
                method: 'GET',
            });
            let data = (yield this.requestManager.schedule(request, 3)).data;
            let json = JSON.parse(data);
            var newPageNeeded = false;
            var lastPageNum = Number.isNaN(Number(json.total_pages)) ? 1 : Number(json.total_pages);
            var offset = 0;
            let at = (_b = metadata === null || metadata === void 0 ? void 0 : metadata.at) !== null && _b !== void 0 ? _b : 0;
            let tiles = [];
            let addedManga = [];
            for (var i = at; i < AMT_PER_VIEW_MORE_CALL + offset + at; i++) {
                if (i >= json.chapters.length) {
                    newPageNeeded = true;
                    break;
                }
                let chapter = json.chapters[i];
                let id = undefined;
                let name = undefined;
                if (chapter === undefined || !chapter.hasOwnProperty('tags')) {
                    offset++;
                    continue;
                }
                for (let tag of chapter.tags) {
                    if (tag.type === "Series") {
                        id = tag.permalink;
                        name = tag.name;
                    }
                }
                if (id === undefined || name === undefined || addedManga.includes(id)) {
                    offset++;
                    continue;
                }
                let request2 = createRequestObject({
                    url: `${WEBSITE_URL}/series/${id}.json`,
                    method: 'GET',
                });
                let data2 = (yield this.requestManager.schedule(request2, 1)).data;
                let json2 = JSON.parse(data2);
                tiles.push(createMangaTile({
                    id: `series/${id}`,
                    title: createIconText({ text: name }),
                    image: `${WEBSITE_URL}${json2.cover}`
                }));
                addedManga.push(id);
            }
            let newMetadata;
            if (lastPageNum === page && newPageNeeded) {
                newMetadata = undefined;
            }
            else {
                if (newPageNeeded)
                    newMetadata = { page: (page + 1), at: 0 };
                else
                    newMetadata = { page: page, at: at + offset + AMT_PER_VIEW_MORE_CALL };
            }
            return createPagedResults({
                results: tiles,
                metadata: newMetadata
            });
        });
    }
}
exports.DynastyScans = DynastyScans;
exports.DynastyScansInfo = {
    version: '1.0.0',
    name: 'Dynasty Scans',
    icon: 'icon.jpg',
    author: 'JimIsWayTooEpic',
    authorWebsite: 'https://jimphieffer.com/paperback/',
    description: 'Source for Dynasty Scans. Created by JimIsWayTooEpic.',
    contentRating: paperback_extensions_common_1.ContentRating.ADULT,
    websiteBaseURL: WEBSITE_URL,
    language: "English"
};

},{"paperback-extensions-common":5}]},{},[48])(48)
});
