

function itemsBar(){
	this.itemsBar = game.add.sprite(20, 495, 'healthBar');
	
	this.munitionImage = game.add.sprite(30, 500, "arrowItem");
	this.munition = game.add.text(50, 515, player.munition, { font: '16px Arial', fill: '#fff' });

	this.itemImage = [];
	this.itemImage['torpedo'] = game.add.sprite(80, 500, 'torpedo');
	this.itemImage['torpedo'].visible = false;
	this.itemImage['machineGun'] = game.add.sprite(110, 500, 'machineGun');
	this.itemImage['machineGun'].visible = false;
	this.itemImage['velocity'] = game.add.sprite(140, 500, 'velocity');
	this.itemImage['velocity'].visible = false;

	this.timeItem = game.add.text(80, 515, "", { font: '16px Arial', fill: '#fff' })


	this.updateItemsBar = updateItemsBar;
	this.setItemsBarAbility = setItemsBarAbility;
	this.useItemsBarAbility = useItemsBarAbility;
}


function updateItemsBar(){
	this.munition.text = player.munition;
}

function useItemsBarAbility(type){
	this.itemImage[type].visible = false;
}

function setItemsBarAbility(type){
	this.itemImage[type].visible = true;

}