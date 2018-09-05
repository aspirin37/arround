<template>
    <div class="current-shadow rounded bg-white p-4">
        <div class="d-flex flex-column flex-lg-row">
            <div class="mr-4">
                <h4 class="pl-4 mb-3">{{ modification.name || 'Без имени' }} - ID: {{ modification.idt_model_modif }}</h4>
                <thumbnails-outer class="">
                    <thumbnail :img="modification.url_icon"
                               :thumb="modification.url_icon"
                               :linkClasses="['circle-avatar circle-avatar--model-info rounded-circle mr-3 bg-light d-inline-block']"
                               :thumbClasses="['font-size-0']"></thumbnail>
                </thumbnails-outer>
            </div>
            <div class="d-flex flex-column">
                <h4 class="pl-4 mb-3">Изменить файлы:</h4>
                <div>
                    <a class="btn btn--dl btn-sm btn-link mr-2 mb-2"
                       :href="modification.url_archive"
                       title="Скачать">{{ zipFileName }}</a>
                    <i class="btn-link mr-2 fa fa-edit cursor-pointer"
                       @click="clickZipIcon"></i>
                    <span>{{ newZipFile.name }}</span>
                </div>
                <div>
                    <a class="btn btn--dl btn-sm btn-link mr-2"
                       :href="modification.url_sfb"
                       title="Скачать">{{ sfbFileName }}</a>
                    <i class="btn-link mr-2 fa fa-edit cursor-pointer"
                       @click="clickSfbIcon"></i>
                    <span>{{ newSfbFile.name }}</span>
                </div>
            </div>
            <div class="d-flex align-items-end ml-auto">
                <button class="btn btn-outline-success mr-2">Принять изменения</button>
                <button class="btn btn-outline-secondary">Сбросить</button>
            </div>
        </div>
        <input type="file"
               ref="zip-upload"
               accept="application/zip"
               class="d-none"
               @change="uploadFile('zip-upload', $event)" />
        <input type="file"
               ref="sfb-upload"
               class="d-none"
               @change="uploadFile('sfb-upload', $event)" />
    </div>
</template>
<script>
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
            newZipFile: {
                name: 'Файл не выбран',
                data: null,
            },
            newSfbFile: {
                name: 'Файл не выбран',
                data: null,
            }
        }
    },
    computed: {
        zipFileName() {
            return this.modification.url_archive.substr(this.modification.url_archive.lastIndexOf('/') + 1)
        },
        sfbFileName() {
            return this.modification.url_sfb.substr(this.modification.url_sfb.lastIndexOf('/') + 1)
        }
    },
    methods: {
        clickZipIcon() {
            this.$refs['zip-upload'].click()
        },
        clickSfbIcon() {
            this.$refs['sfb-upload'].click()
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
                }
            };

            reader.readAsDataURL(file);
        },
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