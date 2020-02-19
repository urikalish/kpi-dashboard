let express = require('express');
let router = express.Router();
const logger = require('../bin/logger');
let octaneDataCollector = require('../bin/octane_data_collector');
let almDataCollector = require('../bin/alm_data_collector');
let uftDataCollector = require('../bin/uft_data_collector');
let lrDataCollector = require('../bin/lr_data_collector');

/* GET home page. */
router.get('/', function (req, res, next) {
    Promise.all([
        octaneDataCollector.getOctaneData().catch(error => errorHandler(error)),
        almDataCollector.getALMData().catch(error => errorHandler(error)),
        uftDataCollector.getUftData('UFT_ONE').catch(error => errorHandler(error)),
        uftDataCollector.getUftData('UFT_DEVELOPER').catch(error => errorHandler(error)),
        uftDataCollector.getUftData('CODELESS').catch(error => errorHandler(error)),
        uftDataCollector.getUftData('UFT_MOBILE').catch(error => errorHandler(error)),
        lrDataCollector.getLRData('LRE').catch(error => errorHandler(error)),
        lrDataCollector.getLRData('LRP').catch(error => errorHandler(error)),
        lrDataCollector.getLRData('LRC').catch(error => errorHandler(error)),
        lrDataCollector.getLRData('SRL').catch(error => errorHandler(error)),
        lrDataCollector.getLRData('LRPROTO').catch(error => errorHandler(error))
    ]).then(results => {
        res.render('index', {
            octane: results[0],
            alm: results[1],
            uftOne: results[2],
            uftDeveloper: results[3],
            uftCodeless: results[4],
            uftMobile: results[5],
            lre: results[6],
            lrp: results[7],
            lrc: results[8],
            srl: results[9],
            lrproto: results[10]
        });
    }).catch(problem => {
        next(problem);
    });
});

function errorHandler(error) {
    logger.error(error);
    return [];
}

module.exports = router;
