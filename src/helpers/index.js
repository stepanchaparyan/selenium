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
	async getCase (caseID) {
		const method = 'get_case/';
		const pathname = path.join(`${method}`, `${caseID}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided case id is not valid');
		return await data;
	}
	// Returns a list of test cases for a project
	async getAllCases (projectID) {
		const method = 'get_cases/';
		const pathname = path.join(`${method}`, `${projectID}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided projectId is not valid');
		return await data;
	}
	// Returns a list of test cases IDs for a project and case type
	async getCasesIDsByType (projectID, typeID) {
		const method = 'get_cases/';
		const suiteID = '&suite_id=1&type_id=';
		const pathname = path.join(`${method}`, `${projectID}`, `${suiteID}`);
		const url = this.host + pathname + typeID;
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
	async addMilestone (projectID, name = 'Milestone', description = '') {
		const method = 'add_milestone/';
		const pathname = path.join(`${method}`, `${projectID}`);
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
	async addPlan (projectID, name = 'Plan', description = '') {
		const method = 'add_plan/';
		const pathname = path.join(`${method}`, `${projectID}`);
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
	// Adds one or more new test runs to a test plan
	// The following POST fields are supported - planID(required), suiteID(required), name
	async addPlanEntry (planID, suiteID, runName) {
		const method = 'add_plan_entry/';
		const pathname = path.join(`${method}`, `${planID}`);
		const url = this.host + pathname;
		const body = {
			'plan_id': planID,
			'suite_id': suiteID,
			'name': runName
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided plan ID is not valid');
		return await data;
	}
	// Updates an existing test plan
	// Following fields are supported - plan's name and description
	async updatePlan (planID, name, description) {
		const method = 'update_plan/';
		const pathname = path.join(`${method}`, `${planID}`);
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

		const data = await this.myFetch(url, options, 'Provided plan ID is not valid');
		return await data;
	}
	// Closes an existing test plan and archives its test runs & results.
	async closePlan (planID) {
		const method = 'close_plan/';
		const pathname = path.join(`${method}`, `${planID}`);
		const url = this.host + pathname;
		const options = {
			method: 'POST',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided plan ID is not valid');
		return await data;
	}
	// Deletes an existing test plan.
	async deletePlan (planID) {
		const method = 'delete_plan/';
		const pathname = path.join(`${method}`, `${planID}`);
		const url = this.host + pathname;
		const options = {
			method: 'POST',
			headers: this.headers
		};

		const data = await fetch(url, options);
		await this.handleErrors(data, 'Provided plan ID is not valid');
		return await data.status;
	}

	// Returns a list of available configurations, grouped by configuration groups
	async getConfigs (projectID) {
		const method = 'get_configs/';
		const pathname = path.join(`${method}`, `${projectID}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided project ID is not valid');
		return await data;
	}
	// Creates a new configuration group
	async addConfigGroup (projectID, name) {
		const method = 'add_config_group/';
		const pathname = path.join(`${method}`, `${projectID}`);
		const url = this.host + pathname;
		const body = {
			'name': name
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided project ID is not valid');
		return await data;
	}
	// Creates a new configuration
	async addConfig (configGroupID, name) {
		const method = 'add_config/';
		const pathname = path.join(`${method}`, `${configGroupID}`);
		const url = this.host + pathname;
		const body = {
			'name': name
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided project ID is not valid');
		return await data;
	}
	// Updates an existing configuration group
	async updateConfigGroup (configGroupID, name) {
		const method = 'update_config_group/';
		const pathname = path.join(`${method}`, `${configGroupID}`);
		const url = this.host + pathname;
		const body = {
			'name': name
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided configGroup ID is not valid');
		return await data;
	}
	// Updates an existing configuration
	async updateConfig (configID, name) {
		const method = 'update_config/';
		const pathname = path.join(`${method}`, `${configID}`);
		const url = this.host + pathname;
		const body = {
			'name': name
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided config ID is not valid');
		return await data;
	}
	// Deletes an existing configuration group and its configurations
	async deleteConfigGroup (configGroupID) {
		const method = 'delete_config_group/';
		const pathname = path.join(`${method}`, `${configGroupID}`);
		const url = this.host + pathname;
		const options = {
			method: 'POST',
			headers: this.headers
		};

		const data = await fetch(url, options);
		await this.handleErrors(data, 'Provided configGroup ID is not valid');
		return await data.status;
	}
	// Deletes an existing configuration
	async deleteConfig (configID) {
		const method = 'delete_config_group/';
		const pathname = path.join(`${method}`, `${configID}`);
		const url = this.host + pathname;
		const options = {
			method: 'POST',
			headers: this.headers
		};

		const data = await fetch(url, options);
		await this.handleErrors(data, 'Provided config ID is not valid');
		return await data.status;
	}

	// Returns a list of available priorities.
	async getPriorities () {
		const method = 'get_priorities/';
		const url = this.host + method;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Bad Request');
		return await data;
	}

	// Returns an existing project
	async getProject (projectID) {
		const method = 'get_project/';
		const pathname = path.join(`${method}`, `${projectID}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided project ID is not valid');
		return await data;
	}
	// Returns an existing projects
	// The following filters can be applied: 1 to return completed projects only. 0 to return active projects only.
	async getProjects (isCompleted = '') {
		const method = 'get_projects&is_completed=';
		const url = this.host + method + isCompleted;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided data is not valid');
		return await data;
	}
	// Creates a new project (admin status required)
	// The following POST fields are supported: name, announcement, showAnnouncement, suiteMode
	async addProject (name, announcement = '', showAnnouncement = true, suiteMode = 1) {
		const method = 'add_project/';
		const url = this.host + method;
		const body = {
			'name': name,
			'announcement': announcement,
			'show_announcement': showAnnouncement,
			'suite_mode': suiteMode
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided data is not valid');
		return await data;
	}
	// Updates an existing project (admin status required)
	// Only the following updates are supported - is_completed ).
	async updateProject (projectID, isCompleted) {
		const method = 'update_project/';
		const pathname = path.join(`${method}`, `${projectID}`);
		const url = this.host + pathname;
		const body = {
			'is_completed': isCompleted
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided data is not valid');
		return await data;
	}
	// Deletes an existing project (admin status required)
	async deleteProject (projectID) {
		const method = 'delete_project/';
		const pathname = path.join(`${method}`, `${projectID}`);
		const url = this.host + pathname;
		const options = {
			method: 'POST',
			headers: this.headers
		};

		const data = await fetch(url, options);
		await this.handleErrors(data, 'Provided project ID is not valid');
		return await data.status;
	}

	// Returns a list of test results for a test
	async getResults (testID) {
		const method = 'get_results/';
		const pathname = path.join(`${method}`, `${testID}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided test ID is not valid');
		return await data;
	}
	// Returns a list of test results for a test run (except untested tests)
	async getResultsForRun (runID) {
		const method = 'get_results_for_run/';
		const pathname = path.join(`${method}`, `${runID}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided run ID is not valid');
		return await data;
	}
	//Returns a status of case
	async getResultForCase (runID, caseID) {
		const method = 'get_results_for_case/';
		const pathname = path.join(`${method}`, `${runID}/`, `${caseID}`);
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
	// Adds a new test result or comment for a test
	async addResult (testID, statusID, comment = '') {
		const method = 'add_result/';
		const pathname = path.join(`${method}`, `${testID}`);
		const url = this.host + pathname;
		const body = {
			statusID: statusID,
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
	async addResultForCase (runID, caseID, statusID, comment = '') {
		const method = 'add_result_for_case/';
		const pathname = path.join(`${method}`, `${runID}/`, `${caseID}`);
		const url = this.host + pathname;
		const body = {
			status_id: statusID,
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

	// Returns a list of available test result custom fields
	async getResultFields () {
		const method = 'get_result_fields/';
		const url = this.host + method;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided test ID is not valid');
		return await data;
	}

	// Returns an existing test run
	async getRun (runID) {
		const method = 'get_run/';
		const pathname = path.join(`${method}`, `${runID}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided run ID is not valid');
		return await data;
	}
	// Returns a list of test runs for a project. Only returns those test runs that are not part of a test plan
	// The following filters can be applied: 1: 1 to return completed projects only. 0 to return active projects only.
	// The following filters also can be applied: 2: limit, 3: milestoneID, 4:suiteID
	async getRuns (projectID,isCompleted='',limit='',milestoneID='', suiteID='') {
		const method = 'get_runs/';
		const filters = `&is_completed=${isCompleted}`+`&limit=${limit}`+`&milestone_id=${milestoneID}`+`&suite_id=${suiteID}`;
		const pathname = path.join(`${method}`, `${projectID}`);
		const url = this.host + pathname + filters;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided data is not valid');
		return await data;
	}
	// Returns run name with time
	async getRunName () {
		const date = new Date();
		let month, day, minute;
		const getDay = date.getDate();
		getDay < 10 ? (day = `0${getDay}`) : (day = getDay);
		const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		month = months[new Date().getMonth()];
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
	// Updates an existing test run (partial updates are supported: runName and description)
	async updateRun (runID, name, description ) {
		const method = 'update_run/';
		const pathname = path.join(`${method}`, `${runID}`);
		const url = this.host + pathname;
		const body = {
			name: name,
			description: description
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided data is not valid');
		return await data.id;
	}
	// Closes an existing test run and archives its tests & results.
	async closeRun (runID) {
		const method = 'close_run/';
		const pathname = path.join(`${method}`, `${runID}`);
		const url = this.host + pathname;
		const options = {
			method: 'POST',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided run ID is not valid');
		return await data;
	}
	// Deletes an existing test run
	async deleteRun (runID) {
		const method = 'delete_run/';
		const pathname = path.join(`${method}`, `${runID}`);
		const url = this.host + pathname;
		const options = {
			method: 'POST',
			headers: this.headers
		};

		const data = await fetch(url, options);
		await this.handleErrors(data, 'Provided run ID is not valid');
		return await data.status;
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
