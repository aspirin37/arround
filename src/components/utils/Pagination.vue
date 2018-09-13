<template>
    <ul class="pagination mb-0 vertical-middle"
        v-if="count >= limit">
        <li class="page-item"
            v-bind:class="{'disabled' : currentPage === 0}">
            <span class="page-link px-3"
                  v-on:click.prevent="toPage(currentPage - 1)">‹</span>
        </li>
        <li class="page-item text-dark"
            v-bind:class="[{'active' : currentPage === 0}]"
            v-if="pages > 1">
            <a href="#"
               class="page-link"
               v-on:click.prevent="toPage(0)">1</a>
        </li>
        <li class="page-item pr-1"
            v-if="(currentPage - 1) > 1"></li>
        <li class="page-item"
            v-for="(page, index) in pages"
            v-bind:class="[{'active' : page === currentPage + 1}]"
            v-if="(Math.abs(page - currentPage) < 1 || Math.abs(currentPage - page + 1) < 2 || page == 1) && page !== pages && page !== 1"
            :key="index"><a href="#"
               class="page-link"
               v-on:click.prevent="toPage(index)">{{page}}</a></li>
        <li class="page-item pl-1"
            v-if="(currentPage + 3) < pages"></li>
        <li class="page-item"
            v-bind:class="[{'active' : pages === currentPage + 1}]"
            v-if="pages > 1">
            <a href="#"
               class="page-link"
               v-on:click.prevent="toPage(pages - 1)">{{pages}}</a>
        </li>
        <li class="page-item"
            v-bind:class="{'disabled' : currentPage === pages - 1}">
            <span class="page-link px-3"
                  v-on:click.prevent="toPage(currentPage + 1)">›</span>
        </li>
    </ul>
</template>
<script>
export default {
    name: 'pagination',
    props: ['count', 'limit'],
    data() {
        return {
            currentPage: 0,
        }
    },
    computed: {
        pages() {
            return Math.ceil(this.count / this.limit)
        },
    },

    methods: {
        toPage(index, push) {
            this.currentPage = index
            this.$emit('pageChanged', this.getOffset(index))
        },
        getOffset(i) {
            return i * this.limit
        },
    }
}
</script>