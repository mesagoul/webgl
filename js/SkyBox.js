var SkyBox =(function(){

	var _skybox;

	var that = {

		init: function(spec){

		    var materials = [];
            // Load cube texture
            var urlPrefix = "assets/skybox/";
            var urls = [ "right.png" ,  "left.png" , "top.png" , "bottom.png" , "back.png" , "front.png" ];

		    for(var i = 0 ; i < 6 ; i++){
		        var textureUrl = urlPrefix + urls[i];
		        var texture = new THREE.TextureLoader(spec.loadingManager).load(textureUrl);
		        materials.push(
		            new THREE.MeshBasicMaterial({
                        map: texture,
                        side: THREE.DoubleSide,
                        fog: false
                    })
                )
            }

            _skybox = new THREE.Mesh(new THREE.CubeGeometry(200, 200, 200), materials);

  		}, //end init()

		get_sceneObjects: function(){
			return [_skybox];
		},

        update_cinematics: function(threeCenter) {
            _skybox.position.copy(threeCenter);
    	}

	}; //end that
	return that;
})();