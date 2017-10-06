var Sword = (function(){

    var _mesh;
    var _myShaderMaterial;
    var _action;
    var _isAnimated = false;
    var _speed = {
        speed: 0.016
    };

    var that = {

        init: function(spec){


            var loader = new THREE.JSONLoader(spec.loadingManager);

            loader.load( "assets/models3D/knight.js", function ( geometry, materials ) {

                // Params du SwordMan
                _mesh = new THREE.SkinnedMesh( geometry, materials );
                _mesh.name = "Knight Mesh";

                _mesh.castShadow = true;
                _mesh.receiveShadow = false;
                _mesh.onPick=that.onPick;

                for(var i = 0 ; i < materials.length ; i++){
                    var m = materials[i];
                    m.skinning = true; // active animation
                    m.morphTargets = true; // active animation
                } // Pour tous les materiaux on active les animations (pour demo)


                // Shaders Fragment
                var fragmentShaderSource = THREE.ShaderLib.phong.fragmentShader;
                fragmentShaderSource = fragmentShaderSource.replace("void", "uniform float ttime; varying float vPy; void");
                    var fragmentEndShader = "float dy=max(0., cos(0.25*vPy));\n\
                                gl_FragColor=mix(gl_FragColor, vec4(0.,0.,0.,0.), dy);\
                                }\n";

                fragmentShaderSource = fragmentShaderSource.replace("}\n", fragmentEndShader);

                // Shaders Verte
                var vertexShaderSource = THREE.ShaderLib.phong.vertexShader;
                vertexShaderSource = vertexShaderSource.replace("void", "varying float vPy; void");
                var vertexEndShader = "float py=worldPosition.y;\n\
                                vPy=py;\
                                }\n";

                vertexShaderSource = vertexShaderSource.replace("}\n", vertexEndShader);

                // Textures
                var _myShaderMaterial = new THREE.ShaderMaterial({ // Textures
                    uniforms: THREE.ShaderLib.phong.uniforms,
                    vertexShader: vertexShaderSource,
                    fragmentShader: fragmentShaderSource,
                    morphTargets: true,
                    skinning: true,
                    lights: true,
                    transparent: true
                });
                _myShaderMaterial.skinning = true;
                _myShaderMaterial.morphTargets = true;
                materials[0] = _myShaderMaterial;

                // Parametrage animation
                that.mixer = new THREE.AnimationMixer(_mesh); // Objet d'animation

                bonesClip = geometry.animations[0];// Crée points à partir d'une animation JSON

                _action = that.mixer.clipAction(bonesClip, _mesh); // Crée l'action à partir des points
                _action.loop = THREE.LoopOnce; // Pas de boucle
                _action.clampWhenFinished = true; // Fige SwordMan a la fin de l'animation

                _action.play();
                _action.paused = true; // Mettre en pause l'anim

                that.mixer.addEventListener("finished", that.onFinished);

                Main.add_toggable(_speed, 'speed', 'speedValSettings'); // pour modifier en temps reel le speed

                that.animate();

            } );
        }, //end init()

        onPick: function(){
            if(!_isAnimated){
                _action.reset(); // Pour éviter qu'il ne se lance qu'une seul fois
            }
            _isAnimated = true;
        },

        onFinished: function(){
            _isAnimated = false;
        },

        get_sceneObjects: function(){
            return [_mesh];
        },

        animate: function(){
            that.mixer.update(_speed.speed);
            requestAnimationFrame(that.animate); // Yes
        }

    }; //end that

    return that;

})();