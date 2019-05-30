const rp = require('request-promise');
const $ = require('cheerio');
const parser = require('./parser');
const url = 'https://www.hbo.com/game-of-thrones/cast-and-crew';

rp(url)
  .then(function(html) {
    //success!
    const castUrls = [];
    for (let i = 23; i < 106; i++) {
      castUrls.push($('div > a', html)[i].attribs.href);
    }
    return Promise.all(
      castUrls.map(function(url) {
        return parser('https://www.hbo.com' + url);
      })
    );
  })
  .then(function(casts) {
    console.log(casts);
  })
  .catch(function(err) {
    //handle error
    console.log(err);
  });