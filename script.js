        import { ARButton } from 'https://unpkg.com/three@0.126.0/examples/jsm/webxr/ARButton.js';
        import { GLTFLoader } from 'https://unpkg.com/three@0.126.0/examples/jsm/loaders/GLTFLoader.js';

        let camera, scene, renderer;
        let model;

        init();
        animate();

        function init() {
            const container = document.createElement('div');
            document.body.appendChild(container);

            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 40);

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.xr.enabled = true;
            container.appendChild(renderer.domElement);

            const ambientLight = new THREE.AmbientLight(0x404040, 6);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
            directionalLight.position.set(1, 1, 1).normalize();
            scene.add(directionalLight);

            // Load the model
            const loader = new GLTFLoader();
            const objToRender = 'bridge';

            loader.load(
                `./models/${objToRender}/scene.gltf`,
                function (gltf) {
                    model = gltf.scene;
                    model.position.z = -10;
                    model.position.y=-5;
                    scene.add(model);
                    console.log('Model loaded:', model);
                },
                function (xhr) {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },
                function (error) {
                    console.error('Error loading model:', error);
                }
            );

            document.body.appendChild(ARButton.createButton(renderer));

            window.addEventListener('resize', onWindowResize, false);
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function animate() {
            renderer.setAnimationLoop(render);
        }

        function render() {
            rotateModel();
            renderer.render(scene, camera);
        }

        function rotateModel() {
            if (model !== undefined) {
                model.rotation.y += 0.01;
            }
        }
