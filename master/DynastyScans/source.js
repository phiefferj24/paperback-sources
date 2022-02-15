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
        var _a, _b, _c, _d, _e;
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
                const permalink = $("a.name", chapter).attr("href").toString().substring(1);
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
    authorWebsite: 'https://phiefferj24.github.io/paperback-sources/bundles/',
    description: 'Source for Dynasty Scans. Created by JimIsWayTooEpic.',
    contentRating: paperback_extensions_common_1.ContentRating.ADULT,
    websiteBaseURL: WEBSITE_URL,
    language: "English"
};

},{"paperback-extensions-common":5}]},{},[48])(48)
});