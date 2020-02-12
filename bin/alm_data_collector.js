const commonRequests = require('./common_requests');
const connectionData = {
    baseUrl: 'https://center.almoctane.com',
    authentication: {
        client_id: 'Octane KPI_01w2xgo41wenoilj4o69revgo',
        client_secret: '#75e8bbfd5851a0R'
    }
};
const OctaneInstance = require('./octaneInstance');
const octaneInstance = new OctaneInstance(connectionData);

function getReleaseData() {
    return commonRequests.getFromOctane(octaneInstance, 'api/shared_spaces/1001/workspaces/26001/releases?fields=name,end_date&query="id EQ 92145"', 'HPE_REST_API_TECH_PREVIEW')
        .then(result => {
            return result.data[0];
        });
}

module.exports.getALMData = function getALMData() {
    return Promise.all([
        commonRequests.getLatestReleaseBurnUp(octaneInstance, 'internal-api/shared_spaces/1001/workspaces/26001/trend?graph_extenders=burnUpExtender&entity-name=work_item&rangeOperator=releasePeriod&xAxisUnit=days&cumulative=true&timezone=UTC%252B02%253A00&yaxis=story_points&range=[92145]&sets=%5B%7B%22query%22%3A%22((subtype%3D%27story%27)%3Bphase%3D%7Bid%20IN%20%27phase.story.done%27%2C%2797z8n12ekrl2pbq05y093j5mr%27%7D%3Brelease%3D%7Bid%3D92145%7D)%22%2C%22groupBy%22%3Afalse%2C%22key%22%3A%22done%22%7D%2C%7B%22query%22%3A%22((subtype%3D%27story%27)%3Brelease%3D%7Bid%3D92145%7D)%22%2C%22groupBy%22%3Afalse%2C%22key%22%3A%22total%22%7D%5D&entity-subtypes=story'),
        getReleaseData()
    ]).then(almResults => {
        return {
            releaseData: almResults[0],
            releaseResult: commonRequests.getReleaseResult(almResults[0]),
            releaseMetadata: almResults[1]
        };
    });
};