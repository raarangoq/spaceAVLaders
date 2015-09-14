
function AVLTree(){
	this.root = null;


	this.actualizarAltura = actualizarAltura;
	this.balancear = balancear;
	this.insert = insert;
	this.insertToTree = insertToTree;
	this.getAltura = getAltura;
	this.rotacionDoble = rotacionDoble;
	this.rotacionSimple = rotacionSimple;


	this.imprimir = imprimir;
	this.imprimirXAltura = imprimirXAltura;
}

function insert(alien){
	this.root = this.insertToTree(alien, this.root);
}

function insertToTree( alien, node ){
	if( node == null ){
		node = new AVLNode(alien, null, null);		
	}
	else{
		if( alien.id == node.alien.id )
			return;
		else if( alien.id < node.alien.id )
			node.leftNode = this.insertToTree(alien, node.leftNode);
		else if( alien.id > node.alien.id )
			node.rightNode = this.insertToTree(alien, node.rightNode);

		this.balancear(node);
		this.actualizarAltura(node);
	}

	return node;
}

function actualizarAltura(node){
	if(node != null)
		if ( this.getAltura(node.leftNode) > this.getAltura(node.rightNode) )
			node.heightNode = this.getAltura(node.leftNode) + 1;
		else
			node.heightNode = this.getAltura(node.rightNode) + 1;
}

function balancear(node){
	if(node){
		if( this.getAltura(node.leftNode) - this.getAltura(node.rightNode) == 2 ){
			if( this.getAltura(node.leftNode.leftNode) >= this.getAltura(node.leftNode.rightNode) )
				this.rotacionSimple(-1, node);
			else
				this.rotacionDoble(-1, node);
		}
		else if( this.getAltura(node.rightNode) - this.getAltura(node.leftNode) == 2 ){
			if( this.getAltura(node.rightNode.rightNode) >=  this.getAltura(node.rightNode.leftNode) )
				this.rotacionSimple(1, node);
			else
				this.rotacionDoble(1, node);
		}
	}
}

function getAltura(node){
	if( node == null)
		return -1;
	else
		return node.heightNode;
}


function rotacionDoble( hijoARotar, node ){
	if( hijoARotar == -1){
		this.rotacionSimple(1, node.leftNode);
		this.rotacionSimple(-1, node);
	}
	else{
		this.rotacionSimple(-1, node.leftNode);
		this.rotacionSimple(1, node);
	}
}

function rotacionSimple(direccion, node){
	var t1;

	if(direccion == -1 && node.leftNode){
		t1 = node.leftNode;
		node.leftNode = t1.rightNode;
		t1.rightNode = node;
	}
	else if( node.rightNode ){
		t1 = node.rightNode;
		node.rightNode = t1.leftNode;
		t1.leftNode = node;
	}

	this.actualizarAltura(node);
	this.actualizarAltura(t1);

	node = t1;
}












function imprimir(){
	this.imprimirXAltura( this.root );
}
function imprimirXAltura( nodo ){
	if(nodo != null){
		imprimirXAltura(nodo.rightNode);
		text.text = text.text + " " + (height(this.root) - height(nodo)) + "[" + nodo.alien.id + "]; ";
		imprimirXAltura(nodo.leftNode);
	}
}