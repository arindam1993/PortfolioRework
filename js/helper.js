
 function SimpleCard(innerHTML){
	this.mainDiv = document.createElement('div');
	this.mainDiv.style.position = 'absolute';
	this.mainDiv.style.width = '300px';
	this.mainDiv.style.height = '200px';
	this.mainDiv.innerHTML = innerHTML;

	// $('body').append(this.mainDiv);
	//create object3d
	this.mainObject3d = new THREE.CSS3DObject(this.mainDiv);
	GLOBAL.three.scene.add(this.mainObject3d);
	this.mainObject3d.scale.set(0.001, 0.001, 0.001);


}


var MovementController = {
	moveSpeed: 60.0,
	lookSpeed: 0.3,
	update: function(camera, deltaTime){
		//Movement Vectors
		var forwardVector = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).normalize();
		var rightVector = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion).normalize();

		//Move forward
		if(InputManager.verticalAxis > 0){
			camera.position.add(forwardVector.multiplyScalar(this.moveSpeed * deltaTime));
		}

		//Move backward
		if(InputManager.verticalAxis < 0){
			camera.position.add(forwardVector.multiplyScalar(this.moveSpeed * -1 * deltaTime));
		}

		//Strafe Right
		if(InputManager.horizontalAxis > 0){
			camera.position.add(rightVector.multiplyScalar(this.moveSpeed * deltaTime));
		}

		//Strafe left
		if(InputManager.horizontalAxis <  0){
			camera.position.add(rightVector.multiplyScalar(this.moveSpeed * -1 * deltaTime));
		}

		//Rotate about z
		if(Math.abs(InputManager.rotationAxisX) > 0){
			camera.rotateOnAxis(new THREE.Vector3(0,-1,0), InputManager.rotationAxisX*this.lookSpeed*deltaTime);
		}
	}
};




