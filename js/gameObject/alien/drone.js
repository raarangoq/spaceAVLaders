

function addDrone(x, y, i){
    var drone = addAlien(x, y, i, "drone");
    drone.firingTimer = 0;
    drone.health = 50;

    drone.destroyAlien = destroyDrone;

    addDroneAnimations(drone);
    return drone;
}

function addDroneAnimations(drone){
    drone.animations.add('fly', [ 0, 1, 2, 3 ], 10, true);
    drone.play('fly');
}

function destroyDrone(){
	//  Increase the score
	gui.upScore(25);

	this.destroy();
}
