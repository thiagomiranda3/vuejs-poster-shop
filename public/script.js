const PRICE = 9.99
const LOAD_NUM = 10

new Vue({
    el: "#app",
    data: {
        total: 0,
        items: [],
        results: [],
        cart: [],
        newSearch: "anime",
        lastSearch: "",
        loading: false,
        price: PRICE
    },
    methods: {
        appendItems: function () {
            let totalItems = this.items.length
            if(totalItems < this.results.length) {
                let appendItems = this.results.slice(totalItems, totalItems + LOAD_NUM)
                this.items = this.items.concat(appendItems)
            }
        },
        onSubmit: function () {
            if(!this.newSearch.length)
                return

            this.items = []
            this.loading = true
            this.$http
                .get('/search/'.concat(this.newSearch))
                .then(function (res) {
                    this.results = res.data
                    this.appendItems()
                    this.lastSearch = this.newSearch
                    this.loading = false
                })
        },
        addItem: function (index) {
            this.total += PRICE
            let item = this.items[index]

            for(let i = 0; i < this.cart.length; i++) {
                if(this.cart[i].id === item.id) {
                    this.cart[i].qty++
                    return
                }
            }

            this.cart.push({
                id: item.id,
                title: item.title,
                qty: 1,
                price: PRICE
            })
        },
        inc: function (item) {
            item.qty++
            this.total += PRICE
        },
        dec: function (item) {
            item.qty--
            this.total -= PRICE
            if(item.qty <= 0) {
                let pos = this.cart.indexOf(item)
                this.cart.splice(pos, 1)
            }
        }
    },
    filters: {
        moedaReal: function (price) {
            return 'R$ ' + price.toFixed(2)
        }
    },
    computed: {
        noMoreItems: function () {
            return this.items.length === this.results.length &&
                                         this.results.length > 0
        }
    },
    mounted: function () {
        let vueInstance = this
        this.onSubmit();

        const elem = document.getElementById("product-list-bottom")
        const watcher = scrollMonitor.create(elem)
        watcher.enterViewport(function () {
            vueInstance.appendItems()
        })
    }
})