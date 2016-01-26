
function GUI(){

	// Objetos y Atributos
	// Pause
	this.pause_menu = addPause();
	

	// Vidas
	this.lives_bar = addLivesBar();
	this.items_bar = new itemsBar();
	addScore();

	

	// Metodos
	
	this.pauseGame = pauseGame;

	this.upScore = upScore;

	
	this.changeAbility = changeAbility;

	this.updateGui = updateGui;


	this.pauseGame();


	this.pauseKey = keyboard.addKey(Phaser.Keyboard.ENTER);
    this.pauseKey.onDown.add(this.pauseGame, this);
}

function updateGui(){
	this.items_bar.updateItemsBar();
	this.lives_bar.updateLivesBar();
}


// true for take a new item, false when the player uses a item or lose the item
function changeAbility(take, type){
	if (take)
		this.items_bar.setItemsBarAbility(type);
	else
		this.items_bar.useItemsBarAbility(type);
}
