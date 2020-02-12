const commonRequests = require('./common_requests');
const connectionData = {
    baseUrl: 'https://almoctane-ams.saas.microfocus.com',
    authentication: {
        client_id: 'ADM_KPI_196009_okx8n4mpl914u3xpeyz3nm4yd',
        client_secret: '=4fc791b4e10170L'
    }
};
const OctaneInstance = require('./octaneInstance');
const octaneInstance = new OctaneInstance(connectionData);

const SPACE = 196009;

const metadata = {
    LRE: {
        WS: 3001,
        URL: 'internal-api/shared_spaces/196009/workspaces/3001/trend?graph_extenders=burnUpExtender&entity-name=work_item&rangeOperator=releasePeriod&xAxisUnit=days&cumulative=true&timezone=UTC%252B02%253A00&yaxis=story_points&range=[current_release]&sets=%5B%7B%22query%22%3A%22(subtype%20IN%20%27story%27%2C%27defect%27%2C%27quality_story%27%3Bphase%3D%7Bid%20IN%20%27phase.defect.closed%27%2C%27phase.defect.rejected%27%2C%27phase.defect.duplicate%27%2C%27phase.story.done%27%2C%27phase.quality_story.done%27%7D%3Bteam%3D%7Bid%20IN%20%2711002%27%2C%2718001%27%2C%2717001%27%2C%278003%27%2C%275025%27%7D%3B(release%3D%7B%5Bcurrent_release%5D%7D))%22%2C%22groupBy%22%3Afalse%2C%22key%22%3A%22done%22%7D%2C%7B%22query%22%3A%22(subtype%20IN%20%27story%27%2C%27defect%27%2C%27quality_story%27%3Bteam%3D%7Bid%20IN%20%2711002%27%2C%2718001%27%2C%2717001%27%2C%278003%27%2C%275025%27%7D%3B(release%3D%7B%5Bcurrent_release%5D%7D))%22%2C%22groupBy%22%3Afalse%2C%22key%22%3A%22total%22%7D%5D&entity-subtypes=story%2Cdefect%2Cquality_story',
        RELEASE: 'DEFAULT'
    },
    LRP: {
        WS: 2001,
        URL: 'internal-api/shared_spaces/196009/workspaces/2001/trend?graph_extenders=burnUpExtender&entity-name=work_item&rangeOperator=releasePeriod&xAxisUnit=days&cumulative=true&timezone=UTC%252B02%253A00&yaxis=story_points&range=[current_release]&sets=%5B%7B%22query%22%3A%22(subtype%20IN%20%27story%27%2C%27defect%27%2C%27quality_story%27%3Bphase%3D%7Bid%20IN%20%27phase.defect.closed%27%2C%27phase.defect.rejected%27%2C%27phase.defect.duplicate%27%2C%27phase.story.done%27%2C%27phase.quality_story.done%27%7D%3B(release%3D%7B%5Bcurrent_release%5D%7D))%22%2C%22groupBy%22%3Afalse%2C%22key%22%3A%22done%22%7D%2C%7B%22query%22%3A%22(subtype%20IN%20%27story%27%2C%27defect%27%2C%27quality_story%27%3B(release%3D%7B%5Bcurrent_release%5D%7D))%22%2C%22groupBy%22%3Afalse%2C%22key%22%3A%22total%22%7D%5D&entity-subtypes=story%2Cdefect%2Cquality_story',
        RELEASE: 'DEFAULT'
    },
    LRC: {
        WS: 4001,
        URL: 'internal-api/shared_spaces/196009/workspaces/4001/trend?graph_extenders=burnUpExtender&entity-name=work_item&rangeOperator=releasePeriod&xAxisUnit=days&cumulative=true&timezone=UTC%252B02%253A00&yaxis=story_points&range=[48002]&sets=%5B%7B%22query%22%3A%22(subtype%20IN%20%27story%27%2C%27defect%27%2C%27quality_story%27%3Bphase%3D%7Bid%20IN%20%27phase.defect.closed%27%2C%27phase.defect.rejected%27%2C%27phase.defect.duplicate%27%2C%27phase.story.done%27%2C%27phase.quality_story.done%27%7D%3Brelease%3D%7Bid%3D48002%7D)%22%2C%22groupBy%22%3Afalse%2C%22key%22%3A%22done%22%7D%2C%7B%22query%22%3A%22(subtype%20IN%20%27story%27%2C%27defect%27%2C%27quality_story%27%3Brelease%3D%7Bid%3D48002%7D)%22%2C%22groupBy%22%3Afalse%2C%22key%22%3A%22total%22%7D%5D&entity-subtypes=story%2Cdefect%2Cquality_story',
        RELEASE: 48002
    },
    SRL: {
        WS: 4001,
        URL: 'internal-api/shared_spaces/196009/workspaces/4001/trend?graph_extenders=burnUpExtender&entity-name=work_item&rangeOperator=releasePeriod&xAxisUnit=days&cumulative=true&timezone=UTC%252B02%253A00&yaxis=story_points&range=[48001]&sets=%5B%7B%22query%22%3A%22(subtype%20IN%20%27story%27%2C%27defect%27%2C%27quality_story%27%3Bphase%3D%7Bid%20IN%20%27phase.defect.closed%27%2C%27phase.defect.rejected%27%2C%27phase.defect.duplicate%27%2C%27phase.story.done%27%2C%27phase.quality_story.done%27%7D%3Brelease%3D%7Bid%3D48001%7D)%22%2C%22groupBy%22%3Afalse%2C%22key%22%3A%22done%22%7D%2C%7B%22query%22%3A%22(subtype%20IN%20%27story%27%2C%27defect%27%2C%27quality_story%27%3Brelease%3D%7Bid%3D48001%7D)%22%2C%22groupBy%22%3Afalse%2C%22key%22%3A%22total%22%7D%5D&entity-subtypes=story%2Cdefect%2Cquality_story',
        RELEASE: 48001
    },
    LRPROTO: {
        WS: 4001,
        URL: 'internal-api/shared_spaces/196009/workspaces/4001/trend?graph_extenders=burnUpExtender&entity-name=work_item&rangeOperator=releasePeriod&xAxisUnit=days&cumulative=true&timezone=UTC%252B02%253A00&yaxis=story_points&range=%5b47003%5d&sets=%5B%7B%22query%22%3A%22(subtype%20IN%20%27story%27%2C%27defect%27%2C%27quality_story%27%3Bphase%3D%7Bid%20IN%20%27phase.defect.closed%27%2C%27phase.defect.rejected%27%2C%27phase.defect.duplicate%27%2C%27phase.story.done%27%2C%27phase.quality_story.done%27%7D%3Brelease%3D%7Bid%3D47003%7D)%22%2C%22groupBy%22%3Afalse%2C%22key%22%3A%22done%22%7D%2C%7B%22query%22%3A%22(subtype%20IN%20%27story%27%2C%27defect%27%2C%27quality_story%27%3Brelease%3D%7Bid%3D47003%7D)%22%2C%22groupBy%22%3Afalse%2C%22key%22%3A%22total%22%7D%5D&entity-subtypes=story%2Cdefect%2Cquality_story',
        RELEASE: 47003
    }
};

function getReleaseData(type) {
    const release = metadata[type].RELEASE;
    const isDefaultRelease = release === 'DEFAULT';
    return commonRequests.getFromOctane(octaneInstance, 'api/shared_spaces/' + SPACE + '/workspaces/' + metadata[type].WS + '/releases?' +
        (isDefaultRelease ?
            '' : 'query="id EQ ' + release + '"&')
        + 'fields=' +
        (isDefaultRelease ?
            'is_default,' : '')
        + 'name,end_date', 'HPE_REST_API_TECH_PREVIEW')
        .then(result => {
            return isDefaultRelease ? result.data.filter(data => data.is_default)[0] : result.data[0];
        });
}

module.exports.getLRData = function getLRData(type) {
    return Promise.all([
        commonRequests.getLatestReleaseBurnUp(octaneInstance, metadata[type].URL),
        getReleaseData(type)
    ]).then(lrResults => {
        return {
            releaseData: lrResults[0],
            releaseResult: commonRequests.getReleaseResult(lrResults[0]),
            releaseMetadata: lrResults[1]
        };
    });
};