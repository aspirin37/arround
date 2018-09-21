<template>
    <div class="model-collada">
        <div class="model-collada__scene">
            <span class="model-collada__close"
                  @click="closeModel"></span>
            <div id="my-scene"></div>
        </div>
    </div>
</template>
<script>
export default {
    mounted() {
        this.createModelInstance()
    },
    methods: {
        createModelInstance() {
            let self = this
            if (!Detector.webgl) Detector.addGetWebGLMessage();
            var container, stats, clock, controls;
            var camera, scene, renderer, mixer;
            init();
            animate();

            function init() {
                container = document.getElementById('my-scene');
                camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 1, 10000);
                camera.position.set(15, 10, -15);
                scene = new THREE.Scene();
                clock = new THREE.Clock();
                // collada
                var loader = new THREE.ColladaLoader();
                loader.load('https://devarapi.a3technology.ru/model/66/stormtrooper.dae', function(collada) {
                    var animations = collada.animations;
                    var avatar = collada.scene;
                    mixer = new THREE.AnimationMixer(avatar);
                    var action = mixer.clipAction(animations[0]).play();
                    scene.add(avatar);
                });
                //
                if (self.$mq !== 'sm') {
                    var gridHelper = new THREE.GridHelper(10, 20, 0x000000, 0x000000);
                    scene.add(gridHelper);
                }
                //
                var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
                scene.add(ambientLight);
                var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
                directionalLight.position.set(1, 1, -1);
                scene.add(directionalLight);
                //
                renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.setSize(window.innerWidth, window.innerHeight);
                container.appendChild(renderer.domElement);
                //
                controls = new THREE.OrbitControls(camera, renderer.domElement);
                controls.target.set(0, 2, 0);
                controls.update();
                //
                window.addEventListener('resize', onWindowResize, false);
            }

            function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }

            function animate() {
                requestAnimationFrame(animate);
                render();
            }

            function render() {
                var delta = clock.getDelta();
                if (mixer !== undefined) {
                    mixer.update(delta);
                }
                renderer.render(scene, camera);
            }

        },
        closeModel() {
            this.$emit('close-model')
        }
    }
}
</script>
<style lang="scss"
       scoped>
.model-collada {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);

    &__scene {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%)
    }

    &__close {
        position: absolute;
        top: 40px;
        right: 60px;
        width: 60px;
        height: 50px;
        outline: none;
        display: inline-block;
        cursor: pointer;

        &:hover {

            &:before,
            &:after {
                opacity: 1;
            }
        }

        &:after,
        &:before {
            content: '';
            height: 50px;
            width: 4px;
            background-color: white;
            opacity: 0.8;
            display: inline-block;
            position: absolute;
            top: 0;
            right: 10px;
        }

        &:after {
            transform: rotate(45deg);

        }

        &:before {
            transform: rotate(-45deg);
        }
    }
}
</style>