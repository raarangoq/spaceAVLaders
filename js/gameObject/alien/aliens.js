
function addAlien(x, y, i, type){

    var alien;
    alien = game.add.sprite(x, y, type);
    game.physics.enable(alien, Phaser.Physics.ARCADE);

    var textId = game.add.text(10, -10, i, { fontSize: '14px', fill: '#ffffff'});
    var child = alien.addChild(textId);
    game.physics.enable(child, Phaser.Physics.ARCADE);

    alien.type = type;
    alien.firingTimer = 0;
    alien.id = i;

    alien.health = 100;
    alien.speed = 100;

    alien.x_target = 400;
    alien.y_target = 300;

    alien.hit_sound = game.add.audio('rugido');

    alien.updateAlien = updateAlien;
    alien.setTarget = setTarget;
    alien.alienTakeDamage = alienTakeDamage;

    return alien;
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






