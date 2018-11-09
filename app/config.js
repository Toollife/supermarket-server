const diaCfg = {
    id: 'dia',
    name: 'Día',
    url: 'https://www.dia.es/compra-online/search?text=',
    selector: 'p.price',    
  };
const carrefourCfg = {
    id: 'carrefour',
    name: 'Carrefour',
    url: 'https://www.carrefour.es/supermercado/c?Ntt=',
    selector: '.content-price.desktop-only>p.price',
};
const alcampoCfg = {
    id: 'alcampo',
    name: 'Alcampo',
    url: 'https://www.alcampo.es/compra-online/search/?text=',
    selector: '.priceContainer>span',    
};
const eroskyCfg = {
    id: 'erosky',
    name: 'Erosky',
    url: 'https://www.compraonline.grupoeroski.com/es/search/results/?q=',
    selector: 'span.price-offer-now',    
};
const eciCfg = {
    id: 'eci',
    name: 'El Corte Inglés',
    url: 'https://www.google.es/search?q=eci+',
    selector: '.prices-price._current',
    specialSelector: '.r>a', 
    special: 'eci' 
};
const hipercorCfg = {
    id: 'hipercor',
    name: 'Hipercor',
    url: 'https://www.google.es/search?q=eci+',
    selector: '.prices-price._current',
    specialSelector: '.r>a', 
    special: 'hipercor',
    replaceUrl: ['www.elcorteingles.es', 'www.hipercor.es']
};
const tuDespensaCfg = {
    id: 'tudespensa',
    name: 'Tu despensa',
    url: 'https://www.google.es/search?q=tudespensa+',
    selector: '.c-cat-product-detail__amt',
    specialSelector: '.r>a', 
    special: 'tudespensa' 
};

module.exports = [ diaCfg, carrefourCfg, alcampoCfg, eroskyCfg, eciCfg, hipercorCfg, tuDespensaCfg ];