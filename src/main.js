const rp = require('request-promise');
const $ = require('cheerio');
const parser = require('./parser');
const url = 'https://www.hbo.com/game-of-thrones/cast-and-crew';
const fs = require("fs");

rp(url)
  .then(function(html) {
    const castUrls = [];
    const links = $('div > a', html);
    const selectedUrl = '/game-of-thrones/cast-and-crew/';

    for (let i = 0; i < links.length; i++) {
      str = links[i].attribs.href;
      if(str !== undefined) 
        if(str.substring(0, selectedUrl.length) == selectedUrl){
                castUrls.push(str);
        }
    }
    return Promise.all(
      castUrls.map(function(url) {
        return parser('https://www.hbo.com' + url);
      })
    );
  })
  .then(function(casts) {
    fs.writeFileSync('../data/casts.json', JSON.stringify(casts, null, 4));
  })
  .catch(function(err) {
    //handle error
    console.log(err);
  });