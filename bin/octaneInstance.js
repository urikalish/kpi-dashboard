const request = require('request-promise-native');
//require('request-debug')(request);
const TEN_MINUTES_MS = 10 * 60 * 1000;

function OctaneInstance(connectionData) {
    this._connectionData = connectionData;
    this._authenticated = false;
    this._lastAuthenticatedDate = 0;
    this.octane = request.defaults({
        baseUrl: this._connectionData.baseUrl,
        jar: request.jar(),
        json: true,
        p: 0,
        proxy:
            'http://web-proxy.eu.softwaregrp.net:8080'
    })
}

OctaneInstance.prototype.getOctaneInstance = function () {
    return new Promise(resolve => {
        if (new Date() - TEN_MINUTES_MS > this._lastAuthenticatedDate || !this._authenticated) {
            this._authenticated = false;
            return this.octane.post({
                body: this._connectionData.authentication,
                uri: 'authentication/sign_in',
            }).then(() => {
                this._authenticated = true;
                this._lastAuthenticatedDate = new Date();
                resolve(this.octane);
            });
        } else {
            resolve(this.octane);
        }
    });
};

module.exports = OctaneInstance;