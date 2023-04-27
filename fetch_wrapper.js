class Ajax 
{
    /**
	 * Performs a GET request to a given URL and returns the result
	 * @param {string} url The URL address to send the request to
     * @param {object} data The data to be send with the request
     * @param {boolean} originalResponse Whether the response should be returned untouched or automatically parsed
	 */
	static async get(url, data = {}, originalResponse = false) {
		return this._request(url, 'GET', data, originalResponse);
	}

    /**
     * Performs a POST request to a given URL and returns the result
     * @param {string} url The URL address to send the request to
     * @param {object} data The data to be send with the request
     * @param {boolean} originalResponse Whether the response should be returned untouched or automatically parsed
     */
    static async post(url, data = {}, originalResponse = false) {
        return this._request(url, 'POST', data, originalResponse);
    }

    /**
     * Sends a request to a server
     * @param {string} url The aURL address to send the request to
     * @param {string} type The request type, specify one of the following values: GET, POST, DELETE, PUT
     * @param {object} data The data to be send with the request
     * @param {boolean} originalResponse Whether the response should be returned untouched or automatically parsed
     * @returns {Promise<Response>}
     */
    static async _request(url, type, data, originalResponse) {
        let types = ['GET', 'POST', 'DELETE', 'PUT'];
        type = type.toUpperCase();
        if (types.indexOf(type) === -1)
            throw new Error('Invalid request type');

        let fetchOptions = {
            method: type,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        };

        if (type === 'GET') {
            let requestData = Ajax._serialize(data);
            if (requestData)
                url = (url.indexOf("?") == -1) ? `${url}?${requestData}` : `${url}&${requestData}`;
        }
        else
            fetchOptions.body = Ajax._serialize(data);

        let response = await fetch(url, fetchOptions);
        
        if (originalResponse)
            return response;
        if (!response.ok)
            throw new Error(`${response.status} - ${response.statusText}`);

        let contentType = response.headers.get('content-type');
        if (contentType) {
            if (contentType.includes('application/json'))
                return response.json();
            if (contentType.includes('text/') || contentType.includes('text/html') || contentType.includes('text/css')
                || contentType.includes('text/javascript') || contentType.includes('text/markdown'))
                return response.text();
            if (contentType.includes('multipart/form-data'))
                return response.formData();
            if (contentType.includes('application/octet-stream'))
                return response.arrayBuffer();
        }

        throw new TypeError('Content type not found. Cannot autoparse the response');            
    }

    static _serialize(obj, prefix = '') {
        let str = [];
        for (let p in obj) {
            if (obj.hasOwnProperty(p)) {
                var k = prefix ? prefix + "[" + p + "]" : p,
                    v = obj[p];
                str.push((v !== null && typeof v === "object") ?
                    Ajax._serialize(v, k) :
                    encodeURIComponent(k) + "=" + encodeURIComponent(v));
            }
        }
        return str.join("&");
    }
}