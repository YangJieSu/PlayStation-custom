<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb container">
        <li class="breadcrumb-item"><router-link to="/">首頁</router-link></li>
        <li class="breadcrumb-item"><router-link to="/">商品</router-link></li>
        <li class="breadcrumb-item">{{ product.category }}</li>
        <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
      </ol>
    </nav>

    <!-- product -->
    <div class="container p-4">
      <div class="row justify-content-center mt-4">
        <div class="col-md-4">
          <h2 class="mb-4">{{ product.title }}</h2>
          <div class="d-flex justify-content-between">
            <div v-if="!product.price">{{ product.origin_price | currency }}</div>
            <del v-if="product.price" class="text-muted">原價{{ product.origin_price | currency }}</del>
            <div class="h5 text-danger" v-if="product.price">特價<strong>{{ product.price | currency }}</strong></div>
          </div>
          <nav aria-label="Page navigation example">
            <ul class="pagination mt-3">
              <li class="page-item" :class="{ 'active': sizeStatus == 'XS' }" @click.prevent="sizeStatus = 'XS'"><a class="page-link" href="#">XS</a></li>
              <li class="page-item" :class="{ 'active': sizeStatus == 'S' }" @click.prevent="sizeStatus = 'S'"><a class="page-link" href="#">S</a></li>
              <li class="page-item" :class="{ 'active': sizeStatus == 'M' }" @click.prevent="sizeStatus = 'M'"><a class="page-link" href="#">M</a></li>
              <li class="page-item" :class="{ 'active': sizeStatus == 'L' }" @click.prevent="sizeStatus = 'L'"><a class="page-link" href="#">L</a></li>
              <li class="page-item" :class="{ 'active': sizeStatus == 'XL' }" @click.prevent="sizeStatus = 'XL'"><a class="page-link" href="#">XL</a></li>
            </ul>
          </nav>
          <div class="d-flex">
            <select name="" class="form-control mr-2" id="" v-model="product.num">
            	<option value="0" selected disabled>請選擇商品數量</option>
              <option :value="num" v-for="num in 10" :key="num">選購 {{num}} {{product.unit}}</option>
            </select>
            <button class="btn btn-primary" @click.prevent="addCart(product.id, product.num)">
							<i class="fas fa-plus"></i>
							加入購物車
						</button>
          </div>
        </div>
        <div class="col-md-8">
          <img :src="product.imageUrl" class="shadow" alt="image">
        </div>
      </div>

      <div class="row justify-content-center mt-4">
        <div class="col-10">
          <div class="description">
            <h3 class="text-center">商品描述</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad harum, illum quidem quibusdam libero a neque eaque perferendis maxime omnis.</p>
          </div>
          <div class="productImg text-center mb-3" v-for="(image, index) in imgArray" :key="index">
            <img :src="image" class="img-fluid" alt="image">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ipsum est voluptatem dolorem sapiente tempora ex possimus sunt. Quos, magni.</p>
          </div>
          <div class="goBack text-right">
            <a href="#" class="btn btn-info text-white mt-2" @click.prevent="goBack">Back</a>
          </div>
        </div>
      </div>
    </div>



  </div>
</template>

<script>
import $ from 'jquery';
  export default {
    data() {
      return {
        isLoading: false,
        productId: '',
        product: {},
        imgArray: [],
        imgNum: 3,
        sizeStatus: '',
      };
    },
    methods: {
      getProduct() {
        // 取得單一商品內容
        const vm = this;
        let api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/product/${vm.productId}`;
        vm.isLoading = true;
        this.$http.get(api,).then((response) => {
          console.log(response.data);
          vm.product = response.data.product;
          vm.isLoading = false;
        });
      },
      productImg() {
        // 商品圖片
        const vm = this;
        const api = 'https://picsum.photos/480/360/?random';
        for (let i=0; i<vm.imgNum; i++) {
          vm.$http.get(api).then((response) => {
            console.log(response);
            vm.$set(vm.imgArray, i, response.request.responseURL);
            console.log(vm.imgArray);
          });
        };
      },
      addCart(id, qty=1) {
        // 加入購物車
        if (qty == 0){
          alert('請選擇商品數量');
        } else {
          const vm = this;
          let api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;
          const cart = {
            product_id: id,
            qty,
          };
          this.$http.post(api, { data: cart }).then((response) => {
            console.log(response.data);
            vm.getCart();
          });
          alert('已加入購物車!');
        };
      },
      getCart() {
        // 取得購物車
        const vm = this;
        let api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;
        vm.isLoading = true;
        this.$http.get(api,).then((response) => {
          console.log(response.data);
          vm.cart = response.data.data; 
          vm.isLoading = false;
        });
        vm.$emit('loadCart');
      },
      goBack() {
        this.$router.back();
      },
    },
    created() {
      this.productId = this.$route.params.productId;
      this.getProduct();
      this.productImg();
      document.body.scrollTop = 350;
      document.documentElement.scrollTop = 350;
    },
  };
</script>