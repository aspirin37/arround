<template>
    <div>
        <div class="widget-min-height relative">
            <div class="d-flex align-items-start">
                <div class="widget-min-height w-100 relative">
                    {{ model }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import { UserApi } from '@/services/api'
export default {
    data() {
        return {

        }
    },
    computed: {
        model() {
            return this.$route.params.model || JSON.parse(localStorage.getItem('model'))
        }
    },
    created() {
        localStorage.setItem('model', JSON.stringify(this.model))
    },
    methods: {}
}
</script>