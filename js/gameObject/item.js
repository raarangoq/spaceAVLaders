
function addItem(x, y, type){

    var item;
    
    item = game.add.sprite(x, y, type);
    
        

    game.physics.enable(item, Phaser.Physics.ARCADE);
    item.body.colliderWorldBounds = true;

    item.type = type;

    game.physics.arcade.moveToXY(item, x, y+20, 120);

    item.sound = game.add.audio('item');

    item.takeItem = takeItem;

    return item;
}


function takeItem(){
    

    this.sound.play();

    if (this.type == "velocity" || this.type == "machineGun" || this.type == "torpedo")
        gui.changeAbility(true, this.type);

    player.activateAbility(this.type);
	
	this.destroy();
}