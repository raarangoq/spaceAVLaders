
function GUI(){

	// Objetos y Atributos
	
	// Pause
	this.pause_menu = addPause();

	// Vidas
	this.lives_bar = addLivesBar();
	addScore();


	// Metodos
	
	this.pauseGame = pauseGame;
	this.upScore = upScore;


	this.pauseGame();


	this.pauseKey = keyboard.addKey(Phaser.Keyboard.ENTER);
    this.pauseKey.onDown.add(this.pauseGame, this);
}
