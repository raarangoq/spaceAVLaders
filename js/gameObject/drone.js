

function addDrone(x, y, i){

    var drone = addAlien(x, y, i);
    drone.anchor.setTo(0.5, 0.5);

    drone.firingTimer = 0;

    drone.health = 50;

    addDroneAnimations(drone);

    return drone;
}

function addDroneAnimations(drone){
    drone.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
    drone.play('fly');
}
