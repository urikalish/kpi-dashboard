const commonRequests = require('./common_requests');
const connectionData = {
    baseUrl: 'https://internal.almoctane.com',
    authentication: {
        client_id: 'ADM_KPI_j7qpx5v638pj8spnngny719l8',
        client_secret: '#6dee88cc20b239a3X'
    }
};
const OctaneInstance = require('./octaneInstance');
const octaneInstance = new OctaneInstance(connectionData);

function getReleaseData() {
    return commonRequests.getFromOctane(octaneInstance, 'api/shared_spaces/45001/workspaces/2001/releases?fields=is_default,name,end_date', 'HPE_REST_API_TECH_PREVIEW')
        .then(result => {
            return result.data.filter(data => data.is_default)[0];
        });
}

module.exports.getUftMobileData = function getUftMobileData() {
    return Promise.all([
        commonRequests.getLatestReleaseBurnUp(octaneInstance, 'internal-api/shared_spaces/45001/workspaces/2001/trend?graph_extenders=burnUpExtender&entity-name=work_item&rangeOperator=releasePeriod&xAxisUnit=days&cumulative=true&timezone=UTC%252B02%253A00&yaxis=story_points&range=[current_release]&sets=%5B%7B%22query%22%3A%22(subtype%20IN%20%27defect%27%2C%27quality_story%27%2C%27story%27%3Bphase%3D%7Bid%20IN%20%27phase.defect.closed%27%2C%27phase.defect.rejected%27%2C%27phase.defect.duplicate%27%2C%27phase.story.done%27%2C%27phase.quality_story.done%27%7D%3Bteam%3D%7Bid%20IN%20%271001%27%2C%271002%27%2C%272001%27%2C%274002%27%2C%274001%27%7D%3B(release%3D%7B%5Bcurrent_release%5D%7D))%22%2C%22groupBy%22%3Afalse%2C%22key%22%3A%22done%22%7D%2C%7B%22query%22%3A%22(subtype%20IN%20%27defect%27%2C%27quality_story%27%2C%27story%27%3Bteam%3D%7Bid%20IN%20%271001%27%2C%271002%27%2C%272001%27%2C%274002%27%2C%274001%27%7D%3B(release%3D%7B%5Bcurrent_release%5D%7D))%22%2C%22groupBy%22%3Afalse%2C%22key%22%3A%22total%22%7D%5D&entity-subtypes=defect%2Cquality_story%2Cstory'),
        getReleaseData()
    ]).then(uftMobileResults => {
        return {
            releaseData: uftMobileResults[0],
            releaseResult: commonRequests.getReleaseResult(uftMobileResults[0]),
            releaseMetadata: uftMobileResults[1]
        };
    });
};