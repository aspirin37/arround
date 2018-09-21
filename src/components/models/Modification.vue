<template>
    <div class="flex-grow-1 current-shadow rounded bg-white p-4">
        <div class="d-flex flex-column flex-xl-row">
            <div class="mr-4">
                <h4 class="pl-4 mb-3"
                    v-if="!isNameInputShown">
                    <a href="#"
                       class="text-dashed"
                       @click="showNameInput">{{ newModificationName || 'Без имени' }}</a>
                    <small> - ID: {{ modification.idt_model_modif }}</small>
                </h4>
                <input type="text"
                       class="form-control form-control-sm mb-3"
                       v-model="newModificationName"
                       ref="name-input"
                       v-else>
                <thumbnails-outer class="">
                    <thumbnail :img="previewSrc"
                               :thumb="previewSrc"
                               :linkClasses="['circle-avatar circle-avatar--model-info rounded-circle mr-3 bg-light d-inline-block']"
                               :thumbClasses="['font-size-0']"></thumbnail>
                </thumbnails-outer>
            </div>
            <div class="d-flex flex-column mr-auto">
                <h4>Редактирование:</h4>
                <div class="mb-3">
                    <button class="btn btn-sm btn-outline-theme mr-2"
                            @click="clickFileUpload('image-upload')">
                        Заменить превью
                    </button>
                    <span>{{ newImageFile.name }}</span>
                </div>
                <div class="mb-3">
                    <button class="btn btn-sm btn-outline-theme mr-2"
                            @click="clickFileUpload('zip-upload')">Заменить zip-архив</button>
                    <span>{{ newZipFile.name }}</span>
                </div>
                <div class="mb-3">
                    <button class="btn btn-sm btn-outline-theme mr-2"
                            @click="clickFileUpload('sfb-upload')">Заменить sfb-архив</button>
                    <span>{{ newSfbFile.name }}</span>
                </div>
                <div>
                    <button class="btn btn-sm btn-outline-theme"
                            @click="isModelShown = true">Смотреть 3D</button>
                </div>
            </div>
            <div class="d-flex flex-column">
                <h4>Скачать файлы:</h4>
                <a class="btn btn-sm btn-outline-theme mr-2 mb-2"
                   :href="modification.url_archive">
                    <i class="fa fa-download mr-2"></i> ZIP <span class="text-secondary">- 0кб</span>
                </a>
                <a class="btn btn-sm btn-outline-theme mr-2"
                   :href="modification.url_sfb">
                    <i class="fa fa-download mr-2"></i> SFB <span class="text-secondary">- 0кб</span>
                </a>
            </div>
        </div>
        <div class="d-flex align-items-end mt-4"
             v-if="isSubmitShown">
            <button class="btn btn-sm btn-outline-success mr-2"
                    @click="submitChanges">Принять изменения</button>
            <button class="btn btn-sm btn-outline-secondary"
                    @click="setDefaultValues">Сбросить</button>
        </div>
        <modelCollada @close-model="isModelShown = false"
                      v-if="isModelShown" />
        <div class="d-none">
            <input type="file"
                   ref="zip-upload"
                   accept="application/zip"
                   @change="uploadFile('zip-upload', $event)" />
            <input type="file"
                   ref="sfb-upload"
                   @change="uploadFile('sfb-upload', $event)" />
            <input type="file"
                   ref="image-upload"
                   accept="image/*"
                   @change="uploadFile('image-upload', $event)" />
        </div>
    </div>
</template>
<script>
import { ModelApi } from '@/services/api'
import { clone } from '@/utils/clone'
import Thumbnail from '../utils/Thumbnail'
import ThumbnailsOuter from '../utils/ThumbnailsOuter'
import modelCollada from './ModelCollada'
export default {
    props: ['modification'],
    components: {
        Thumbnail,
        ThumbnailsOuter,
        modelCollada
    },
    data() {
        return {
            newModificationName: null,
            newZipFile: null,
            newSfbFile: null,
            newImageFile: null,
            defaultFileState: {
                name: '',
                data: null,
                src: null,
            },
            isSubmitShown: false,
            isNameInputShown: false,
            isSubmitDisabled: false,
            isModelShown: false,
        }
    },
    computed: {
        previewSrc() {
            return this.newImageFile && this.newImageFile.src ? this.newImageFile.src : this.modification.url_icon
        }
    },
    watch: {
        modification: {
            handler: function() {
                this.setDefaultValues()
            },
            deep: true
        }
    },
    created() {
        this.setDefaultValues()
    },
    mounted() {
        // this.createModelInstance()
    },
    methods: {
        // createModelInstance() {
        //     if (!Detector.webgl) Detector.addGetWebGLMessage();
        //     var container, stats, clock, controls;
        //     var camera, scene, renderer, mixer;
        //     init();
        //     animate();

        //     function init() {
        //         container = document.getElementById('my-scene');
        //         camera = new THREE.PerspectiveCamera(25, 500 / 500, 1, 10000);
        //         camera.position.set(15, 10, -15);
        //         scene = new THREE.Scene();
        //         clock = new THREE.Clock();
        //         // collada
        //         var loader = new THREE.ColladaLoader();
        //         loader.load('https://devarapi.a3technology.ru/model/66/stormtrooper.dae', function(collada) {
        //             var animations = collada.animations;
        //             var avatar = collada.scene;
        //             mixer = new THREE.AnimationMixer(avatar);
        //             var action = mixer.clipAction(animations[0]).play();
        //             scene.add(avatar);
        //         });
        //         //
        //         var gridHelper = new THREE.GridHelper(10, 20);
        //         scene.add(gridHelper);
        //         //
        //         var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        //         scene.add(ambientLight);
        //         var directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        //         directionalLight.position.set(1, 1, -1);
        //         scene.add(directionalLight);
        //         //
        //         renderer = new THREE.WebGLRenderer({ antialias: true });
        //         renderer.setPixelRatio(window.devicePixelRatio);
        //         renderer.setSize(500, 500);
        //         container.appendChild(renderer.domElement);
        //         //
        //         controls = new THREE.OrbitControls(camera, renderer.domElement);
        //         controls.target.set(0, 2, 0);
        //         controls.update();
        //         //
        //         window.addEventListener('resize', onWindowResize, false);
        //     }

        //     function onWindowResize() {
        //         camera.aspect = 500 / 500;
        //         camera.updateProjectionMatrix();
        //         renderer.setSize(500, 500);
        //     }

        //     function animate() {
        //         requestAnimationFrame(animate);
        //         render();
        //     }

        //     function render() {
        //         var delta = clock.getDelta();
        //         if (mixer !== undefined) {
        //             mixer.update(delta);
        //         }
        //         renderer.render(scene, camera);
        //     }

        // },
        clickFileUpload(id) {
            this.$refs[id].click()
        },
        uploadFile(id, evt) {
            const file = this.$refs[id].files[0];
            const reader = new FileReader();

            reader.onload = () => {
                switch (id) {
                    case 'zip-upload':
                        this.newZipFile.data = file;
                        this.newZipFile.name = file.name;
                        break;
                    case 'sfb-upload':
                        this.newSfbFile.data = file;
                        this.newSfbFile.name = file.name;
                        break;
                    case 'image-upload':
                        this.newImageFile.src = reader.result;
                        this.newImageFile.name = file.name;
                        this.newImageFile.data = file;
                        break;
                }
                this.isSubmitShown = true
            };

            reader.readAsDataURL(file);
        },
        getFileName(file) {
            return this.modification[file].substr(this.modification[file].lastIndexOf('/') + 1)
        },
        showNameInput() {
            this.isNameInputShown = true
            this.isSubmitShown = true
            setTimeout(() => {
                this.$refs['name-input'].focus()
            }, 1)
        },
        setDefaultValues() {
            this.newZipFile = clone(this.defaultFileState)
            this.newSfbFile = clone(this.defaultFileState)
            this.newImageFile = clone(this.defaultFileState)
            this.newModificationName = this.modification.name || ''
            this.isNameInputShown = false
            this.isSubmitShown = false
            document.querySelectorAll('input[type=file]').forEach(it => {
                it.value = ""
            })
        },
        submitChanges() {
            this.isSubmitDisabled = true
            let formData = new FormData()
            formData.append('idt_model_modif', this.modification.idt_model_modif);
            if (this.newModificationName !== null) formData.append('name', this.newModificationName);
            if (this.newImageFile.data) formData.append('image', this.newImageFile.data);
            if (this.newZipFile.data) formData.append('archive', this.newZipFile.data);
            if (this.newSfbFile.data) formData.append('sfb', this.newSfbFile.data);

            this.$http.put(ModelApi.updateModification, formData).then(() => {
                this.$parent.$emit('update-model')
            }).catch(err => {
                this.isSubmitDisabled = false
            });
        }
    }
}
</script>
<style lang="scss"
       scoped>
.btn {
    min-width: 100px;

    &--link:focus {
        text-decoration: none !important;
    }
}

h2::first-letter,
h4::first-letter {
    text-transform: uppercase
}

a:hover span {
    color: white !important;
}

// dash {
//         border: none;
//     border-bottom: 1px #337ab7 dashed;
//     text-decoration: none !important;
//     /* color: #337ab7; */
//     /* color: inherit; */
//     padding: 0;
//     font-size: 1.14rem;
//     margin-left: 1.5rem !important;
//     /* line-height: 1.5; */
//     /* font-weight: 500; */
//     background-color: inherit;
// }
</style>