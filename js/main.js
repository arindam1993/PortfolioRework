/*
*	This file contains the main scene set-up long with the update loop.
*
*/
var GLOBAL = {}

//Application States
var InitState = {
	name: "Init",
	enter: function(){
		console.log("ENTER INIT");

		//Use Threestrap to initialize scene
		GLOBAL.three = THREE.Bootstrap({
		  plugins: ['core', 'cursor'],
		  renderer: {
		    klass: THREE.MultiRenderer,
		    parameters: {
		      renderers: [THREE.WebGLRenderer, THREE.CSS3DRenderer],
		      parameters: [
		        { // WebGLRenderer parameters
		          depth: true,
		          stencil: true,
		          preserveDrawingBuffer: true,
		          antialias: true,
		          alpha: false,
		        },
		        {} // CSS3DRenderer paramters
		      ]
		    }
		  }  
		});
		// Insert a cube
		GLOBAL.mesh = new THREE.Mesh(new THREE.BoxGeometry(50, 50, 50), new THREE.MeshNormalMaterial());
		GLOBAL.three.scene.add(GLOBAL.mesh)
		GLOBAL.mesh.position.set(0, 0, 200)
		GLOBAL.three.camera.lookAt(GLOBAL.mesh.position)
		


		//Load Project Data
		$.getJSON('../data/projects.json', function(data){
			data.forEach(function(project){
				console.log(project);
				//Get the mustache template
				var template = $('#main-template').html();
				//Parse for performance
				Mustache.parse(template);
				//Get innerHTML for the template
				var innerHTML = Mustache.render(template, project);
				//Create the div
				var appendedDiv = new SimpleCard(innerHTML);

			});
		});

		//Initialize UI References
		UIElements.overlay = document.getElementById('init-splash');
		UIElements.pause = document.getElementById('pause-screen');

		//Initialize input manager
		InputManager.init();
	},
	update: function(){
		console.log("UPDATE INIT");
	},
	exit: function(){
		console.log("EXIT INIT");
		UIElements.overlay.style.display = 'none';
	}
}



var RunningState = {
	name: "Running",
	enter: function(){
		console.log("ENTER RUNNING");


	},
	update: function(){
		console.log("UPDATE RUNNING");


		//Accept user input in running state only
		MovementController.update(GLOBAL.three.camera, GLOBAL.three.Time.delta);
	},
	exit: function(){
		console.log("EXIT RUNNING");
	}
}


var PausedState = {
	name: "Paused",
	enter: function(){
		console.log("ENTER PAUSED");

		//Display pause screen
		UIElements.pause.style.display = "block";
		//Listen for click events on the pause screen
		UIElements.pause.addEventListener('click',function(){
			mainStateMachine.switchState(RunningState);
		},false);

	},
	update: function(){
		console.log("UPDATE PAUSED");
	},
	exit: function(){
		console.log("EXIT PAUSED");
		//Hide pause screen
		UIElements.pause.style.display = "none";

		//Remove event listener
		UIElements.pause.removeEventListener('click');

		//Request pointer lock again
		InputManager.lockMousePointer();
	}
}

var mainStateMachine;
window.onload = function(){

	//Initialize application State machine
	mainStateMachine = new StateMachine(InitState);

	GLOBAL.three.on('update', function () {
	  var t = GLOBAL.three.Time.now;

	  mainStateMachine.execute();
	 
	});




}

