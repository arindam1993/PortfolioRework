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
function State(stateObject){
	this.enterState = stateObject.enter
	this.updateState = stateObject.update;
	this.exitState = stateObject.exit;
	this.stateName = stateObject.name;
}




//State machine
function StateMachine(startState){
	this.currentState = startState;
	this.currentState.enterState();
}

StateMachine.prototype.execute = function(){
	this.currentState.updateState();
}

StateMachine.prototype.switchState = function(targetState){
	console.log("Switching: "+this.currentState.stateName+"  TO  "+targetState.stateName);
	this.currentState.exitState();
	this.currentState = targetState;
	this.currentState.enterState();

}