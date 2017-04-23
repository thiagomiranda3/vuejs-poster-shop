const PRICE = 9.99

new Vue({
    el: "#app",
    data: {
        total: 0,
        items: [],
        cart: [],
        newSearch: "anime",
        lastSearch: "",
        loading: false,
        price: PRICE
    },
    methods: {
        onSubmit: function () {
            this.items = []
            this.loading = true
            this.$http
                .get('/search/'.concat(this.newSearch))
                .then(function (res) {
                    this.items = res.data
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
    mounted: function () {
        this.onSubmit();
    }
})