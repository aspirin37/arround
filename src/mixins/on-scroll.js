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
        }
    }
}
