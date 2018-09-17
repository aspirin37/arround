export default {
    methods: {
        onScroll(evt, action) {
            let table = evt.target,
                wrapper = table.firstElementChild

            let scrollTop = table.scrollTop,
                tableHeight = table.offsetHeight,
                wrapperHeight = wrapper.offsetHeight

            let diffHeight = wrapperHeight - tableHeight

            if(diffHeight <= scrollTop && !this.isScrollLoaderShown) {
                if(this.currentPage + 1 <= this.totalPages) {
                    action()
                }
            }

            let previous = table.scrollTop;
            let body = document.querySelector('body')
            if(body.clientWidth < 1200) {
                table.addEventListener('scroll', () => {
                    if(table.scrollTop > previous) {
                        this.$root.$emit('hide-menu')
                    } else {
                        this.$root.$emit('show-menu')
                    }
                    previous = table.scrollTop;
                })
            }
        }
    }
}
