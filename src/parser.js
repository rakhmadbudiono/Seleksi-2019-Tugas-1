const rp = require('request-promise');
const $ = require('cheerio');

const parser = function (url) {
    return rp(url)
        .then(function (html) {
            const casts = [];
            $('div > p', html).each(function () {
                casts.push($(this).text());
            });

            return {
                character: $('h1', html).text(),
                cast: casts[0],
                description: casts[1]
            };
        })
        .catch(function (err) {
            //handle error
            console.log(err);
        });
};

module.exports = parser;