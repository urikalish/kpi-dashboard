const logger = require('./logger');
const commonRequests = require('./common_requests');
const DAY_IN_MS = 24 * 60 * 60 * 1000;
const connectionData = {
    baseUrl: 'https://center.almoctane.com',
    authentication: {
        client_id: 'Octane KPI_01w2xgo41wenoilj4o69revgo',
        client_secret: '#75e8bbfd5851a0R'
    }
};
const OctaneInstance = require('./octaneInstance');
const octaneInstance = new OctaneInstance(connectionData);

function getFirstAndLastDefectStatus() {
    return commonRequests.getFromOctane(octaneInstance, 'internal-api/shared_spaces/1001/workspaces/1002/trend?entity-name=work_item&rangeOperator=releasePeriod&xAxisUnit=days&cumulative=true&timezone=UTC%252B02%253A00&groupby=severity&range=[current_release]&sets=%5B%7B%22query%22%3A%22((subtype%3D%27defect%27)%3Bphase%3D%7Bid%20IN%20%27phase.defect.new%27%2C%27phase.defect.opened%27%7D%3B!defect_type%3D%7Bid%20IN%20%27list_node_defect_type_cpe_incident_ln%27%2C%27list_node_defect_type_enhancement_ln%27%7D%3B(release%3D%7B%5Bcurrent_release%5D%7D))%22%2C%22groupBy%22%3Atrue%2C%22key%22%3A%22singleLine%22%7D%5D&entity-subtypes=defect', 'HPE_MQM_UI')
        .then(result => {
            let nowDate = new Date();
            let rows = result.graphResult.dataTable.rows;
            let parsedData = {
                firstTotal: rows[0].total,
                labels: [],
                unknown: [],
                low: [],
                medium: [],
                high: [],
                critical: []
            };
            let futureData = false;
            for (let i = 0; i < rows.length; ++i) {
                const row = rows[i];
                const rowDate = Date.parse(row.id);

                parsedData.labels.push(rowDate);

                if (!futureData) {
                    parsedData.unknown.push(row.values[0]);
                    parsedData.low.push(row.values[1]);
                    parsedData.medium.push(row.values[2]);
                    parsedData.high.push(row.values[3]);
                    parsedData.critical.push(row.values[4]);
                }
                if (nowDate - rowDate >= 0 && nowDate - rowDate < DAY_IN_MS) {
                    parsedData.lastTotal = row.total;
                    futureData = true;
                }
            }

            return parsedData;
        }).catch(problem => {
            logger.error(problem);
            throw problem;
        });
}

function getDefectResult(firstAndLastDefectStatus) {
    return firstAndLastDefectStatus.firstTotal > firstAndLastDefectStatus.lastTotal ? 1 : 0;
}

function getReleaseData() {
    return commonRequests.getFromOctane(octaneInstance, 'api/shared_spaces/1001/workspaces/1002/releases?fields=is_default,name,end_date', 'HPE_REST_API_TECH_PREVIEW')
        .then(result => {
            return result.data.filter(data => data.is_default)[0];
        });
}

module.exports.getOctaneData = function getOctaneData() {
    return Promise.all([
        getFirstAndLastDefectStatus(),
        commonRequests.getLatestReleaseBurnUp(octaneInstance, 'internal-api/shared_spaces/1001/workspaces/1002/trend?graph_extenders=burnUpExtender&entity-name=work_item&rangeOperator=releasePeriod&xAxisUnit=days&cumulative=true&timezone=UTC%252B02%253A00&yaxis=story_points&range=[current_release]&sets=%5B%7B%22query%22%3A%22(subtype%20IN%20%27story%27%2C%27defect%27%2C%27quality_story%27%3Bphase%3D%7Bid%20IN%20%27phase.defect.closed%27%2C%27n4e05glkovrvs1kz6l6ly9lq3%27%2C%27phase.defect.duplicate%27%2C%27phase.story.done%27%2C%2797z8n12ekrl2pbq05y093j5mr%27%2C%27phase.quality_story.done%27%7D%3B(release%3D%7B%5Bcurrent_release%5D%7D))%22%2C%22groupBy%22%3Afalse%2C%22key%22%3A%22done%22%7D%2C%7B%22query%22%3A%22(subtype%20IN%20%27story%27%2C%27defect%27%2C%27quality_story%27%3B(release%3D%7B%5Bcurrent_release%5D%7D))%22%2C%22groupBy%22%3Afalse%2C%22key%22%3A%22total%22%7D%5D&entity-subtypes=story%2Cdefect%2Cquality_story'),
        getReleaseData()
    ]).then(octaneResults => {
        let octaneReleaseResult = octaneResults[1];
        return {
            defectResult: getDefectResult(octaneResults[0]),
            defectData: octaneResults[0],
            releaseResult: commonRequests.getReleaseResult(octaneReleaseResult),
            releaseData: octaneReleaseResult,
            releaseMetadata: octaneResults[2]
        }
    });
};