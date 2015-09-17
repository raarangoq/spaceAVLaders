


function addDrone(x, y, i){

    var drone = game.add.sprite(x, y, 'invader');
    drone.anchor.setTo(0.5, 0.5);
    game.physics.enable(drone, Phaser.Physics.ARCADE);
    drone.body.colliderWorldBounds = true;

    drone.firingTimer = 0;
    drone.id = i;

    drone.health = 100;
    drone.speed = 100;


    drone.x_target = 0;
    drone.y_target = 0;

    drone.updateAlien = updateAlien;
    drone.setTarget = setTarget;
    drone.alienTakeDamage = alienTakeDamage;

    addDroneAnimations(drone);

    return drone;
}

function addDroneAnimations(drone){
    drone.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
    drone.play('fly');
}

function updateAlien(){
    if( game.physics.arcade.distanceToXY(this,this.x_target, this.y_target) < 5 ) 
        this.body.velocity.setTo(0,0);

}

function setTarget(x, y){
    this.x_target = x;
    this.y_target = y;

    game.physics.arcade.moveToXY(this, x, y, this.speed);
}   

function alienTakeDamage(damage){
    this.health -= damage;
}






