const products = [
    { id: 1, description: "Sagittaire", price: 12, img: "assets/img/Vogue-Horoscope-Illustrations-01.jpg" },
    { id: 2, description: "Capricorne", price: 20, img: "assets/img/Vogue-Horoscope-Illustrations-02.jpg" },
    { id: 3, description: "Verseau", price: 5, img: "assets/img/Vogue-Horoscope-Illustrations-03.jpg" },
    { id: 4, description: "Poisson", price: 8, img: "assets/img/Vogue-Horoscope-Illustrations-04.jpg" },
    { id: 5, description: "Gémeaux", price: 3, img: "assets/img/Vogue-Horoscope-Illustrations-05.jpg" },
    { id: 6, description: "Cancer", price: 65, img: "assets/img/Vogue-Horoscope-Illustrations-06.jpg" },
    { id: 7, description: "Lion", price: 25, img: "assets/img/Vogue-Horoscope-Illustrations-07.jpg" },
    { id: 8, description: "Balance", price: 28, img: "assets/img/Vogue-Horoscope-Illustrations-08.jpg" },
    { id: 9, description: "Vierge", price: 4, img: "assets/img/Vogue-Horoscope-Illustrations-09.jpg" },
    { id: 10, description: "Scorpion", price: 29, img: "assets/img/Vogue-Horoscope-Illustrations-10.jpg" },
    { id: 11, description: "Taureau", price: 87, img: "assets/img/Vogue-Horoscope-Illustrations-11.jpg" },
    { id: 12, description: "Bélier", price: 6, img: "assets/img/Vogue-Horoscope-Illustrations-12.jpg" },
  ];
  
  const Home = {
    template: "#home",
    name: "Home",
    data: () => {
      return {
        products,
        searchKey: "",
        liked: [],
        cart: [],
      };
    },
    computed: {
      filteredList() {
        return this.products.filter((product) => {
          return product.description.toLowerCase().includes(this.searchKey.toLowerCase());
        });
      },
      getLikeCookie() {
        let cookieValue = JSON.parse($cookies.get("like"));
        cookieValue == null ? (this.liked = []) : (this.liked = cookieValue);
      },
      cartTotalAmount() {
        let total = 0;
        for (item in this.cart) {
          total = total + this.cart[item].quantity * this.cart[item].price;
        }
        return total;
      },
      itemTotalAmount() {
        let itemTotal = 0;
        for (item in this.cart) {
          itemTotal = itemTotal + this.cart[item].quantity;
        }
        return itemTotal;
      },
    },
    methods: {
      setLikeCookie() {
        document.addEventListener("input", () => {
          setTimeout(() => {
            $cookies.set("like", JSON.stringify(this.liked));
          }, 300);
        });
      },
      addToCart(product) {
        // check if already in array
        for (let i in this.cart) {
          if (this.cart[i].id === product.id) {
            return this.cart[i].quantity++;
          }
        }
        this.cart.push({
          id: product.id,
          img: product.img,
          description: product.description,
          price: product.price,
          quantity: 1,
        });
      },
      cartPlusOne(product) {
        product.quantity = product.quantity + 1;
      },
      cartMinusOne(product, id) {
        if (product.quantity == 1) {
          this.cartRemoveItem(id);
        } else {
          product.quantity = product.quantity - 1;
        }
      },
      cartRemoveItem(id) {
        this.$delete(this.cart, id);
      },
    },
    mounted: () => {
      this.getLikeCookie;
    },
  };
  const UserSettings = {
    template: "<h1>UserSettings</h1>",
    name: "UserSettings",
  };
  const WishList = {
    template: "<h1>WishList</h1>",
    name: "WishList",
  };
  const ShoppingCart = {
    template: "<h1>ShoppingCart</h1>",
    name: "ShoppingCart",
  };
  const router = new VueRouter({
    routes: [
      { path: "/", component: Home, name: "Home" },
      { path: "/user-settings", component: UserSettings, name: "UserSetting" },
      { path: "/wish-list", component: WishList, name: "WishList" },
      { path: "/shopping-cart", component: ShoppingCart, name: "ShoppingCart" },
    ],
  });
  
  const vue = new Vue({
    router,
  }).$mount("#app");
  