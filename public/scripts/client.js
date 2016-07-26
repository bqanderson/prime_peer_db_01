angular.module('restApp', []);

angular.module('restApp').controller('RestController', function($http){
  var vm = this;

  vm.createAssignment = function(){
    console.log('Clicked');

    var sendData = {};

    sendData.assignmentNumber = vm.assignmentNumber;
    sendData.studentName = vm.studentName;
    sendData.score = vm.score;

    $http.post('/assign/createAssignment', sendData).then(function(response){
      console.log(response);
    }, function(response){
      console.log('Fail!');
    })

    vm.getAssignments();
    vm.assignmentNumber = null;
    vm.studentName = null;
    vm.score = null;
  }

  vm.getAssignments = function(){
    $http.get('/assign/getAssignments/id').then(function(response){
      console.log(response.data);
      vm.assignments = response.data;

    }, function(response){
      console.log('Failure is not accepted!', response);
    })

  }

  vm.deleteAssignment = function(assignmentId){
    console.log('Delete clicked', assignmentId);
    // console.log(response.data);
    $http.delete('/assign/deleteAssignment/' + assignmentId).then(function(response){
      console.log(response);
      vm.assignments = response.data;
      vm.getAssignments();

    }, function(response){
      console.log('Failure is not accepted!', response);
    })
  }

  vm.showEditor = function(index){
    var toggle;
    if(vm.assignments[index].clicked){
      toggle = false;
    } else {
      toggle = true;
    }
    for (var i = 0; i < vm.assignments.length; i++) {
      vm.assignments[i].clicked = false;
    }
    vm.assignments[index].clicked = toggle;
    vm.updateAssignmentNumber = vm.assignments[index].assignmentNumber;
  }

  vm.updateAssignment = function(index){

      vm.assignments[index].clicked = false;
      var id = vm.assignments[index]._id;

      var sendData = {};

      sendData.assignmentNumber = vm.updateAssignmentNumber;
      sendData.studentName = vm.updateStudentName;
      sendData.score = vm.updateScore;

    $http.put('/assign/updateAssignment/' + id, sendData).then(function(response){
      console.log(response);
      vm.getAssignments();
      vm.updateAssignmentNumber = null;
      vm.updateStudentName = null;
      vm.updateScore = null;

    }, function(response){
      console.log('Failure is not accepted!', response);
    })
  }

  vm.search = function(name){
    console.log(name);
    $http.get('/assign/getAssignments/name/' + name).then(function(response){
      console.log(response.data);
      vm.assignments = response.data
      vm.searchName = null;

    }, function(response){
      console.log('Failure is not accepted!', response);
    })

  }

  vm.getAssignments();

})
