/*
* A state-machine framework built in JavaScript
*/



//Use Object Literal notation of the following form
//Example:
// var sampleState = {
// 	name: "Sample State",
// 	enter: function(){
// 		...
// 	},
// 	update: function(){
// 		...
// 	},
// 	exit: function(){
//		...		
// 	}
// }


//State machine
function StateMachine(startState){
	this.currentState = startState;
	this.currentState.enter();
}

StateMachine.prototype.execute = function(){
	this.currentState.update();
}

StateMachine.prototype.switchState = function(targetState){
	console.log("Switching: "+this.currentState.name+"  TO  "+targetState.name);
	this.currentState.exit();
	this.currentState = targetState;
	this.currentState.enter();

}