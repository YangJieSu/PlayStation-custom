<template>
  <div>
    <Navbar></Navbar>

    <div class="banner">
      <div class="container">
        <h2>買到剁手手 ! 最後出清</h2>
        <p>This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
      </div>
    </div>

    <div class="cart">
      <div class="cart-icon" @click.prevent="showCart = !showCart">
        <i class="fas fa-shopping-cart"></i>
        <i class="fas fa-circle" v-if="cart.carts.length !== 0"></i>
      </div>
      <div class="cart-box" v-if="showCart">
        <div class="row justify-content-center bg-light border rounded">
          <div class="col-md-12">
            <!-- title -->
            <div class="d-flex justify-content-between py-2 px-0">
              <h5 class="m-0"><strong>購物車清單</strong></h5>
              <div>
                <button type="button" class="close m-0" @click.prevent="closeCart">
                  <span>&times;</span>
                </button>
              </div>
            </div>
            <!-- table -->
            <table class="table-sm my-2">
              <tbody>
                <tr v-if="cart.carts.length == 0">購物車還沒有東西喔!</tr>
                <tr v-for="(item, index) in cart.carts" :key="item.id">
                  <td>
                    <button type="button" class="btn btn-outline-danger btn-sm" @click.prevent="rempoveCart(item.id)"><i class="fas fa-trash-alt"></i></button>
                  </td>
                  <td>{{ item.product.title }}</td>
                  <td>{{ item.qty }}{{ item.product.unit }}</td>
                  <td class="text-right">{{ item.final_total | currency }}</td>
                </tr>
              </tbody>
            </table>
            <!-- button -->
            <router-link class="nav-item text-white" to="/create_order" v-if="cart.carts.length !== 0">
              <button type="button" class="btn btn-danger d-block w-100 mb-3" @click="closeCart">結帳去!</button>
            </router-link>
            <button type="button" class="btn btn-danger d-block w-100 mb-3" v-if="cart.carts.length == 0" @click.prevent="closeCart">繼續購物</button>
          </div>
        </div>
      </div>
    </div>

    <router-view @loadCart="getCart"></router-view>

    <div class="footer bg-light">
      <div class="container text-center">
        <div class="copyright d-flex align-items-baseline justify-content-center">
          <div class="h5">© Copright 2017 六角購物網</div>
          <div class="social-media">
            <a href="#" class="text-info"><i class="fab fa-instagram"></i>Instagrame</a>
            <a href="#" class="text-info"><i class="fab fa-instagram"></i>Facebook</a>
            <a href="#" class="text-info">About</a>
          </div> 
        </div>
        <p>Made with Bootstrap4</p> 
      </div>
    </div>

  </div>
</template>

<script>
import Navbar from '@/components/Navbar';

  export default {
    data() {
      return {
        cart: {
          carts: [],
        },
        showCart: false,
      };
    },
    components: {
      Navbar,
    },
    methods: {
      getCart() {
        // 取得購物車列表
        const vm = this;
        let api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;
        this.$http.get(api).then((response) => {
          console.log(response.data);
          vm.cart = response.data.data;
        });
      },
      rempoveCart(id) {
        // 刪除某一筆購物車
        const vm = this;
        let api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart/${id}`;
        this.$http.delete(api).then((response) => {
          console.log(response.data);
          vm.getCart();
        });
      },
      closeCart() {
        const vm = this;
        vm.showCart = false;
      },
    },
    created() {
      this.getCart();
    },
  };
</script>