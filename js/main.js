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
		
		//Initialize input manager
		InputManager.init();

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
	},
	update: function(){
		console.log("UPDATE INIT");
	},
	exit: function(){
		console.log("EXIT INIT");
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


var PausedStateState = {
	name: "Paused",
	enter: function(){

	},
	update: function(){

	},
	exit: function(){

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

