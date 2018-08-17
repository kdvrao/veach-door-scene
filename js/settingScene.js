var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60.284, window.innerWidth / window.innerHeight, 10, 2800);
camera.focus = 1000;
camera.updateProjectionMatrix(); 
camera.position.set(-71.39, 71.49, 205.3); //-35, -175, 60 -71.39, 71.49, 205.3
//camera.up = new THREE.Vector3(0, 0, 1); ///////////////////////////////////LOOK AT//////////////////////////////////////
camera.up = new THREE.Vector3(0.0134008, 0.99756, -0.0685184);
camera.lookAt(new THREE.Vector3(-71.1997, 71.4202, 204.321)); //30, 0, 0


var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true; //Shadow
renderer.shadowMapSoft = true; // Shadow
renderer.shadowMap.type = THREE.PCFShadowMap; //Shadow
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', function() {

    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

})

///////////////////////////////////////////////////////////////////////////////////
//                              CONTROLLER                                       //
///////////////////////////////////////////////////////////////////////////////////

controls = new THREE.OrbitControls(camera, renderer.domElement);
//controls.target.set(-71.39, 71.49, 205.3); /////////////// ORIGIN //////////



// new THREE.ObjectLoader().load( 'models/pikachuLighting.json', function ( model ) {
//                 scene.add( model );
//                 mixer = new THREE.AnimationMixer( model );
//                 mixer.clipAction( model.animations[ 0 ] ).play();
//                 //animate();
//             } );

///////////////////////////////////////////////////////////////////////////////////
//                              TWEEN                                            //
///////////////////////////////////////////////////////////////////////////////////


function tweenCamera( targetPosition, targetPosition2,targetPosition3 , duration ) {

    controls.enabled = false;

    var position = new THREE.Vector3().copy( camera.position );

    var tween = new TWEEN.Tween( position )
        .to( targetPosition, duration )
        .easing( TWEEN.Easing.Back.InOut )
        .onUpdate( function () {
            camera.position.copy( position );
            camera.lookAt( controls.target );
        } )
        .onComplete( function () {
            camera.position.copy( targetPosition );
            camera.lookAt( controls.target );
            controls.enabled = true;
        } )
        //.start();

    var tweenTwo = new TWEEN.Tween( position )
    .to( targetPosition2, duration )
    .easing( TWEEN.Easing.Back.InOut )
    .onUpdate( function () {
        camera.position.copy( position );
        camera.lookAt( controls.target );
    } )
    .onComplete( function () {
        camera.position.copy( targetPosition2 );
        camera.lookAt( controls.target );
        controls.enabled = true;
    } )

    var tweenThree = new TWEEN.Tween( position )
    .to( targetPosition3, duration )
    .easing( TWEEN.Easing.Back.InOut )
    .onUpdate( function () {
        camera.position.copy( position );
    } )
    .onComplete( function () {
        camera.position.copy( targetPosition3 );
        camera.lookAt( easterEgg );
        controls.enabled = true;
    } )



    
    

    tween.chain(tweenTwo);
    tweenTwo.chain(tweenThree);
    tween.start();



}


var targetPosition = new THREE.Vector3( -185, 128, 100 );
var targetPosition2 = new THREE.Vector3( 185, 128, 15 );
var targetPosition3 = new THREE.Vector3( 100, 128, -180 );
var easterEgg = new THREE.Vector3( 0, 28, -200 );
var duration = 9000;

function playAnimation(){


tweenCamera( targetPosition, targetPosition2, targetPosition3, duration );


}

//adding shape

var geometry = new THREE.BoxGeometry( 15, 15, 15 );
var cubeMaterials = new THREE.MeshBasicMaterial({ ////////////////////////CUBE MATERIALS
    //map: new THREE.TextureLoader().load('models/marble.jpg')
    vertexShader: document.getElementById( 'vertexShader' ).textContent,
	fragmentShader: document.getElementById( 'fragmentShader' ).textContent,

})

var geometry = new THREE.CircleBufferGeometry( 340, 364 );

var groundMirror = new THREE.Reflector( geometry, {
        clipBias: 0.003,
        textureWidth:  window.innerWidth * window.devicePixelRatio,
        textureHeight: window.innerHeight * window.devicePixelRatio,
        color: 0x777777,
        transparent: true, 
        opacity: 0.2,
        recursion: 1
        } );
                
        groundMirror.position.y = 0.5;
        groundMirror.rotateX( - Math.PI / 2 );
        groundMirror.position.set( 110, -3, 0 );
       // scene.add( groundMirror );




///////////////////////////////////////////////////////////////////////////////////
//                              LIGHTS                                           //
///////////////////////////////////////////////////////////////////////////////////

 var ambientLight = new THREE.AmbientLight(0xffffff);
 scene.add(ambientLight);

 var pointColor = 0xff0000;
 var pointLight = new THREE.PointLight(pointColor, 0.8, 100);
 pointLight.position.set(-3, 10, -3);
 pointLight.castShadow = true;
 scene.add(pointLight);

 spotLight = new THREE.PointLight( 0xffffff, 5 );    
               spotLight.position.set( 115, 75, -60 );
                //spotLight.angle = Math.PI/ 4;
                spotLight.penumbra = 0.05;
                spotLight.decay = 2;
                //spotLight.power = intensity * 4π;
                spotLight.distance = 350;
                spotLight.castShadow = true;
                spotLight.shadowDarkness = 0.5;
                spotLight.shadowCameraVisible = true;
                spotLight.shadow = new THREE.LightShadow( new THREE.PerspectiveCamera( 50, 1, 10, 2500 ) );
                spotLight.shadow.mapSize.width = 1024;
                spotLight.shadow.mapSize.height = 1024;
                spotLight.shadow.camera.near = 10;
                spotLight.shadow.camera.far = 200;
                //scene.add( spotLight );
                lightHelper = new THREE.PointLightHelper( spotLight );
                //scene.add( lightHelper );



///////////////////////////////////////////////////////////////////////////////////
//                              TEXTURES FOR JSON                                 //
///////////////////////////////////////////////////////////////////////////////////


 var tableLightMap = new THREE.MeshBasicMaterial();
 tableLightMap.map = THREE.ImageUtils.loadTexture("models/tablesingleSource.png");


 var doorLightmap = new THREE.MeshBasicMaterial();
 doorLightmap.map = THREE.ImageUtils.loadTexture("models/doorbaked2.png");
 

 var textureLoader = new THREE.TextureLoader();
 var teapo2Maping = textureLoader.load('models/secondTeapotBrighter.png');
teapo2Maping.wrapS = THREE.RepeatWrapping;
teapo2Maping.wrapT = THREE.RepeatWrapping;
teapo2Maping.repeat.x = 1;
teapo2Maping.repeat.y = 1;
var teapot2Lightmap = new THREE.MeshBasicMaterial({ map: teapo2Maping });

  var teapot1Lightmap = new THREE.MeshBasicMaterial();
 teapot1Lightmap.map = THREE.ImageUtils.loadTexture("models/firstTeapotBrighter.png");

 var textureLoader = new THREE.TextureLoader();
 var floorMaping = textureLoader.load('models/floorbaked.png');
floorMaping.wrapS = THREE.RepeatWrapping;
floorMaping.wrapT = THREE.RepeatWrapping;
floorMaping.repeat.x = 1;
floorMaping.repeat.y = 1;
var floor = new THREE.MeshPhongMaterial({ map: floorMaping });

floorMat = new THREE.MeshPhongMaterial( { //MeshPhongMaterial    MeshStandardMaterial
                    roughness: 0.8,
                    color: 0xffffff,
                    transparent: true, 
                    opacity: 0.8,
                    //metalness: 0.2,
                    //bumpScale: 0.0005,
                    shininess: 100
                });

var textureLoader = new THREE.TextureLoader();
textureLoader.load( "models/checker3.png", function( map ) {
    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 4;
    map.repeat.set( 1, 1 );
    floorMat.map = map;
    floorMat.needsUpdate = true;
} );

//  var teapot2Lightmap = textureLoader.load('models/teapot2baked.png');
// teapot2Lightmap.wrapS = teapot2Lightmap.wrapT = THREE.RepeatWrapping;
// var pot2 = new THREE.MeshPhongMaterial({ map: teapot2Lightmap });

var wallLightmap = new THREE.MeshBasicMaterial();
 wallLightmap.map = THREE.ImageUtils.loadTexture("models/wallbakeMoreSamples.png");

 var doorFrameLeftLightmap = new THREE.MeshBasicMaterial();
 doorFrameLeftLightmap.map = THREE.ImageUtils.loadTexture("models/doorFrameLeft.png");

 var doorFrameRightLightmap = new THREE.MeshBasicMaterial();
 doorFrameRightLightmap.map = THREE.ImageUtils.loadTexture("models/doorFrameRight.png");

 var doorFrameTopLightmap = new THREE.MeshBasicMaterial();
 doorFrameTopLightmap.map = THREE.ImageUtils.loadTexture("models/doorFrameTop.png");

 var tableLeg1Lightmap = new THREE.MeshBasicMaterial();
 tableLeg1Lightmap.map = THREE.ImageUtils.loadTexture("models/tableleg1noshadow.png");

 var tableLeg2Lightmap = new THREE.MeshBasicMaterial();
 tableLeg2Lightmap.map = THREE.ImageUtils.loadTexture("models/tableleg2noshadow.png");

 var tableLeg3Lightmap = new THREE.MeshBasicMaterial();
 tableLeg3Lightmap.map = THREE.ImageUtils.loadTexture("models/tableleg3noshadow.png");

 var tableLeg4Lightmap = new THREE.MeshBasicMaterial();
 tableLeg4Lightmap.map = THREE.ImageUtils.loadTexture("models/tableleg4noshadow.png");

 var frameLightmap = new THREE.MeshBasicMaterial();
 frameLightmap.map = THREE.ImageUtils.loadTexture("models/framebaked.png");

 var picLightmap = new THREE.MeshBasicMaterial();
 picLightmap.map = THREE.ImageUtils.loadTexture("models/picbaked.png");



///////////////////////////////////////////////////////////////////////////////////
//                              JSON MESH IMPORT                                  //
///////////////////////////////////////////////////////////////////////////////////

var loader = new THREE.JSONLoader();

        loader.load( 'models/table5.json', function ( geometry ) {
        var bakedTable = new THREE.Mesh( geometry,tableLightMap );  
        bakedTable.receiveShadow = true;
        bakedTable.castShadow = true;  
        bakedTable.rotation.x = -1.5708;        
        scene.add( bakedTable );
        render();
        }); 


        loader.load( 'models/floorMain.json', function ( geometry ) {
        var bakedFloor = new THREE.Mesh( geometry,floorMat ); //floorMat
        bakedFloor.rotation.x = -1.5708;              
        scene.add( bakedFloor );
        }); 

        loader.load( 'models/floorBack.json', function ( geometry ) {
        var bakedFloorBack = new THREE.Mesh( geometry,floorMat ); //floorMat
        bakedFloorBack.rotation.x = -1.5708;              
        scene.add( bakedFloorBack );
        }); 

        loader.load( 'models/door.json', function ( geometry ) {
        var bakedDoor = new THREE.Mesh( geometry,doorLightmap );
        bakedDoor.rotation.x = -1.5708;              
        scene.add( bakedDoor );
        }); 

         loader.load( 'models/teapot2bakedTest.json', function ( geometry ) {
         var bakedTeapot2 = new THREE.Mesh( geometry,teapot2Lightmap );
         bakedTeapot2.rotation.x = -1.5708; 
         bakedTeapot2.castShadow = true;              
         scene.add( bakedTeapot2 );
                 render();

         }); 

         loader.load( 'models/teapot1.json', function ( geometry ) {
         var bakedTeapot2 = new THREE.Mesh( geometry,teapot1Lightmap );
         bakedTeapot2.rotation.x = -1.5708; 
         bakedTeapot2.castShadow = true;              
         scene.add( bakedTeapot2 );
                 render();

         }); 

        loader.load( 'models/wallbakedMoreSamples.json', function ( geometry ) {
        var bakedWall = new THREE.Mesh( geometry,wallLightmap ); 
        bakedWall.rotation.x = -1.5708; 
        bakedWall.receiveShadow = true;             
        scene.add( bakedWall );
        }); 

        loader.load( 'models/doorFrameLeft.json', function ( geometry ) {
        var bakedWall = new THREE.Mesh( geometry,doorFrameLeftLightmap ); 
        bakedWall.rotation.x = -1.5708;              
        scene.add( bakedWall );
        }); 

        loader.load( 'models/doorFrameRight.json', function ( geometry ) {
        var bakedWall = new THREE.Mesh( geometry,doorFrameRightLightmap ); 
        bakedWall.rotation.x = -1.5708;              
        scene.add( bakedWall );
        }); 

        loader.load( 'models/doorFrameTop.json', function ( geometry ) {
        var bakedWall = new THREE.Mesh( geometry,doorFrameTopLightmap );  
        bakedWall.rotation.x = -1.5708;             
        scene.add( bakedWall );
        }); 

        loader.load( 'models/tableLeg1.json', function ( geometry ) {
        var bakedWall = new THREE.Mesh( geometry,tableLeg1Lightmap ); 
        bakedWall.rotation.x = -1.5708;              
        scene.add( bakedWall );
        }); 

        loader.load( 'models/tableLeg2.json', function ( geometry ) {
        var bakedWall = new THREE.Mesh( geometry,tableLeg2Lightmap ); 
        bakedWall.rotation.x = -1.5708;              
        scene.add( bakedWall );
        }); 

        loader.load( 'models/tableLeg3.json', function ( geometry ) {
        var bakedWall = new THREE.Mesh( geometry,tableLeg3Lightmap );
        bakedWall.rotation.x = -1.5708;               
        scene.add( bakedWall );
        }); 

        loader.load( 'models/tableLeg4.json', function ( geometry ) {
        var bakedWall = new THREE.Mesh( geometry,tableLeg4Lightmap );  
        bakedWall.rotation.x = -1.5708;             
        scene.add( bakedWall );
        }); 

        loader.load( 'models/frame.json', function ( geometry ) {
        var bakedWall = new THREE.Mesh( geometry,frameLightmap ); 
        bakedWall.rotation.x = -1.5708;             
        scene.add( bakedWall );
        }); 

         loader.load( 'models/pic.json', function ( geometry ) {
        var bakedWall = new THREE.Mesh( geometry,picLightmap ); 
         bakedWall.rotation.x = -1.5708;             
        scene.add( bakedWall );
        }); 

        //  loader.load( 'models/pikachuLighting.json', function ( geometry ) {
        // var pikachu = new THREE.Mesh( geometry, picLightmap); 
        //  pikachu.rotation.x = -1.5708; 
        //  pikachu.position.set(15,58,20);
        //  pikachu.scale.x = 5;
        //  pikachu.scale.y = 5;
        //  pikachu.scale.z = 5;            
        // scene.add( pikachu );
        // }); 


       loader.load('/models/pikachuLighting.json', function (geometry, materials) {
    materials.forEach(function (material) {
      material.skinning = true;
    });
    character = new THREE.SkinnedMesh(
      geometry,
      new THREE.MeshFaceMaterial(materials)
    );

    mixer = new THREE.AnimationMixer(character);

    scene.add(character);


    mixer.clipAction(geometry.animations[ 0 ]).play();

});

///////////////////////////////////////////////////////////////////////////////////
//                              OBJ MESH IMPORT                                  //
///////////////////////////////////////////////////////////////////////////////////


//adding OBJ file
var files = [//'models/teapot1.obj','models/teapot3.obj',
			// 'models/table_leg1.obj', 'models/table_leg2.obj', 'models/table_leg3.obj', 'models/table_leg4.obj', 'models/table.obj',
			 //'models/door_frame_left.obj', 'models/door_frame_right.obj', 'models/door_frame_top.obj', 'models/door_hinge1.obj', 'models/door_hinge2.obj', 'models/door_hinge3.obj', 'models/door_knob.obj', 'models/door.obj', 
			 'models/floor.obj', 'models/floor01.obj', 'models/pikachu.obj', 
			 //'models/picture_frame.obj', 'models/picture_image.obj', 
			 //'models/walls.obj']
             'models/teapot3.obj', 'models/anyThing.obj', 'models/teapotRefract.obj', 'models/door_hinge1.obj', 'models/door_hinge2.obj', 'models/door_hinge3.obj', 'models/door_knob.obj'
             ]

// var textureLoader = new THREE.TextureLoader();
var marbleMaping = textureLoader.load('models/marble.jpg', function(texture){
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
});
var marble = new THREE.MeshPhongMaterial({ map: marbleMaping, alphaTest: 0});


var wood72Maping = textureLoader.load('models/72cf.jpg');
	wood72Maping.wrapS = wood72Maping.wrapT = THREE.RepeatWrapping;
var wood72cf = new THREE.MeshPhongMaterial({ map: wood72Maping });


var woodrefMaping = textureLoader.load('models/72rdf.jpg');
	woodrefMaping.wrapS = woodrefMaping.wrapT = THREE.RepeatWrapping;
var woodrdf = new THREE.MeshPhongMaterial({ map: woodrefMaping, lightMap: tableLightMap });

var picMaping = textureLoader.load('models/pic.jpg');
	picMaping.wrapS = picMaping.wrapT = THREE.RepeatWrapping;
var picture = new THREE.MeshPhongMaterial({ map: picMaping });

var perlinMaping = textureLoader.load('models/teapot2baked.png');
perlinMaping.wrapS = perlinMaping.wrapT = THREE.RepeatWrapping;
var perlin = new THREE.MeshPhongMaterial({ map: perlinMaping });

var pikaMaping = textureLoader.load('models/pikachu.png');
pikaMaping.wrapS = pikaMaping.wrapT = THREE.RepeatWrapping;
var pika = new THREE.MeshPhongMaterial({ map: pikaMaping });

// var checkerMaping = textureLoader.load('models/checker.png');
// checkerMaping.wrapS = THREE.RepeatWrapping;
// checkerMaping.wrapT = THREE.RepeatWrapping;
// checkerMaping.repeat.x = 1.5;
// checkerMaping.repeat.y = 1.5;
// var checker = new THREE.MeshPhongMaterial({ map: checkerMaping });

var wallMaping = textureLoader.load('models/wall.jpg');
wallMaping.wrapS = THREE.RepeatWrapping;
wallMaping.wrapT = THREE.RepeatWrapping;
wallMaping.repeat.x = 200;
wallMaping.repeat.y = 200;
var wall = new THREE.MeshPhongMaterial({ map: wallMaping });


// urls of the images, one per half axis
var urls = [
  'models/px.png',
  'models/nx.png',
  'models/py.png',
  'models/ny.png',
  'models/pz.png',
  'models/nz.png'
],

// wrap it up into the object that we need
cubemap = THREE.ImageUtils.loadTextureCube(urls);

// set the format, likely RGB unless you've gone crazy
cubemap.format = THREE.RGBFormat;

var shader = THREE.FresnelShader;

var glassControls = { glassOpacity: 0.8, glassReflectivity:0.3 };
//var glassOpacity = 0.8;

var shader1 = THREE.ShaderLib[ "cube" ];
shader1.uniforms[ "tCube" ].value = cubemap;

var glass = new THREE.MeshLambertMaterial({
        color: 0xffffff, 
        envMap: cubemap, 
        combine: THREE.MixOperation, 
        reflectivity: glassControls.glassReflectivity, 
        opacity: glassControls.glassOpacity, 
        transparent:true
    });

var cubeShader = new THREE.ShaderMaterial( {

    fragmentShader: shader1.fragmentShader,
    vertexShader: shader1.vertexShader,
    uniforms: shader1.uniforms,
    rotation: new THREE.Euler(1.0, 1.0, 1.0), // An Euler describes rotation around each axis in radians.
    depthWrite: false,
    side: THREE.DoubleSide

});

var uniforms = {
"uTexCube" : { type: "t", value: THREE.ImageUtils.loadTextureCube( [ "models/pxbest.png", "models/nxbest.png", // cube texture
                                                                     "models/pybest.png", "models/nybest.png", 
                                                                     "models/pzbest.png", "models/nzbest.png" ] ) }
};

 var uniformsTest = {
texture1: { type: 't', texture: THREE.ImageUtils.loadTexture( 'models/checker3.png' ) }
 };

 var uniformsRefractRGB = {
"index" : { type: "f", value: 0.66 },

"uTexCube" : { type: "t", value: THREE.ImageUtils.loadTextureCube( [ "models/pxbest.png", "models/nxbest.png", // cube texture
                                                                     "models/pybest.png", "models/nybest.png", 
                                                                     "models/pzbest.png", "models/nzbest.png" ] ) }
};


var shader = new THREE.ShaderMaterial({
	uniforms: uniforms,
vertexShader: document.getElementById( 'vertexShader' ).textContent,
	fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
	//depthWrite: false,
    side: THREE.DoubleSide
});

var shaderColor = new THREE.ShaderMaterial({
    //uniforms: uniformsTest,
	
vertexShader: document.getElementById( 'vertexShadercolor' ).textContent,
	fragmentShader: document.getElementById( 'fragmentShadercolor' ).textContent,
	//depthWrite: false,
    side: THREE.DoubleSide
});


var shaderCube = new THREE.ShaderMaterial({
uniforms: uniforms,	
vertexShader: document.getElementById( 'vertexShaderCube' ).textContent,
	fragmentShader: document.getElementById( 'fragmentShaderCube' ).textContent,
	//depthWrite: false,
    side: THREE.DoubleSide
});

var shaderGlow = new THREE.ShaderMaterial({
    vertexShader: document.getElementById( 'vertexShaderglow' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShaderglow' ).textContent,
    //depthWrite: false,
    side: THREE.DoubleSide
})

var shaderDiffuse = new THREE.ShaderMaterial({
    uniforms: uniformsTest,
    vertexShader: document.getElementById( 'vertexShaderDiffuse' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShaderDiffuse' ).textContent,
    map: floorMat,
    //depthWrite: false,
    side: THREE.DoubleSide
})

var shaderRefract = new THREE.ShaderMaterial({
    uniforms: {
"index" : { type: "f", value: 0.66 },

"uTexCube" : { type: "t", value: THREE.ImageUtils.loadTextureCube( [ "models/pxbest.png", "models/nxbest.png", // cube texture
                                                                     "models/pybest.png", "models/nybest.png", 
                                                                     "models/pzbest.png", "models/nzbest.png" ] ) }
},
    vertexShader: document.getElementById( 'vertexShaderRefract' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShaderRefract' ).textContent,
    //depthWrite: false,
    side: THREE.DoubleSide
})

var shaderRGB = new THREE.ShaderMaterial({
    uniforms: {
"index" : { type: "f", value: 0.66 },

"uTexCube" : { type: "t", value: THREE.ImageUtils.loadTextureCube( [ "models/pxbest.png", "models/nxbest.png", // cube texture
                                                                     "models/pybest.png", "models/nybest.png", 
                                                                     "models/pzbest.png", "models/nzbest.png" ] ) }
},
    vertexShader: document.getElementById( 'vertexShaderRefractChrom' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShaderRefractChrom' ).textContent,
    //depthWrite: false,
    side: THREE.DoubleSide
})


var position = { x: -35, y: 18 }

var geometry = new THREE.BoxGeometry( 20, 20, 20 );
var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
var cube = new THREE.Mesh( geometry, material );
cube.position.set(0,28,-200);
//scene.add( cube );

var geometry = new THREE.SphereGeometry( 20, 32, 32 );
var materialSphere = new THREE.MeshBasicMaterial( {color: 0xffff00} );
var sphereRGB = new THREE.Mesh( geometry, shaderRGB );
sphereRGB.position.set(15,58,20);
//scene.add( sphereRGB );
//scene.remove(sphere);

var geometry = new THREE.SphereGeometry( 20, 32, 32 );
var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
var sphere = new THREE.Mesh( geometry, shader);
sphere.position.set(15,58,20);
//scene.add( sphere );

var geometry = new THREE.SphereGeometry( 20, 32, 32 );
var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
var sphereRefract = new THREE.Mesh( geometry, shaderRefract );
sphereRefract.position.set(15,58,20);
//scene.add( sphereRefract );

var loader = new THREE.OBJLoader();
var pot3Obj;
var knobObj;
var thingObj;
var normRefObj;

for (var i = 0; i <= files.length - 1; i++) {

    loader.load(
        // resource URL
        files[i],
        // called when resource is loaded
        function(object) {
        	if(object.children[0].name === "teapot3"){

        	     	pot3Obj = object

        	     } else if (object.children[0].name === "door_knob"){
                    knobObj = object
                 } else if (object.children[0].name === "anyThing"){
                    thingObj = object
                 } else if (object.children[0].name === "teapotRefract"){
                    normRefObj = object
                 }

            object.traverse(function(node) {

                if (node.isMesh) {
                    if (node.name === 'table') {
                        node.material = woodrdf;
                    } else if (node.name === 'teapot1') {
                        node.material = shaderColor;//marble;
                    } else if (node.name === 'teapot2') {
                        node.material = perlin;//shader;//perlin;
                    } else if (node.name === 'teapot3') {
                        node.material = shader;//shader;//shader;//glass;
                    } else if (node.name === 'picture_image') {
                        node.material = picture;
                    } else if (node.name === 'teapotRefract') {
                        node.material = shaderRefract;
                    } else if (node.name === 'floor') {
                        node.material = checker;
                    } else if (node.name === 'anyThing') {
                        node.material = shaderRGB; //taken off the intenet
                    } else if (node.name === 'floor01') {
                        node.material = checker;
                    } else if (node.name === 'DrawCall_7'){
                        node.material = pika;
                    }else if (node.name === 'DrawCall_8'){
                        node.material = pika;
                    }else if (node.name === 'DrawCall_9'){
                        node.material = pika;
                    }else if (node.name === 'DrawCall_13'){
                        node.material = pika;
                    }else if (node.name === 'DrawCall_14'){
                        node.material = pika;
                    }else if (node.name === 'DrawCall_21'){
                        node.material = pika;
                    }else if (node.name === 'DrawCall_34'){
                        node.material = pika;
                    }else {
                        node.material = shaderDiffuse;
                    }
                }
            });

            if(object.children[0].name !== "DrawCall_7"){
             object.rotation.x = -1.5708; 
            }

            if(object.children[0].name === "DrawCall_7"){
             object.position.set(-15,0,-200); 
             object.scale.x = 0.5;
             object.scale.y = 0.5;
             object.scale.z = 0.5;

            }

             if(object.children[0].name !== "anyThing" && object.children[0].name !== "teapotRefract"){ //|| object.children[0].name !== "teapotRefract"){
                    scene.add(object);
             }
            //scene.add(object);
        },
        // called when loading is in progresses
        function(xhr) {

            console.log((xhr.loaded / xhr.total * 100) + '% loaded');

        },
        // called when loading has errors
        function(error) {

            console.log('An error happened');

        }
    );
}



// camera.position.set(-35, -175, 60); //-35, -175, 60
// camera.up = new THREE.Vector3(0, 0, 1); ///////////////////////////////////LOOK AT//////////////////////////////////////
// camera.lookAt(new THREE.Vector3(30, 0, 0));



// Create a tween for position first
// var tween = new TWEEN.Tween(cube.position)
//         .to({ x: 100, y: 100, z: 100 }, 10000)
//         .start();





var stats = new Stats();
 document.body.appendChild( stats.domElement );


///////////////////////////////////////////////////////////////////////////////////
//                              DAT.GUI                                          //
///////////////////////////////////////////////////////////////////////////////////

var props = {hideBars:false,
        depthZ_Fraction:0.015,
        barColor: '#FFFFFF',
        barDirection:'Vertical',
        teapotThreeMaterial: "reflecti"
    };

 var camParams = {
     z_direction: 100,
     x_direction: 100,
     y_direction: 100
 }

 var gui = new dat.GUI();


//Camera controls
var cam = gui.addFolder('Camera');

cam.add(camParams, 'z_direction', -500, 500).step(5).onChange(function(value) {
    changeCameraZ(value);
});
function changeCameraZ(value) {
    camera.position.z = value;
}
cam.add(camParams, 'x_direction', -500, 500).step(5).onChange(function(value1) {
    changeCameraX(value1);
});
function changeCameraX(value1) {
    camera.position.x = value1;
}
cam.add(camParams, 'y_direction', -500, 500).step(5).onChange(function(value2) {
    changeCameraY(value2);
});

function changeCameraY(value2) {
    camera.position.y = value2;
}

//lighting controls

var lightControls = new function(){
this.pointColor = pointColor;
this.castShadow = true;
};
var lights = gui.addFolder('Lighting');

lights.addColor(lightControls, 'pointColor').onChange(function (e) {
            pointLight.color = new THREE.Color(e);
        });
lights.add(lightControls, 'castShadow').onChange(function(e){
	directionalLight.castShadow = e;
});

var glassControls= new function (){
	this.glassOpacity= 0.8;
	this.glassReflectivity= 0.3;
};

var glassMats = gui.addFolder('GlassyMaterial');

glassMats.add(glassControls, 'glassOpacity', 0, 0.9).onChange(function(){
	glass.opacity = glassControls.glassOpacity;
});

glassMats.add(glassControls, 'glassReflectivity', 0, 0.9).onChange(function(){
	glass.reflectivity = glassControls.glassReflectivity;
});



gui.add(shaderRGB.uniforms.index, 'value', 0, 2)
    .name('Abberation Refraction');

    gui.add(shaderRefract.uniforms.index, 'value', 0, 2)
    .name('Refraction');


barDirection = 
    gui.add(props,'barDirection',
                ['Reflection', 'Refraction', 'Refraction Abberation'])
           .name('Teapot Three')
           .listen();
    
barDirection.onChange(
              function(newValue) {
         //do whatever you want...
         if(newValue === 'Refraction Abberation' ){
            //scene.add( sphereRGB );
            //scene.remove( sphere ); 
            scene.remove( sphere );
            scene.add( sphereRGB );
            scene.remove( sphereRefract );

            scene.remove( pot3Obj );
            scene.add(thingObj);
            scene.remove(normRefObj);
            //scene.add(sphereRGB)
         } else if (newValue === 'Reflection') {
            scene.add( sphere );
            scene.remove( sphereRGB );
            scene.remove( sphereRefract );
            scene.add( pot3Obj );
            //scene.add(knobObj);
            scene.remove(thingObj);
            scene.remove(normRefObj);
         } else {

            scene.remove( sphere );
            scene.remove( sphereRGB );
            scene.add( sphereRefract );

            scene.remove(thingObj);
            scene.remove(pot3Obj);
            scene.add(normRefObj);
         }
       });




//needed logic
var update = function() {
   // cube.rotation.x += 0.01;
    
   // cube.rotation.y += 0.01;

   //mixer.update( clock.getDelta() );
    
    stats.update();
    TWEEN.update();
    

};

// tween.onUpdate(function(object) {
//     console.log(object.x);
//     cube.position.x = object.x;
//     cube.position.y = object.y;
// });

//drawing of the scene
var render = function() {

lightHelper.update();
	

    renderer.render(scene, camera);

};

var gameLoop = function() { //normally intialize, update, draw

    requestAnimationFrame(gameLoop); // run every frame

    update();

    render();

};

gameLoop();




/*var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

var animate = function() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;

    renderer.render(scene, camera);
};

animate();*/