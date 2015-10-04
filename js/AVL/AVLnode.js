

var separation = [0, 20, 40, 78, 160];
var limit = [20, 40, 80, 160, 320];
var rootDirection;


function AVLNode(alien, leftAlien, rightAlien){

	this.alien = alien;
	this.leftNode = leftAlien;
	this.rightNode = rightAlien;
	this.heightNode = 0;

	this.x_node = 400;
	this.y_node = 300;

	this.reorderNode = reorderNode;
	this.setRootDirection = setRootDirection;
	this.updateNode = updateNode;
	this.setAlienToDestroy = setAlienToDestroy;
	this.setAlienToDestroyWithTorpedo = setAlienToDestroyWithTorpedo;


	this.drawLine = drawLine;

}

function drawLine(node){
	
	//bmd.ctx.moveTo(node.alien.body.x + 16, node.alien.body.y + 16);
	//bmd.ctx.lineTo(this.alien.body.x + 16, this.alien.body.y + 16);
	
	
	graphics.moveTo(this.alien.body.x + 16, this.alien.body.y + 16);
	graphics.lineTo(node.alien.body.x + 16, node.alien.body.y + 16);
	
	//bmd.refreshBuffer();
}

function updateNode(){

	if( this.leftNode != null ){
		this.drawLine(this.leftNode);
		this.leftNode.updateNode();
	}

	
	this.alien.updateAlien();
	game.physics.arcade.overlap(bullets, this.alien, this.setAlienToDestroy); 
	if ( torpedo != null ){
		game.physics.arcade.overlap(this.alien, torpedo, this.setAlienToDestroyWithTorpedo); 		
	}
		

	if( this.rightNode != null ){
		this.drawLine(this.rightNode);
		this.rightNode.updateNode();
	}
	
} 


function reorderNode(x, y, height){
	if( this.leftNode != null)
		this.leftNode.reorderNode(x - separation[height], y - 40, height - 1);

	this.x_node = x;
	this.y_node = y;
	this.alien.setTarget(x, y);

	if( this.rightNode != null)
		this.rightNode.reorderNode(x + separation[height], y - 40, height - 1);

}

function setAlienToDestroy(alien, bullet){	
	alien.alienTakeDamage(bullets.damage);
	bullet.kill();
	

	if(alien.health <= 0)
		tree.alienToDestroy = alien;	
	
}

function setAlienToDestroyWithTorpedo(alien, torpedo){	

	alien.alienTakeDamage(torpedo.damage);
	torpedo.destroy();
	torpedo = null;

	if(alien.health <= 0)
		tree.alienToDestroy = alien;	
	
}

function setRootDirection(){

	if( game.physics.arcade.distanceToXY(this.alien, this.x_node, this.y_node) < 5 ){
		if(tree.direction == "right"){
			tree.direction = "left";
			this.x_node = 50 + limit[this.heightNode];
		}
		else if(tree.direction == "left"){
			tree.direction = "right";
			this.x_node = 750 - limit[this.heightNode];
		}
		this.y_node = 30 + 40 * this.heightNode;

		this.reorderNode(this.x_node, this.y_node, this.heightNode);

	}

}




