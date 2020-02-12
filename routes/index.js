let express = require('express');
let router = express.Router();
const logger = require('../bin/logger');
let octaneDataCollector = require('../bin/octane_data_collector');
let almDataCollector = require('../bin/alm_data_collector');
let uftMobileDataCollector = require('../bin/uft_mobile_data_collector');
let lrDataCollector = require('../bin/lr_data_collector');

/* GET home page. */
router.get('/', function (req, res, next) {
    Promise.all([
        octaneDataCollector.getOctaneData().catch(error => errorHandler(error)),
        almDataCollector.getALMData().catch(error => errorHandler(error)),
        uftMobileDataCollector.getUftMobileData().catch(error => errorHandler(error)),
        lrDataCollector.getLRData('LRE').catch(error => errorHandler(error)),
        lrDataCollector.getLRData('LRP').catch(error => errorHandler(error)),
        lrDataCollector.getLRData('LRC').catch(error => errorHandler(error)),
        lrDataCollector.getLRData('SRL').catch(error => errorHandler(error)),
        lrDataCollector.getLRData('LRPROTO').catch(error => errorHandler(error))
    ]).then(results => {
        res.render('index', {
            octane: results[0],
            alm: results[1],
            uftMobile: results[2],
            lre: results[3],
            lrp: results[4],
            lrc: results[5],
            srl: results[6],
            lrproto: results[7]
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
