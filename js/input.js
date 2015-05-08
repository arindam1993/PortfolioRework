var InputManager = {
	horizontalAxis: 0.0,
	verticalAxis: 0.0,
	rotationAxisX: 0.0,
	rotationAxisY:0.0,
	init: function(){
		console.log("INITIALIZING INPUT MANAGER");

		//Function which initializes required event handlers on the DOM
		var initHandlers = function(){
			console.log("INITIALIZING INPUT HANDLERS");
			//Bind keyboard event hndlers
			document.addEventListener('keydown', InputManager.onKeyDown, false);
			document.addEventListener('keyup', InputManager.onKeyUp, false);



			//RequestPointer lock if available
			var havePointerLock = 'pointerLockElement' in document 
				|| 'mozPointerLockElement' in document 
				|| 'webkitPointerLockElement' in document;

			//Bind pointer lock event handlers
			document.addEventListener( 'pointerlockchange', InputManager.onPointerLockChange, false );
			document.addEventListener( 'mozpointerlockchange', InputManager.onPointerLockChange, false );
			document.addEventListener( 'webkitpointerlockchange', InputManager.onPointerLockChange, false );
			
			if(havePointerLock){
				var element = document.body;
				element.requestPointerLock = element.requestPointerLock 
					|| element.mozRequestPointerLock 
					|| element.webkitRequestPointerLock;
				// Ask the browser to lock the pointer
				element.requestPointerLock();

			}
		}


		var overlay = document.getElementById('init-splash');
		overlay.addEventListener('click', function(){
			initHandlers();
			overlay.style.display = 'none';
		});
		
	},
	onKeyDown: function(event){
		console.log("key pressed");
		var keyPressed = event.which || event.keyCode;
		//Check if W is pressed
		if(KeyCode.UP(keyPressed)){
			InputManager.verticalAxis = 1.0;
		}

		//Check if S is pressed
		if(KeyCode.DOWN(keyPressed)){
			InputManager.verticalAxis = -1.0;
		}

		//Check if A is pressed
		if(KeyCode.LEFT(keyPressed)){
			InputManager.horizontalAxis = -1.0;
		}

		//Check if D is pressed
		if(KeyCode.RIGHT(keyPressed) ){
			InputManager.horizontalAxis = 1.0;
		}
	},
	onKeyUp: function(event){
		var keyReleased = event.which || event.keyCode;
		//Check if W is released
		if(KeyCode.UP(keyReleased)){
			InputManager.verticalAxis = 0.0;
		}

		//Check if S is released
		if(KeyCode.DOWN(keyReleased)){
			InputManager.verticalAxis = 0.0;
		}

		//Check if A is released
		if(KeyCode.LEFT(keyReleased)){
			InputManager.horizontalAxis = 0.0;
		}

		//Check if D is released
		if(KeyCode.RIGHT(keyReleased) ){
			InputManager.horizontalAxis = 0.0;
		}
	},
	onPointerLockChange: function(event){
		var requestedElement = event.target.activeElement;
		if(	  document.pointerLockElement === requestedElement ||
			  document.mozPointerLockElement === requestedElement ||
			  document.webkitPointerLockElement === requestedElement)
		{
			console.log("POINTER LOCKED");
			document.addEventListener("mousemove", InputManager.onMouseMove, false);
		}
		else{
			console.log("POINTER UNLOCKED");
			document.removeEventListener("mousemove", InputManager.onMouseMove, false);
		}
	},
	onMouseMove: function(event){
	var movementX = event.movementX ||
      event.mozMovementX          ||
      event.webkitMovementX       ||
      0,
  		movementY = event.movementY ||
      event.mozMovementY      ||
      event.webkitMovementY   ||
      0;

      console.log(movementX+","+movementY);

      InputManager.rotationAxisX = movementX;
      InputManager.rotationAxisY = movementY;
	}

};

var KeyCode = {
	UP: function(code) {
		return (code == 87) || (code == 38);
	},
	DOWN: function(code) {
		return (code == 83) || (code == 40);
	},
	LEFT: function(code) {
		return (code == 65) || (code == 37);
	},
	RIGHT: function(code) {
		return (code == 68) || (code == 39);
	}
};
