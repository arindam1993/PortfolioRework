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
	var startState = new State(InitState);
	var runningState = new State(RunningState);
	mainStateMachine = new StateMachine(startState);

	//testing state machine
	setTimeout(function(){
		mainStateMachine.switchState(runningState);
	},5000);

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
	
	InputManager.init();


	// // Insert some text
	// var greeting = document.createElement( 'div' )
	// greeting.textContent = 'Hello World!'
	// greeting.style.width = '400px'
	// greeting.style.height = '400px'
	// greeting.style.fontSize = '120px'
	// greeting.style.fontFamily = 'Helvetica'
	// greeting.style.textAlign = 'center'
	// greeting.style.backfaceVisibility = 'hidden'
	// var greetingObject = new THREE.CSS3DObject(greeting)
	// greetingObject.scale.set( 0.00125, 0.00125, 0.00125 )
	// greetingObject.position.z = 0.25
	// GLOBAL.three.scene.add(greetingObject)
	// Orbit the camera

	//Load project data
	$.getJSON('../data/projects.json', function(data){
		// for(var id in data){
		// 	var projectInfo = data[id];
		// 	var template = $('#main-template').html();
		// 	Mustache.parse(template);
		// 	var rendered = Mustache.render(template, projectInfo);



		// }

		data.forEach(function(project){
			console.log(project);
			//Get the mustache template
			var template = $('#main-template').html();
			//Parse for performance
			Mustache.parse(template);
			//Get innerHTML for the template
			var innerHTML = Mustache.render(template, project);
			var appendedDiv = new SimpleCard(innerHTML);

		});
	});



	//Use mustache to create project card


	GLOBAL.three.on('update', function () {
	  var t = GLOBAL.three.Time.now;

	  // console.log("Hor"+InputManager.horizontalAxis);
	  // console.log("Ver"+InputManager.verticalAxis);
	  mainStateMachine.execute();
	  MovementController.update(GLOBAL.three.camera, GLOBAL.three.Time.delta);
	});
}