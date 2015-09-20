


function addAlien(x, y, i){

    var alien = game.add.sprite(x, y, 'invader');
    game.physics.enable(alien, Phaser.Physics.ARCADE);
    alien.body.colliderWorldBounds = true;

    alien.firingTimer = 0;
    alien.id = i;

    alien.health = 100;
    alien.speed = 5000;

    alien.x_target = 0;
    alien.y_target = 0;

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

    var distance = this.speed * ( 
        game.physics.arcade.distanceToXY(
            tree.root.alien, 
            tree.root.alien.x_target, 
            tree.root.alien.y_target) / 800);


    game.physics.arcade.moveToXY(this, x, y, null, 3000);
}   

function alienTakeDamage(damage){
    this.health -= damage;
}






