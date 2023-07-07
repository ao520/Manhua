// id: "",                      下个页面id
// image: "",                   图片
// tabs:[],                     漫画类型
// name: "",                    漫画名字
// author: "",                  作者
// illustrate: "",              介绍
// update_time: "",             更新时间
// latest_update_time:"",       最近更新时间
// current_chapter: "",         当前的章节


var express = require('express');
const cheerio = require('cheerio');
var router = express.Router();
const axios = require('axios');

//包子漫画
router.get('/baozimh', async (req, res) => {
    const params = {
        q: req.query.search
    }
    let result = await axios.get("https://cn.baozimh.com/search", {
        params,
        headers: {
            'Host': 'cn.baozimh.com',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
        }
    })
    const $ = cheerio.load(result.data);
    const data = {
        code: 200,
        list: [],
        total: 0,
    }
    $('.pure-g .comics-card').each((index, element) => {
        const item = {
            id: "",
            image: "",
            tabs: [],
            name: "",
            author: "",
            illustrate: "",
            update_time: "",
            current_chapter: "",
        };
        item.id = $(element).find('.comics-card__poster').attr('href');
        item.image = $(element).find('amp-img').attr('src');
        $(element).find('.tabs .tab').each((i, e) => {
            item.tabs.push($(e).text().trim())
        })

        item.name = $(element).find('.comics-card__title').text();
        item.author = $(element).find('.tags').text();
        data.list.push(item);
    });
    data.total = data.list.length
    res.json(data)
});

//包子漫画导航
router.get('/baozimhnav', async (req, res) => {
    const params = {
        s: req.query.search
    }
    let result = await axios.get("https://baozimh.org", { params })
    const $ = cheerio.load(result.data);
    const data = {
        code: 200,
        list: [],
        total: 0,
    }
    $('.generate-columns-container .inside-article').each((index, element) => {
        const item = {
            id: "",
            image: "",
            tabs: [],
            name: "",
            author: "",
            illustrate: "",
            update_time: "",
            current_chapter: "",
        };
        item.id = $(element).find('.gb-headline a').attr('href').replace("https://baozimh.org", "");
        item.image = $(element).find('img').attr('src');
        item.name = $(element).find('.gb-headline a').text();
        data.list.push(item);
    });
    data.total = data.list.length
    res.json(data)
});


//6漫画
router.get('/6mh', async (req, res) => {
    const params = {
        keyword: req.query.search
    }
    let result = await axios.get("http://m.6mh67.com/search", { params })
    const $ = cheerio.load(result.data);
    const data = {
        code: 200,
        list: [],
        total: 0,
    }
    $('.result-list a').each((index, element) => {
        const item = {
            id: "",
            image: "",
            tabs: [],
            name: "",
            author: "",
            illustrate: "",
            update_time: "",
            current_chapter: "",
        };
        item.id = $(element).attr('href');
        item.image = $(element).find('img').attr('src');
        item.name = $(element).find('h2').text();
        const pElements = $(element).find('.cartoon-info p');
        item.author = $(pElements[0])?.text();
        item.illustrate = $(pElements[1])?.text();
        item.update_time = $(pElements[2])?.text();
        item.current_chapter = $(pElements[3])?.text();
        data.list.push(item);
    });
    data.total = data.list.length
    res.json(data)
});

//详细用不了
// 亲亲漫画
router.get('/kiss', async (req, res) => {
    const params = {
        keywords: req.query.search,
        page: 1,
    }
    let result = await axios.get("https://m.acgud.com/search/", { params })
    const $ = cheerio.load(result.data);
    let value = $('#total-page').attr('value')
    const data = {
        code: 200,
        list: [],
        total: 0,
    }
    $('.UpdateList .clearfix').each((index, element) => {
        const item = {
            id: "",
            image: "",
            tabs: [],
            name: "",
            author: "",
            illustrate: "",
            update_time: "",
            latest_update_time: "",
            current_chapter: "",
        };
        item.id = $(element).find('.itemImg a').attr('href').replace("https://m.acgud.com", "");
        item.image = $(element).find('.itemImg img').attr('src');
        item.name = $(element).find('.title').text();
        const pElements = $(element).find('.itemTxt .txtItme');
        item.author = $(pElements[0])?.text().trim();
        item.tabs = $(pElements[1])?.text().trim().split('|')
        item.latest_update_time = $(pElements[2])?.text().trim();
        data.list.push(item);
    });
    if (value > 1) {
        for (let i = 2; i <= value; i++) {
            params.page = i
            let result = await axios.get("https://m.acgud.com/search/", { params })
            const $ = cheerio.load(result.data);
            $('.UpdateList .clearfix').each((index, element) => {
                const item = {
                    id: "",
                    image: "",
                    tabs: [],
                    name: "",
                    author: "",
                    illustrate: "",
                    update_time: "",
                    latest_update_time: "",
                    current_chapter: "",
                };
                item.id = $(element).find('.itemImg a').attr('href').replace("https://m.acgud.com", "");
                item.image = $(element).find('.itemImg img').attr('src');
                item.name = $(element).find('.title').text();
                const pElements = $(element).find('.itemTxt .txtItme');
                item.author = $(pElements[0])?.text().trim();
                item.tabs = $(pElements[1])?.text().trim().split('|')
                item.latest_update_time = $(pElements[2])?.text().trim();
                data.list.push(item);
            });
        }
    }
    data.total = data.list.length
    res.json(data)
});

//36

module.exports = router;
