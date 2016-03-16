function addPausePage0(){
	var page = game.add.text(400, 150, 'Level ' + game.global.level,
		{ font: "24pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 4,
		wordWrap: true, wordWrapWidth: 600, align: 'center'});
	page.anchor.setTo(0.5, 0.5);

	var text = game.add.text(0, 80, 
		'Acaba con la araña Líder usando tu arco y flecha para ir al siguiente nivel.',
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
		wordWrap: true, wordWrapWidth: 600, align: 'center'});
	text.anchor.setTo(0.5, 0.5);
	page.addChild(text);

	var image = game.add.sprite(-300, 170, 'munition');
	page.addChild(image);
	text = game.add.text(-250, 170, 
		'Munición: Al quedarte sin munición, deberás esperar un tiempo para recibir munición extra.', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3, 
		wordWrap: true, wordWrapWidth: 600});
	page.addChild(text);

	page.setAlive = setPageAlive;
	return page;
}


function addPausePage1(){
	var page = game.add.sprite(0, 0, 'input');


	page.setAlive = setPageAlive;

	return page;
}

function addPausePage2(){
	var page = game.add.sprite(100, 130, 'drone');
	page.animations.add('walk', [0, 1, 2, 3], 8, true);
    page.play('walk');
	var text = game.add.text(50, 0, 
		'Zángano: No dispara ningún proyectil, pero son numerosos.', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
		wordWrap: true, wordWrapWidth: 600});
	page.addChild(text);

	var image = game.add.sprite(0, 70, 'leader');
	image.animations.add('walk', [0, 1, 2, 3], 8, true);
    image.play('walk');
	page.addChild(image);
	text = game.add.text(50, 70, 
		'Líder: Rápidamente dispara balas de energía que generan daño leve, mata a esta araña para ir al siguiente nivel.', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3, 
		wordWrap: true, wordWrapWidth: 600});
	page.addChild(text);

	image = game.add.sprite(0, 180, 'mother');
	image.animations.add('walk', [0, 1, 2, 3], 8, true);
    image.play('walk');
	page.addChild(image);
	text = game.add.text(50, 180, 
		'Araña madre: Cada cierto tiempo da a luz a un zángano, si hay muchos de estos zánganos, el Líder disparará mas rápido y hará mas daño.', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
		wordWrap: true, wordWrapWidth: 600});
	page.addChild(text);

	image = game.add.sprite(0, 290, 'worm');
	image.animations.add('walk', [0, 1, 2, 3], 8, true);
    image.play('walk');
	page.addChild(image);
	text = game.add.text(50, 290, 
		'Araña gusano: Cuando lo matas, se convierte en tres zánganos.', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
		wordWrap: true, wordWrapWidth: 600});
	page.addChild(text);

	page.setAlive = setPageAlive;
	return page;
}

function setPageAlive(value){
	if(value){
		this.revive();
	}
	else
		this.kill();
}

function addPausePage3(){
	var page = game.add.sprite(100, 130, 'velocity');
	var text = game.add.text(50, 0, 
		'Velocidad: Te permite moverte mas rápido mientras está activo.', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
		wordWrap: true, wordWrapWidth: 600});
	page.addChild(text);

	var image = game.add.sprite(0, 100, 'machineGun');
	page.addChild(image);
	text = game.add.text(50, 100, 
		'Fuego rápido: Mientras está activo, disparas mas rápido.', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3, 
		wordWrap: true, wordWrapWidth: 600});
	page.addChild(text);

	image = game.add.sprite(0, 200, 'torpedo');
	page.addChild(image);
	text = game.add.text(50, 200, 
		'Flecha de fuego: una flecha de fuego que infringe mucho daño al impactar.', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
		wordWrap: true, wordWrapWidth: 600});
	page.addChild(text);

	image = game.add.sprite(0, 300, 'heart');
	page.addChild(image);
	text = game.add.text(50, 300, 
		'Vida: Dispones de tres vidas.', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
		wordWrap: true, wordWrapWidth: 600});
	page.addChild(text);

	page.setAlive = setPageAlive;
	return page;
}

function addPausePage4(){
	var page = game.add.sprite(50, 130, 'boss');
	page.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 8, true);
    page.play('walk');
	var text = game.add.text(350, 0, 
		'Rey: Araña reina, muy resistente, dispara fuertes proyectiles y genera zánganos cada cierto tiempo.' +
		 '\nDebes destruir sus armas para poder atacarla directamente.', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
		wordWrap: true, wordWrapWidth: 400});
	page.addChild(text);

	var image = game.add.sprite(20, 200, 'leftWeapon');
	image.animations.add('attack', [0, 1, 2, 3, 0], 8, true);
	image.play('attack');
	page.addChild(image);

	text = game.add.text(100, 250, 
		'Arma del rey: Dispara proyectiles de daño medio.', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3, 
		wordWrap: true, wordWrapWidth: 600});
	page.addChild(text);

	page.setAlive = setPageAlive;
	return page;
}