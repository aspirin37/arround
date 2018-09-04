<template>
  <transition name="modal">
    <div v-show="newIsOpen">
      <div class="modal" tabindex="-1" role="dialog" v-bind:class="{'d-block' : newIsOpen}" v-if="newIsOpen">
        <div class="modal-back" v-on:click="newIsOpen = false" v-if="newIsOpen && clickedBack"></div>
        <div class="modal-back" v-if="newIsOpen && !clickedBack"></div>
        <div class="modal-dialog" :class="modalSize" role="document">
          <div class="modal-content">
            <div class="modal-header" v-bind:class="{'modal-header--noborder' : !modalTitle}" tabindex="0" v-on:keydown="stopTabbing">
              <span class="modal__close" v-on:click="newIsOpen = false"></span>
              <h5 class="modal-title w-100">{{modalTitle}}</h5>
            </div>
            <div class="modal-body" v-bind:class="bodyClasses">
              <slot name="modalBody">
                default content
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'modal',
  props: {
    isOpen: {
      type: Boolean,
      twoWay: true,
      default: false
    },
    modalSize: String,
    modalTitle: String,
    clickedBack: {
      type: Boolean,
      default: true
    },
    bodyClasses: {
      type: Array,
      default: () => []
    }
  },
  mounted () {
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' || event.keyCode === 27) {
        this.newIsOpen = false
      }
    })
  },
  watch: {
    newIsOpen: function (val) {
      if (val) {
        this.$emit('modalClose')
        this.body.className = 'modal-open'
      } else {
        this.body.className = ''
      }
    }
  },
  data () {
    return {
      body: document.body,
      newIsOpen: JSON.parse(this.isOpen)
    }
  },
  methods: {
    stopTabbing (e) {
      if ((e.which === 9 && e.shiftKey)) {
        e.preventDefault()
      }
    }
  }
}
</script>
