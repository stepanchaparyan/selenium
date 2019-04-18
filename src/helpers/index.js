const fetch = require('node-fetch');
const base64 = require('base-64');
const jsonpath = require('jsonpath');
const path = require('path');

module.exports = class TestRailAPIs {
	constructor (host, username, password) {	
	this.host = `https://${host}.testrail.io//index.php?/api/v2/`;
		this.headers = {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: 'Basic ' + base64.encode(username + ':' + password)
		};
	}

	async myFetch (url, options, message = '') {
		let data = await fetch(url, options);
		await this.handleErrors(data, message);
		let main = await data.json();
		return main;
	}
	handleErrors (response, message) {
		if (!response.ok) {
			if (response.statusText === 'Not Found') {
				throw Error('Provided host name is wrong');
			} else if (response.statusText === 'Unauthorized') {
				throw Error('Provided login or password is wrong');
			} else if (response.statusText === 'Bad Request') {
				throw Error(message);
			} else {
				throw Error(response.statusText);
			}
		}
		return response;
	}

	// Returns an existing test case
	async getCase (caseId) {
		const method = 'get_case/';
		const pathname = path.join(`${method}`, `${caseId}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided case id is not valid');
		return await data;
	}
	// Returns a list of test cases for a project
	async getAllCases (projectId) {
		const method = 'get_cases/';
		const pathname = path.join(`${method}`, `${projectId}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided projectId is not valid');
		return await data;
	}
	// Returns a list of test cases IDs for a project and case type
	async getCasesIDsByType (projectId, typeId) {
		const method = 'get_cases/';
		const suiteId = '&suite_id=1&type_id=';
		const pathname = path.join(`${method}`, `${projectId}`, `${suiteId}`);
		const url = this.host + pathname + typeId;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided project ID or type ID is not valid');
		const IDs = jsonpath.query(data, '$..id');
		return await IDs;
	}
	// Creates a new test case
	// Please provide sectionID(required), title(not required), prioretyID(not required), typeID (not required)
	async addCase (sectionID, title = 'AutoCreatedTest', prioretyID = 2, typeID = 7) {
		const method = 'add_case/';
		const pathname = path.join(`${method}`, `${sectionID}`);
		const url = this.host + pathname;
		const body = {
			title: title,
			type_id: typeID,
			priority_id: prioretyID
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided test ID or status Id is not valid');
		return await data;
	}
	// Updates an existing test case (partial updates are supported, you can update only title, priority and type)
	async updateCase (caseID, title = 'AutoCreatedTest', priorityID = 2, typeID = 7) {
		const method = 'update_case/';
		const pathname = path.join(`${method}`, `${caseID}`);
		const url = this.host + pathname;
		const body = {
			title: title,
			type_id: typeID,
			priority_id: priorityID
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided test ID or status Id is not valid');
		return await data;
	}
	// Deletes an existing test case
	async deleteCase (caseID) {
		const method = 'delete_case/';
		const pathname = path.join(`${method}`, `${caseID}`);
		const url = this.host + pathname;
		const options = {
			method: 'POST',
			headers: this.headers
		};

		let data = await fetch(url, options);
		await this.handleErrors(data, 'Provided case ID is not valid');
		return await data.status;
	}

	// Returns a list of available test case custom fields.
	async getCaseFields () {
		const method = 'get_case_fields/';
		const url = this.host + method;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options);
		return await data;
	}

	// Returns a list of available case types.
	async getCaseTypes () {
		const method = 'get_case_types/';
		const url = this.host + method;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options);
		return await data;
	}

	// Returns a list of available configurations, grouped by configuration groups
	async getMilestone (milestoneID) {
		const method = 'get_milestone/';
		const pathname = path.join(`${method}`, `${milestoneID}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided milestoneID is not valid');
		return await data;
	}
	// Returns the list of milestones for a project.
	async getMilestones (projectID) {
		const method = 'get_milestones/';
		const pathname = path.join(`${method}`, `${projectID}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided project ID is not valid');
		return await data;
	}
	// Creates a new milestone
	// The following POST fields are supported - milestone's name and description
	async addMilestone (project_id, name = 'Milestone', description = '') {
		const method = 'add_milestone/';
		const pathname = path.join(`${method}`, `${project_id}`);
		const url = this.host + pathname;
		const body = {
			'name': name,
			'description': description
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided project ID is not valid');
		return await data;
	}
	// Updates an existing milestone (partial updates are supported, you can submit and update only - is_completed field)
	async updateMilestone (milestoneID, isCompleted) {
		const method = 'update_milestone/';
		const pathname = path.join(`${method}`, `${milestoneID}`);
		const url = this.host + pathname;
		const body = {
			'is_completed': isCompleted
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided milestone ID is not valid');
		return await data;
	}
	// Deletes an existing milestone
	async deleteMilestone (milestoneID) {
		const method = 'delete_milestone/';
		const pathname = path.join(`${method}`, `${milestoneID}`);
		const url = this.host + pathname;
		const options = {
			method: 'POST',
			headers: this.headers
		};

		let data = await fetch(url, options);
		await this.handleErrors(data, 'Provided milestone ID is not valid');
		return await data.status;
	}

	// Returns an existing test plan
	async getPlan (planID) {
		const method = 'get_plan/';
		const pathname = path.join(`${method}`, `${planID}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided plan ID is not valid');
		return await data;
	}
	// Returns a list of test plans for a project
	async getPlans (projectID) {
		const method = 'get_plans/';
		const pathname = path.join(`${method}`, `${projectID}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided project ID is not valid');
		return await data;
	}
	// Creates a new test plan
	// The following POST fields are supported - plan's name and description
	async addPlan (project_id, name = 'Plan', description = '') {
		const method = 'add_plan/';
		const pathname = path.join(`${method}`, `${project_id}`);
		const url = this.host + pathname;
		const body = {
			'name': name,
			'description': description
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided project ID is not valid');
		return await data;
	}


	// Returns a list of test results for a test run (except untested tests)
	async getResultsForRun (runId) {
		const method = 'get_results_for_run/';
		const pathname = path.join(`${method}`, `${runId}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided run ID is not valid');
		return await data;
	}

	//Returns a status of case
	async getResultForCase (runId, caseId) {
		const method = 'get_results_for_case/';
		const pathname = path.join(`${method}`, `${runId}/`, `${caseId}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided run ID or case ID is not valid');
		if (data.length === 0) {
			return undefined;
		}
		return await data[0].status_id;
	}

	// Returns run name with time
	async getRunName () {
		const date = new Date();
		let month, day, minute;
		const getDay = date.getDate();
		getDay < 10 ? (day = `0${getDay}`) : (day = getDay);
		switch (new Date().getMonth()) {
			case 0:
				month = 'Jan';
				break;
			case 1:
				month = 'Feb';
				break;
			case 2:
				month = 'Mar';
				break;
			case 3:
				month = 'Apr';
				break;
			case 4:
				month = 'May';
				break;
			case 5:
				month = 'Jun';
				break;
			case 6:
				month = 'Jul';
				break;
			case 7:
				month = 'Aug';
				break;
			case 8:
				month = 'Sep';
				break;
			case 9:
				month = 'Oct';
				break;
			case 10:
				month = 'Nov';
				break;
			case 11:
				month = 'Dec';
				break;
			default:
				month = 'month';
		}
		const year = date.getFullYear();
		const hour = date.getHours();
		let getMinute = date.getMinutes();
		getMinute < 10 ? (minute = `0${getMinute}`) : (minute = getMinute);
		const fullTime = month + ' ' + day + ' ' + year + ', ' + hour + ':' + minute;
		const runName = `Automated test run - ${fullTime}`;
		return await runName;
	}

	// Creates a new test run and returns run ID
	async addRun (projectId, suiteId = 1) {
		const method = 'add_run/';
		const pathname = path.join(`${method}`, `${projectId}`);
		const url = this.host + pathname;
		const body = {
			name: await this.getRunName(),
			suite_id: suiteId,
			include_all: true
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided project ID is not valid');
		return await data.id;
	}

	// Creates a new test run for specific case type and returns run ID
	async addRunWithType (project_id, type_id, suite_id = 1) {
		const method = 'add_run/';
		const pathname = path.join(`${method}`, `${project_id}`);
		const url = this.host + pathname;
		const body = {
			name: await this.getRunName(),
			suite_id: suite_id,
			include_all: false,
			case_ids: await this.getCasesIDsByType(project_id, type_id)
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided project ID or type ID is not valid');
		return await data.id;
	}

	// Adds a new test result or comment for a test
	async addResult (testId, statusId, comment = '') {
		const method = 'add_result/';
		const pathname = path.join(`${method}`, `${testId}`);
		const url = this.host + pathname;
		const body = {
			status_id: statusId,
			comment: comment
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided test ID or status Id is not valid');
		return await data;
	}

	// Adds a new test result or comment for a case
	async addResultForCase (runId, caseId, status_id, comment = '') {
		const method = 'add_result_for_case/';
		const pathname = path.join(`${method}`, `${runId}/`, `${caseId}`);
		const url = this.host + pathname;
		const body = {
			status_id: status_id,
			comment: comment
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided run ID, case ID or status ID is not valid');
		return await data;
	}

	// Returns a list of available templates (requires TestRail 5.2 or later)
	async getTemplates (projectId) {
		const method = 'get_templates/';
		const pathname = path.join(`${method}`, `${projectId}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided project id is not valid');
		return await data;
	}

	// Return all tests for a test run
	async getTests (runId) {
		const method = 'get_tests/';
		const pathname = path.join(`${method}`, `${runId}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided run number is not valid');
		return await data;
	}

	// Returns a list of users
	async getUsers () {
		const method = 'get_users/';
		const url = this.host + method;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options);
		return await data;
	}
};
