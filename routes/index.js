var express = require('express');
const cheerio = require('cheerio');
var router = express.Router();
const axios = require('axios');


//6漫画搜索
router.get('/6mh',async (req, res)=> {//6mh9.com
  console.log(req);
  let result=await axios.get("http://m.6mh67.com/search",{params:req.body})
  // console.log(result.data);
  const $ = cheerio.load(result.data);
  const links = [];
  $('.result-list a').each((index, element) => {
    const href = $(element).attr('href');
    const src = $(element).find('img').attr('src');
    const h2=$(element).find('h2').text();

    const pElements = $(element).find('.cartoon-info p');
    const pContents = [];

    pElements.each((index, pElement) => {
      pContents.push($(pElement).text());
    });
    links.push({ href, src,h2, pContents });
  });
  res.json(links)
  // console.log(links);
});


//显示目录
router.get('/6mhlist',async (req, res)=> {
  let result=await axios.get("http://m.6mh67.com"+req.body.id)
  const $ = cheerio.load(result.data);
  const links = [];
  //图片
  const src = $('.cartoon-poster').attr('src')
  //作者及更新时间
  const author = $('.author').text().trim();
  //介绍
  const introduction = $('.introduction').text().trim();
  //目录
  $('#chapter-list1 a').each((index, element) => {
    const href = $(element).attr('href');
    const match = href.match(/\/([^/]+)\.html$/); 
    let extractedValue='';
  if (match) {
    extractedValue= match[1];
  }
    const content = $(element).find('p').text();
    links.push({'chapterid':extractedValue,'chaptername':content})
  });
  //更多目录
  
  console.log(author);
  console.log(introduction);
  console.log(src,links);
  res.json({author,introduction,src,links})

});

module.exports = router;
