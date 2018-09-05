<template>
    <div class="current-shadow rounded bg-white p-4">
        <div class="d-flex flex-column flex-xl-row">
            <div class="mr-4">
                <h4 class="pl-4 mb-3">{{ modification.name || 'Без имени' }} - ID: {{ modification.idt_model_modif }}</h4>
                <thumbnails-outer class="">
                    <thumbnail :img="previewSrc"
                               :thumb="previewSrc"
                               :linkClasses="['circle-avatar circle-avatar--model-info rounded-circle mr-3 bg-light d-inline-block']"
                               :thumbClasses="['font-size-0']"></thumbnail>
                </thumbnails-outer>
            </div>
            <div class="d-flex flex-column">
                <h4 class="pl-4 mb-3">Изменить превью:</h4>
                <div class="mb-3">
                    <button class="btn btn--dl btn-sm btn-link mr-auto mr-2"
                            disabled>
                        {{ getFileName('url_icon') }}
                    </button>
                    <i class="btn-link mr-2 fa fa-edit cursor-pointer"
                       @click="clickFileUpload('image-upload')"></i>
                    <span>{{ newImageFile.name }}</span>
                </div>
                <h4 class="pl-4 mb-3">Изменить файлы:</h4>
                <div>
                    <a class="btn btn--dl btn-sm btn-link mr-2 mb-2"
                       :href="modification.url_archive"
                       title="Скачать">{{ getFileName('url_archive') }}</a>
                    <i class="btn-link mr-2 fa fa-edit cursor-pointer"
                       @click="clickFileUpload('zip-upload')"></i>
                    <span>{{ newZipFile.name }}</span>
                </div>
                <div>
                    <a class="btn btn--dl btn-sm btn-link mr-2"
                       :href="modification.url_sfb"
                       title="Скачать">{{ getFileName('url_sfb') }}</a>
                    <i class="btn-link mr-2 fa fa-edit cursor-pointer"
                       @click="clickFileUpload('sfb-upload')"></i>
                    <span>{{ newSfbFile.name }}</span>
                </div>
            </div>
        </div>
        <div class="d-flex align-items-end mt-4"
             v-if="isSubmitShown">
            <button class="btn btn-outline-success mr-2">Принять изменения</button>
            <button class="btn btn-outline-secondary"
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
    </div>
</template>
<script>
import { clone } from '../../utils/clone'
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
            newZipFile: null,
            newSfbFile: null,
            newImageFile: null,
            defaultFileState: {
                name: 'Файл не выбран',
                data: null,
            },
            isSubmitShown: false,
        }
    },
    computed: {
        previewSrc() {
            return this.newImageFile && this.newImageFile.data ? this.newImageFile.data : this.modification.url_icon
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
                        this.newZipFile.data = reader.result;
                        this.newZipFile.name = file.name;
                        break;
                    case 'sfb-upload':
                        this.newSfbFile.data = reader.result;
                        this.newSfbFile.name = file.name;
                        break;
                    case 'image-upload':
                        this.newImageFile.data = reader.result;
                        this.newImageFile.name = file.name;
                        break;
                }
                this.isSubmitShown = true
            };

            reader.readAsDataURL(file);
        },
        getFileName(file) {
            return this.modification[file].substr(this.modification[file].lastIndexOf('/') + 1)
        },
        setDefaultValues() {
            this.newZipFile = clone(this.defaultFileState)
            this.newSfbFile = clone(this.defaultFileState)
            this.newImageFile = clone(this.defaultFileState)
            this.isSubmitShown = false
            document.querySelectorAll('input[type=file]').forEach(it => {
                it.value = ""
            })
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
</style>