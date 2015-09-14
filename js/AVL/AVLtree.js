
function AVLTree(){
	this.root = null;


	this.insert = insert;
	this.insertToTree = insertToTree;
	this.rotateWithLeftChild = rotateWithLeftChild;
	this.rotateWithRightChild = rotateWithRightChild;
	this.doubleWithLeftChild = doubleWithLeftChild;
	this.doubleWithRightChild = doubleWithRightChild;


	this.borrar = borrar;
	this.borrarDelArbol = borrarDelArbol;
	this.encontrarMaximo = encontrarMaximo;
	this.ajuste = ajuste;



	this.imprimir = imprimir;
	this.imprimirXAltura = imprimirXAltura;
}

function insert( alien ){
	this.root = this.insertToTree(alien, this.root);
}

function insertToTree(alien, t){
	if( t == null )
		t = new AVLNode(alien, null, null);
	else if( alien.id < t.alien.id ){
		t.leftNode = this.insertToTree(alien, t.leftNode);
		if( height(t.leftNode) - height(t.rightNode) == 2 ){
			if( alien.id < t.leftNode.alien.id)
				t = this.rotateWithLeftChild( t );
			else
				t = this.doubleWithLeftChild( t );
		}
	}
	else if( alien.id > t.alien.id ){
		t.rightNode = this.insertToTree( alien, t.rightNode);
		if( height(t.rightNode) - height(t.leftNode) == 2 ){
			if( alien.id > t.rightNode.alien.id )
				t = this.rotateWithRightChild( t );
			else 
				t = this.doubleWithRightChild( t );
		}
	}
	else
		; // Elemento duplicado, no hacer nada

	t.heightNode = Math.max( 
		height(t.leftNode),
		height(t.rightNode) 
		) + 1;

	return t;
}

function rotateWithLeftChild( k2 ){
	var k1 = k2;
	k2.leftNode = k1.rightNode;
	k1.rightNode = k2;
	k2.heightNode = Math.max( height(k2.leftNode), height(k2.rightNode) ) + 1;
	k1.heightNode = Math.max( height(k1.leftNode), k2.heightNode ) + 1;

	return k1;
}

function rotateWithRightChild( k1 ){
	var k2 = k1.rightNode;
	k1.rightNode = k2.leftNode;
	k2.leftNode = k1;
	k1.heightNode = Math.max( height(k1.leftNode), height(k1.rightNode) ) + 1;
	k2.heightNode = Math.max( height(k2.rightNode), k1.heightNode ) + 1;

	return k2;
}

function doubleWithLeftChild( k3 ){
	k3.leftNode = this.rotateWithRightChild( k3.leftNode );
	return rotateWithLeftChild( k3 );
}

function doubleWithRightChild( k1 ){
	k1.rightNode = this.rotateWithLeftChild( k1.leftNode );
	return rotateWithRightChild( k1 );
}

function height( t ){
	if( t==null )
		return -1;
	else
		return t.heightNode;
}



function borrar(alien){
	this.root = this.borrarDelArbol(this.root, alien);
}

function borrarDelArbol(node, alien){
	if( node.alien.id == alien.id ){
		if(node.leftNode==null && node.rightNode == null ){
			node = null;
			return node;
		}
		if(node.rightNode==null){
			node = node.leftNode;
			return node;
		}
		if(node.leftNode==null){
			node = node.rightNode;
			return node;
		}

		node.alien = this.encontrarMaximo(node.leftNode);
		node = this.ajuste(node, node.leftNode, node);
		return node;
	}

	if(alien.id > node.alien.id){
		node.rightNode = this.borrarDelArbol(node.rightNode, alien);


		if( height(node.leftNode) - height(node.rightNode) == 2){
			if( height(node.leftNode.leftNode) >= height(node.leftNode.rightNode) )
				node = this.rotateWithLeftChild( node );
			else
				node = this.doubleWithLeftChild( node );
		}
		node.heightNode = Math.max( 
		height(node.leftNode),
		height(node.rightNode) 
		) + 1;


		return node;
	}
	else{
		node.leftNode = this.borrarDelArbol(node.leftNode, alien);


		if( height(node.rightNode) - height(node.leftNode) == 2){
			if( height(node.rightNode.rightNode) >= height(node.rightNode.leftNode) )
				node = this.rotateWithRightChild( node );
			else
				node = this.doubleWithRightChild( node );
		}
		node.heightNode = Math.max( 
		height(node.leftNode),
		height(node.rightNode) 
		) + 1;


		return node;
	}
}

function encontrarMaximo(node){
	if( node.rightNode == null )
		return node.alien;
	return this.encontrarMaximo(node.rightNode);
}

function ajuste(padre, hijo, ances){
	if(hijo.rightNode == null){
		if(padre.alien.id == ances.alien.id){
			padre.leftNode = hijo.leftNode;
			return padre;
		}
		padre.rightNode = hijo.leftNode;
		return padre;
	}

	hijo = this.ajuste(hijo, hijo.rightNode, ances);

	if(padre.alien.id == ances.alien.id)
		padre.leftNode = hijo;
	else
		padre.rightNode = hijo;
	return padre;
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