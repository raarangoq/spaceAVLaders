
function addItem(x, y, type){

    var item;
    item = game.add.sprite(x, y, 'item');

    game.physics.enable(item, Phaser.Physics.ARCADE);
    item.body.colliderWorldBounds = true;

    item.type = type;

    game.physics.arcade.moveToXY(item, x, y+20, 120);



    item.takeItem = takeItem;

    return item;
}


function takeItem(){
	player.ability = this.type;
	player.timeForUseItem = game.time.time;
	this.destroy();
}