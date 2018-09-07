<template>
    <form class="flex-grow-1 current-shadow rounded bg-white p-4"
          @submit.prevent="submitChanges">
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
            <div class="d-flex flex-column">
                <h4 class="pl-4 mb-2">Превью:</h4>
                <div class="mb-3">
                    <button class="btn btn--dl btn-sm btn-link mr-auto mr-2"
                            disabled>
                        image.png
                    </button>
                    <i class="btn-link mr-2 fa fa-edit cursor-pointer"
                       @click="clickFileUpload('image-upload')"></i>
                    <span>{{ newImageFile.name }}</span>
                </div>
                <h4 class="pl-4 mb-3">Файлы:</h4>
                <div>
                    <a class="btn btn--dl btn-sm btn-link mr-2 mb-2"
                       :href="modification.url_archive">
                        <i class="fa fa-download mr-2"></i> zip
                    </a>
                    <i class="btn-link mr-2 fa fa-edit cursor-pointer"
                       @click="clickFileUpload('zip-upload')"></i>
                    <span>{{ newZipFile.name }}</span>
                </div>
                <div>
                    <a class="btn btn--dl btn-sm btn-link mr-2"
                       :href="modification.url_sfb">
                        <i class="fa fa-download mr-2"></i> sfb
                    </a>
                    <i class="btn-link mr-2 fa fa-edit cursor-pointer"
                       @click="clickFileUpload('sfb-upload')"></i>
                    <span>{{ newSfbFile.name }}</span>
                </div>
            </div>
        </div>
        <div class="d-flex align-items-end mt-4"
             v-if="isSubmitShown">
            <button class="btn btn-sm btn-outline-success mr-2"
                    type="submit"
                    @click="submitChanges">Принять изменения</button>
            <button class="btn btn-sm btn-outline-secondary"
                    @click="setDefaultValues">Сбросить</button>
        </div>
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
    </form>
</template>
<script>
import { AdminApi } from '@/services/api'
import { clone } from '@/utils/clone'
import Thumbnail from '../utils/Thumbnail'
import ThumbnailsOuter from '../utils/ThumbnailsOuter'
export default {
    props: ['modification'],
    components: {
        Thumbnail,
        ThumbnailsOuter,
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
    methods: {
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
            let formData = new FormData()
            formData.append('idt_model_modif', this.modification.idt_model_modif);
            if (this.newModificationName !== null) formData.append('name', this.newModificationName);
            if (this.newImageFile.data) formData.append('image', this.newImageFile.data);
            if (this.newZipFile.data) formData.append('archive', this.newZipFile.data);
            if (this.newSfbFile.data) formData.append('sfb', this.newSfbFile.data);

            this.$http.put(AdminApi.updateModification, formData).then(() => {
                this.$parent.$emit('update-model')
            }).catch(err => {
                console.log(err)
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