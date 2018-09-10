<template>
    <div class="rounded bg-white p-3 mb-3 main-filter">
        <div class="mb-3"
             v-if="queryGetted">
            <input type="text"
                   class="form-control"
                   v-model="searchText"
                   v-on:keyup="setOptions('search', searchText)"
                   placeholder="Имя, телефон, почта">
        </div>
        <div class="mb-3"
             v-if="queryGetted">
            <input type="text"
                   class="form-control"
                   v-model="userIds"
                   v-on:keyup="setOptions('ids', userIds.replace(/[a-zA-Z]|\.|-|/g, ''))"
                   placeholder="ID">
        </div>
        <small class="text-muted mb-1 mr-2 d-inline-block align-middle">Статус</small>
        <a href="#"
           class="text-dark link-reset"
           v-if="searchStatus.length"
           v-on:click="clearStatuses">✖</a>
        <div class="mb-3"
             v-if="queryGetted">
            <label class="custom-check d-block mb-2"
                   v-for="(status, index) in statuses"
                   :key="index">
                <input type="checkbox"
                       class="custom-check__input"
                       v-model="searchStatus"
                       :value="status.key"
                       v-on:change="setOptions('statuses', searchStatus.join(','))">
                <span class="custom-check__outer"><span class="custom-check__inner"></span></span>
                {{status.value}} <small class="text-muted"
                       v-if="countExt">({{countExt[index + 1]}})</small>
            </label>
        </div>
        <a href="#"
           class="btn btn-default w-100"
           v-on:click.prevent="clearFilter">Очистить фильтр</a>
    </div>
</template>
<script>
export default {
    name: 'users-filter',
    data() {
        return {
            searchStatus: [],
            options: {
                statuses: '',
                search: '',
                ids: ''
            },
            queryGetted: false,
            searchText: '',
            userIds: ''
        }
    },
    props: {
        countExt: {
            type: Object,
            value: {}
        },
        target: ''
    },
    computed: {
        statuses() {
            let statusesArray = []
            let stateStatuses = this.$store.state[this.target + 'Statuses']
            Object.keys(stateStatuses).map(key => {
                let item = {}
                item.key = +key
                item.value = stateStatuses[key]
                statusesArray.push(item)
            })
            return statusesArray
        }
    },
    components: {},
    beforeMount() {
        let newOpts = Object.assign({}, this.$route.query)
        delete newOpts.page

        new Promise((resolve) => {
            this._.merge(this.options, newOpts)
            resolve()
        }).then(() => {
            this.$emit('mountedSetted', newOpts)
        })
        this.setCurrentValues()
    },
    methods: {
        toggleModal(id) {
            this.$refs[id].newIsOpen = !this.$refs[id].newIsOpen
        },
        setCurrentValues() {
            let splitArray = (key) => {
                if (this.options[key].length > 0) {
                    return this.options[key].split(',')
                } else {
                    return []
                }
            }
            this.searchStatus = splitArray('statuses')
            this.searchText = splitArray('search')
            this.userIds = splitArray('ids')
            this.queryGetted = true
        },
        setOptions(key, value) {
            if (!value) {
                this.options[key] = ''
            } else {
                this.options[key] = value
            }
            this.setQuery()
        },
        clearFilter() {
            this.searchStatus = []
            this.searchText = ''
            this.userIds = ''
            this.options = {}
            for (let item in this.options) {
                this.options[item] = ''
            }
            this.setQuery()
        },
        clearStatuses() {
            this.searchStatus = []
            this.options.statuses = ''
            this.setQuery()
        },
        setQuery() {
            let options = {}
            for (let item in this.options) {
                if (this.options[item]) {
                    options[item] = this.options[item]
                } else {
                    delete options[item]
                }
            }
            this.$router.push({ query: options })
            this.$emit('setted', options)
        }
    }
}
</script>