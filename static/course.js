var pairs = {pairs:[]};
var publicURL = "http://localhost" + ":3000/api/";
var app = angular.module('myApp', ['ngRoute']);



app.controller('myCon', function($scope, $http){
	$scope.curTable = '';
	$scope.showAllCourses = function(){
		$http.get(publicURL + 'courses').then(function(response){
			$scope.curTable = 'allcourses';
			$scope.allcourses = response.data;
		});
	};

	$scope.getCodesByGivenSubject = function(){
		$http.get(publicURL + 'courses/' + $scope.code_subject).then(function mySuccess(response){
			$scope.curTable = 'codes_table';
			$scope.codesbysubject = response.data;
		},function myError(response){
			alert(response.data.msg);
		});
	};

	$scope.getTimeEntry = function(){
		let req = publicURL + 'courses/' + $scope.time_subject + "/" + $scope.time_course;
		if ($scope.time_component) req += "/" + $scope.time_component;
		$http.get(req)
		.then(function mySuccess(response){
			$scope.curTable = 'time_table';
			$scope.timetable = response.data;
		},function myError(response){
			alert(response.data.msg);
		});
	};

	$scope.addSchedule = function(){
		let sendData = {schedule_name: $scope.inputschedule};
		$http({
			method: 'POST',
			data: sendData,
			url: publicURL + 'schedule/',
			headers: new Headers({
    			'Content-Type': 'application/json'
  			})
		}).then(function mySuccess(response){
				alert(response.data.msg);
			},function myError(response){
				alert(response.data.msg);
			});
	}

	$scope.addtoList = function(){
		pairs.pairs.push({subject: $scope.pair_subject, catalog_nbr:$scope.pair_course, 
			start_time: $scope.pair_starttime, end_time: $scope.pair_endtime});
		alert("added to list successfully");
	}

	$scope.addtoSchedule = function(){
		let sendData = pairs;
		$http({
			method: 'POST',
			data: sendData,
			url: publicURL + 'schedule/' + $scope.pair_schedule,
			headers: new Headers({
    			'Content-Type': 'application/json'
  			})
		}).then(function mySuccess(response){
				$scope.curTable = 'schedule_detail_table';
				$scope.schedule_detail = response.data;
			},function myError(response){
				alert(response.data.msg);
			});
	}

	$scope.showSchedule = function(){
		$http.get(publicURL + 'schedule/' + $scope.inputschedule).then(function mySuccess(response){
			$scope.curTable = 'schedule_detail_table';
			$scope.schedule_detail = response.data;
		},function myError(response){
			alert(response.data.msg);
		});
	}

});	
//fetch function 6
function getSchedule()
{
	let schedule = document.getElementById('addScheduleInputText').value;
	fetch(publicURL+ 'schedule/' + schedule)
	.then((res) => res.json())
	.then(function(data){
		if (!data.msg)
		{
			showSchedule(data);
		}
		else
		{
			alert(data.msg);
		}
	})
	.catch(error => alert('no code found for this subject'));
}
//function 5 and 6
function showSchedule(data)
{
	let table = document.getElementById('course_table');
	table.innerHTML = '';

	//for creating header of the table
	let courses = data;
	let tr = document.createElement('tr'),
		th1 = document.createElement('th'),
		th2 = document.createElement('th');
	let th1text = document.createTextNode("Subject Code");
	let th2text = document.createTextNode("Course Code");
	th1.appendChild(th1text);
	th2.appendChild(th2text);
	tr.appendChild(th1);
	tr.appendChild(th2);
	table.appendChild(tr);

	//for generating content of the table
	for (i = 0; i < courses.length; i ++)
	{
		tr = document.createElement('tr');
		th1 = document.createElement('th');
		th2 = document.createElement('th');
		let th1text = document.createTextNode(courses[i].subject);
		let th2text = document.createTextNode(courses[i].catalog_nbr);
		th1.appendChild(th1text);
		th2.appendChild(th2text);
		tr.appendChild(th1);
		tr.appendChild(th2);
		table.appendChild(tr);
	}
}

//fetch function 7
function deleteSchedule()
{
	let schedule = document.getElementById('addScheduleInputText').value;
	fetch(publicURL + 'schedule/' + schedule, {
		method: 'DELETE',
	})
	.then((res) => res.json())
	.then(function(data){
		alert(data.msg);
	})
	.catch(error => console.log('error'));
}

//fetch function 8
function getSchedules()
{
	fetch(publicURL+ 'schedule')
	.then((res) => res.json())
	.then(function(data){
		showSchedules(data);
	})
	.catch(error => alert('error'));
}

//function 8
function showSchedules(data)
{
	let table = document.getElementById('course_table');
	table.innerHTML = '';

	//for creating header of the table
	let courses = data;
	let tr = document.createElement('tr'),
		th1 = document.createElement('th'),
		th2 = document.createElement('th');
	let th1text = document.createTextNode("Schedule name");
	let th2text = document.createTextNode("Number of courses in the schedule");
	th1.appendChild(th1text);
	th2.appendChild(th2text);
	tr.appendChild(th1);
	tr.appendChild(th2);
	table.appendChild(tr);

	//for generating content of the table
	for (i = 0; i < courses.length; i ++)
	{
		tr = document.createElement('tr');
		th1 = document.createElement('th');
		th2 = document.createElement('th');
		let th1text = document.createTextNode(courses[i][0]);
		let th2text = document.createTextNode(courses[i][1]);
		th1.appendChild(th1text);
		th2.appendChild(th2text);
		tr.appendChild(th1);
		tr.appendChild(th2);
		table.appendChild(tr);
	}
}

//fetch function 9
function deleteAllSchedules()
{
	fetch(publicURL + '/schedule', {
		method: 'DELETE',
	})
	.then((res) => res.json())
	.then(function(data){
		alert(data.msg);
	})
	.catch(error => console.log('error'));
}