<template>
    <div class="rounded bg-white p-3 mb-3 main-filter">
        <div class="mb-3">
            <input type="text"
                   class="form-control"
                   v-model="searchText"
                   v-on:keyup="setQuery"
                   placeholder="Имя, телефон, почта, ID">
        </div>
        <a href="#"
           class="btn btn-default w-100"
           v-on:click.prevent="clearFilter">Очистить фильтр</a>
    </div>
</template>
<script>
export default {
    name: 'SearchFilter',
    data() {
        return {
            searchText: '',
        }
    },
    computed: {
        setQuery() {
            return this._.debounce(this.updateSearch, 300)
        }
    },
    methods: {
        clearFilter() {
            this.searchText = ''
            this.setQuery()
        },
        updateSearch() {
            this.$emit('search-updated', this.searchText)
        },
    }
}
</script>