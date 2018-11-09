const cheerio = require('cheerio');
const axios = require('axios');

const markets = require('./config');

function requestPrice(ean) {
    return new Promise(function(resolve, reject) {
        const promisesMarkets = markets.map((market) => dispatcherRequest(market, ean));
        axios.all(promisesMarkets)
            .then((data) => {
                resolve(data);
            });
    });
}

function dispatcherRequest(market, ean) {
    switch (market.special) {
        case 'eci':
        case 'tudespensa':
            return specialRequest(market, ean) 
        case 'hipercor':
            return hipercorRequest(market, ean) 
        default: 
            return standarRequest(market, ean);
    }

}

function standarRequest(market, ean) {
    return axios.get(`${market.url}${ean}`)
    .then((response) => getPrice(response.data, market));
}

function specialRequest(market, ean) {
    return specialUrl(market, ean)
    .then((url) => {
        return axios.get(`${url}`)
    })
    .then((response) => {
        return getPrice(response.data, market);
    })
    .catch(() => {
        return {
            id: market.id,
            name: market.name, 
            price: null
        }
    })
}

function hipercorRequest(market, ean) {
    return specialUrl(market, ean)
    .then((url) => {
        const re = new RegExp(market.replaceUrl[0],"g");  
        const replacedUrl = url.replace(re, market.replaceUrl[1])
        return axios.get(`${replacedUrl}`)
    })
    .then((response) => {
        return getPrice(response.data, market);
    })
    .catch(() => {
        return {
            id: market.id,
            name: market.name, 
            price: null
        }
    })
}

function specialUrl(market, ean) {
    return axios.get(`${market.url}${ean}`)
    .then((response) => {
        const $ = cheerio.load(response.data);
        const url = $(market.specialSelector)[0].attribs.href.replace(/\/url\?q=/g, '').split('&sa=U&ved')[0];
        return url;
    })
}

function getPrice(html, { id, name, selector }) {
    const $ = cheerio.load(html);
    const price = $(selector).text().replace(/€/g, '').trim().split(' ')[0];
    return {
        id,
        name, 
        price: !!price ? price : null
    }
}

function formatToJson(data) {
    return {
        result: data
    };
}

module.exports = { requestPrice, formatToJson };