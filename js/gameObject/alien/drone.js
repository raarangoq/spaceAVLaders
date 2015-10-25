

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
    this.hit_sound.play();

    if (items == null || items.body == null)
        if ( Math.random() <= 0.1)
            items = addItem(this.body.x, this.body.y, "torpedo");
        else if (Math.random() <= 0.1)
            items = addItem(this.body.x, this.body.y, "machineGun");
        else if (Math.random() <= 0.1)
            items = addItem(this.body.x, this.body.y, "velocity");

	this.destroy();

    
}
