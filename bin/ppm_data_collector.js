const commonRequests = require('./common_requests');
const connectionData = {
    baseUrl: 'https://internal.almoctane.com',
    authentication: {
        client_id: 'ADM_KPI_79001_q1m9y32951zqva3vv8z6kl8d6',
        client_secret: '-1131124176253230726J'
    }
};
const OctaneInstance = require('./octaneInstance');
const octaneInstance = new OctaneInstance(connectionData);

function getReleaseData() {
    return commonRequests.getFromOctane(octaneInstance, 'api/shared_spaces/79001/workspaces/1003/releases?fields=name,end_date&query="id EQ 3001"', 'HPE_REST_API_TECH_PREVIEW')
        .then(result => {
            return result.data[0];
        });
}

module.exports.getPPMData = function () {
    let returnObject = {
        releaseData: null,
        releaseResult: null,
        releaseMetadata: {name: 'N/A', end_date: 0}
    };
    return Promise.all([
        commonRequests.getLatestReleaseBurnUp(octaneInstance, 'internal-api/shared_spaces/79001/workspaces/1003/trend?graph_extenders=burnUpExtender&entity-name=work_item&rangeOperator=releasePeriod&xAxisUnit=days&cumulative=true&timezone=UTC%252B02%253A00&yaxis=story_points&range=%5b3001%5d&sets=%5B%7B%22query%22%3A%22(subtype%20IN%20%27defect%27%2C%27quality_story%27%2C%27story%27%3Bphase%3D%7Bid%20IN%20%27phase.defect.closed%27%2C%27phase.defect.rejected%27%2C%27phase.defect.duplicate%27%2C%27phase.story.done%27%2C%27phase.quality_story.done%27%7D%3Brelease%3D%7Bid%3D3001%7D)%22%2C%22groupBy%22%3Afalse%2C%22key%22%3A%22done%22%7D%2C%7B%22query%22%3A%22(subtype%20IN%20%27defect%27%2C%27quality_story%27%2C%27story%27%3Brelease%3D%7Bid%3D3001%7D)%22%2C%22groupBy%22%3Afalse%2C%22key%22%3A%22total%22%7D%5D&entity-subtypes=defect%2Cquality_story%2Cstory'),
        getReleaseData()
    ]).then(ppmResults => {
        returnObject.releaseData = ppmResults[0];
        returnObject.releaseResult = commonRequests.getReleaseResult(ppmResults[0]);
        returnObject.releaseMetadata = ppmResults[1];
        return returnObject;
    }).catch(() => {
        return returnObject;
    });
};