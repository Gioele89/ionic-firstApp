// this will be the controller for the ENTIRE site
angular.module('mainCtrl',['projectFactory'])

.controller('mainController', function($ionicModal, $scope, Projects, $ionicSideMenuDelegate){

	// vind this to vm (view-model)
	var vm = this;

	// Create and load the Modal
	$ionicModal.fromTemplateUrl('new-task.html', function(modal) {
	    vm.taskModal = modal;
	}, {
	    scope: $scope//,
	    //animation: 'slide-in-up'
	});

	// called when the form is submitted
	vm.createTask = function(task){
		if(!vm.activeProject || !task){
			return;
		}

		vm.activeProject.tasks.push({
			title: task.title
		});
		
		vm.taskModal.hide();

		// save all the projects
		Projects.save(vm.projects);

		task.title = "";
	};

	// Open the new task modal
	vm.newTask = function(){
		vm.taskModal.show();
	};

	// Close the new task modal
	vm.closeNewTask = function(){
		vm.taskModal.hide();
	};

	vm.toggleProjects = function(){
		$ionicSideMenuDelegate.toggleLeft();
	}

	// load or initialize projects
	vm.projects = Projects.all();

	vm.activeProject = vm.projects[Projects.getLastActiveIndex()];

	// A utility function for creating a new project
    // with the given projectTitle
    var createProject = function(projectTitle) {
    	var newProject = Projects.newProject(projectTitle);
    	vm.projects.push(newProject);
    	Projects.save(vm.projects);
    	vm.selectProject(newProject, vm.projects.length-1);
    }

    // Called to create a new project
    vm.newProject = function(){
    	var projectTitle = prompt('Project name');
    	if(projectTitle){
    		createProject(projectTitle);
    	}
    }

    // Called to select the given project
    vm.selectProject = function(project, index){
    	vm.activeProject = project;
    	Projects.setLastActiveIndex(index);
    	$ionicSideMenuDelegate.toggleLeft(false);
    }

});