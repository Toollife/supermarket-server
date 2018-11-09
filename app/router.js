const express = require('express');
const controller = require('./controller');

const router = express.Router();

router
    .get('/product/:ean', function(req, res) { 
        console.log('New Request for product ' + req.params.ean);
        controller.requestPrice(req.params.ean).then((response) => {
            res.set({'Content-Type': 'application/json'});
            const formattedResponse = controller.formatToJson(response);
            console.log(formattedResponse);
            res.send(formattedResponse);
        });
    });

module.exports = router;