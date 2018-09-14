<template>
    <div>
        <div class="bg-light rounded p-3">
            <small class="mb-1 text-muted d-block">{{title}}:</small>
            <span class="pr-2"
                  v-if="currentNote"><b class="pre-wrap">{{currentNote}}</b></span>
            <a href="#"
               v-on:click.prevent="toggleModal('note-modal')">
                <img src="@/assets/icons/pencil.svg"
                     alt="edit"
                     class="inline-img"
                     v-if="currentNote">
                <span v-else>Добавить</span>
            </a>
            <span class="small"
                  v-if="!currentNote">(Видна только вам)</span>
        </div>
        <modal modalSize="modal-sm"
               :modalTitle="title"
               ref="note-modal">
            <div slot="modalBody">
                <div class="form-group">
                    <textarea rows="5"
                              class="form-control"
                              v-model="comment"></textarea>
                </div>
                <button class="btn btn-theme w-100"
                        v-on:click="addNote"
                        :disabled="!comment">Сохранить</button>
            </div>
        </modal>
    </div>
</template>
<script>
import Modal from '@/components/utils/Modal'

export default {
    name: 'user-note-about',
    data() {
        return {
            comment: ''
        }
    },
    props: {
        title: {
            type: String,
            default: 'Заметка'
        },
        currentNote: ''
    },
    components: {
        Modal
    },
    watch: {
        currentNote(val, oldVal) {
            if (val !== oldVal) {
                this.comment = val
            }
        }
    },
    methods: {
        toggleModal(id) {
            this.$refs[id].newIsOpen = !this.$refs[id].newIsOpen
        },
        addNote() {
            this.toggleModal('note-modal')
            this.$emit('added')
        }
    }
}
</script>