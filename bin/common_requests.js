const logger = require('./logger');

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const TOLERANCE_START_PERCENTAGE = 30;
const TOLERANCE_END_PERCENTAGE = 10;

function getFromOctane(octaneInstance, url, clientType) {
    return octaneInstance.getOctaneInstance()
        .then(octane => {
            return octane.get({
                uri: url,
                headers: {
                    HPECLIENTTYPE: clientType
                }
            })
        });
}

function getLatestReleaseBurnUp(octaneInstance, releaseUrl) {
    return getFromOctane(octaneInstance, releaseUrl, 'HPE_MQM_UI')
        .then(result => {
            let nowDate = new Date();
            let rows = result.graphResult.dataTable.rows;
            const toleranceJump = (TOLERANCE_END_PERCENTAGE - TOLERANCE_START_PERCENTAGE) / (rows.length - 1);
            let parsedData = {labels: [], expected: [], done: [], scope: [], tolerance: []};
            let futureData = false;

            for (let i = 0; i < rows.length; ++i) {
                const row = rows[i];
                const rowDate = Date.parse(row.id);
                parsedData.labels.push(rowDate);
                parsedData.expected.push(row.values[0]);

                let toleranceDelta = i * toleranceJump;
                let tolerancePercentage = TOLERANCE_START_PERCENTAGE + toleranceDelta;
                parsedData.tolerance.push(row.values[0] - (row.values[0] * (tolerancePercentage / 100)));

                if (!futureData) {
                    parsedData.done.push(row.values[1]);
                    parsedData.scope.push((row.values[2]));
                }
                if (nowDate - rowDate >= 0 && nowDate - rowDate < DAY_IN_MS) {
                    parsedData.currentDataIndex = i;
                    futureData = true;
                }
            }
            return parsedData;
        }).catch(problem => {
            logger.error(problem);
        });
}

function getReleaseResult(releaseData) {
    let releaseCurrentDataIndex = releaseData.currentDataIndex;
    let expected = releaseData.expected[releaseCurrentDataIndex];
    let tolerance = releaseData.tolerance[releaseCurrentDataIndex];
    let done = releaseData.done[releaseCurrentDataIndex];

    return done >= expected ? 1 : done >= tolerance ? 0 : -1;
}

module.exports.getLatestReleaseBurnUp = getLatestReleaseBurnUp;
module.exports.getReleaseResult = getReleaseResult;
module.exports.getFromOctane = getFromOctane;