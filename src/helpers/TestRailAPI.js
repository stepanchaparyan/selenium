import fetch from 'node-fetch';
import * as base64 from 'base-64';
//import * as path from 'path';

export default class TestRailAPI {
    constructor() {
        this.baseUrl = 'https://stepan.testrail.io//index.php?/api/v2/';
        this.username = 'stepanchaparyan@gmail.com';
        this.password = 'Aram05##';
        this.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + base64.encode(this.username + ':' + this.password)
        };
    }

    async getCase(caseNumber) {
        let method = 'get_case/';
        //let url = path.join(`${baseUrl}`,`${method}`,`${caseNumber}`);
        let url = (this.baseUrl + method + caseNumber);
        let options = {
            method: 'GET',
            headers: this.headers
        };

        let data = await fetch(url, options);
        let main = await data.json();
        return await main;
    }

    async getCases() {
        let method = 'get_cases/';
        let caseNumber = '1&type_id=3';
        let url = (this.baseUrl + method + caseNumber);
        let options = {
            method: 'GET',
            headers: this.headers
        };

        let data = await fetch(url, options);
        let main = await data.json();
        return await main;
    }

    async getTests(runNumber) {
        let method = 'get_tests/';
        let url = (this.baseUrl + method + runNumber);
        let options = {
            method: 'GET',
            headers: this.headers
        };

        let data = await fetch(url, options);
        let main = await data.json();
        return await main;
    }

    async getResults(testNumber) {
        let method = 'get_results/';
        // also can add limit for tests
        // also can filter test by status_id
        let url = (this.baseUrl + method + testNumber);
        console.log(url);
        let options = {
            method: 'GET',
            headers: this.headers
        };

        let data = await fetch(url, options);
        let main = await data.json();
        return await main;
    }

    async getTestStatus(testNumber) {
        let method = 'get_results/';
        let url = (this.baseUrl + method + testNumber);
        console.log(url);
        let options = {
            method: 'GET',
            headers: this.headers
        };

        let data = await fetch(url, options);
        let main = await data.json();
        return await main[0].status_id;
    }

    async getResultsForCase(runNumber, caseNumber) {
        let method = 'get_results_for_case/';
        // also can add limit for tests
        // also can filter test by status_id
        let url = (this.baseUrl + method + runNumber + '/' + caseNumber);
        console.log(url);
        let options = {
            method: 'GET',
            headers: this.headers
        };

        let data = await fetch(url, options);
        let main = await data.json();
        return await main;
    }

    async getResultsForRun(runNumber) {
        let method = 'get_results_for_run/';
        // also can add limit for tests
        // also can filter test by status_id
        let url = (this.baseUrl + method + runNumber);
        console.log(url);
        let options = {
            method: 'GET',
            headers: this.headers
        };

        let data = await fetch(url, options);
        let main = await data.json();
        return await main;
    }

    async addRun(project_id, runName = 'simpleRun', suite_id = 1, ) {
        let method = 'add_run/';
        let url = (this.baseUrl + method + project_id);
        console.log(url);
        let body = {
            // add Date
            'name': runName,
            'suite_id': suite_id,
            'include_all': false,
            'case_ids': [22, 23, 32, 33, 42, 43]
        };
        let options = {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(body)
        };

        let data = await fetch(url, options);
        let main = await data.json();
        return await main;
    }

    async addResult(testId, status_id, comment = '') {
        let method = 'add_result/';
        let url = (this.baseUrl + method + testId);
        console.log(url);
        let body = {
            'status_id': status_id,
            'comment': comment
        };
        let options = {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(body)
        };

        let data = await fetch(url, options);
        let main = await data.json();
        return await main;
    }

    async addResults(runId, status_id, comment = '') {
        let method = 'add_results/';
        let url = (this.baseUrl + method + runId);
        console.log(url);
        let body = {
            'results': [
                {
                    'test_id': 7870,
                    'status_id': status_id,
                    'comment': comment
                },
                {
                    'test_id': 7871,
                    'status_id': status_id,
                    'comment': comment
                },
                {
                    'test_id': 7875,
                    'status_id': status_id,
                    'comment': comment
                }
            ]
        };
        let options = {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(body)
        };

        let data = await fetch(url, options);
        let main = await data.json();
        return await main;
    }

    async addResultForCase(runId, caseId, status_id, comment = '') {
        let method = 'add_result_for_case/';
        let url = (this.baseUrl + method + runId + '/' + caseId);
        console.log(url);
        let body = {
            'status_id': status_id,
            'comment': comment
        };
        let options = {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(body)
        };

        let data = await fetch(url, options);
        let main = await data.json();
        return await main;
    }

    async getUsers() {
        let method = 'get_users/';
        let url = (this.baseUrl + method);
        console.log(url);
         let options = {
            method: 'GET',
            headers: this.headers
        };

        let data = await fetch(url, options);
        let main = await data.json();
        return await main;
    }
}

// STATUS_ID
// Passed - 1
// Blocked - 2
// Untested - 3
// Retested - 4
// Failed - 5

// TYPE_ID
// automated = 3