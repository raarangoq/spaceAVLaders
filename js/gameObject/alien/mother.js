

function addMother(x, y, i){
    var mother = addAlien(x, y, i, "leader");
    mother.firingTimer = 0;
    mother.health = 100;
    mother.timeToSpamChild = 10000;
    mother.lastSpam = game.time.time;

    mother.destroyAlien = destroyMother;
    mother.updateAlien = updateMother;

    addMotherAnimations(mother);
    return mother;
}

function addMotherAnimations(worm){
    worm.animations.add('fly', [ 0 ], 20, true);
    worm.play('fly');
}

function updateMother(){
	if( game.physics.arcade.distanceToXY(this,this.x_target, this.y_target) < 5 ) 
        this.body.velocity.setTo(0,0);

    if( !game.physics.arcade.isPaused && game.time.time - this.lastSpam > this.timeToSpamChild ){
    	tree.createAlien(this.body.x, this.body.y + 20, "drone");
    	tree.reorderTree();
    	this.lastSpam = game.time.time;
    }

}

function destroyMother(){
	//  Increase the score
	gui.upScore(100);

	for (var i=0; i<3; i++){
		tree.createAlien(this.body.x, this.body.y, "drone");
	}
	tree.reorderTree();

	this.destroy();
}
