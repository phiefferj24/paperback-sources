const request = require('request')
const cheerio = require('cheerio')
const query = "tadokoro"
const WEBSITE_URL = "https://dynasty-scans.com"
const mangaId = "series/tadokoro_san"
request.get(`${WEBSITE_URL}/${mangaId}.json`, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        let json = JSON.parse(body)
        console.log(json.tags[1])
    }
    else if(error) {
        console.log(error)
    }
})
