var Ground=(function(){

	//private variables
	var _ThreePlaneMesh;

	var that={
		init: function(){

  			var planeGeometry = new THREE.PlaneGeometry(200, 200);
			var planeMaterial = new THREE.MeshPhongMaterial( {
			    color: 0xdddddd,
			    specular: 0x000000,
			    map: new THREE.TextureLoader().load('assets/textures/waa.jpg'),
			    shininess: 30 });
			_ThreePlaneMesh = new THREE.Mesh(planeGeometry, planeMaterial);

		  	planeMaterial.map.wrapS = THREE.RepeatWrapping;
		  	planeMaterial.map.wrapT = THREE.RepeatWrapping;
		  	planeMaterial.map.repeat.set( 200, 200 );

		    _ThreePlaneMesh.position.set(0,0,0); //center of the ground quad
		    _ThreePlaneMesh.rotateX(-Math.PI/2); //set it horizontally because planeGeometry is along X,Y

		    _ThreePlaneMesh.castShadow = false;
		    _ThreePlaneMesh.receiveShadow = true;

		    planeMaterial.map.repeat.x = planeMaterial.map.repeat.y = 20;
  		}, //end init()

		get_sceneObjects: function(){
			return [_ThreePlaneMesh];
		}

	}; //end that
	return that;
})();