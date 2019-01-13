<template>
  <div>
    <div class="products container">
      <loading :active.sync="isLoading"></loading>
      <div class="row mt-4">
        <div class="col-md-2">
          <ul class="list-group list-group-flush">
            <li class="list-group-item list-group-item-action">
              <a href="#" class="nav-link"  :class="{ 'active' : selected == 'all' }" @click.prevent="selected = 'all'">
                <i class="fas fa-suitcase"></i>全部系列
              </a>
            </li>
            <li class="list-group-item list-group-item-action">
              <a href="#" class="nav-link" :class="{ 'active' : selected == '上身類' }" @click.prevent="selected = '上身類'">
                <i class="fas fa-tshirt"></i>上身類
              </a>
            </li>
            <li class="list-group-item list-group-item-action">
              <a href="#" class="nav-link" :class="{ 'active' : selected == '外套類' }" @click.prevent="selected = '外套類'">
                <i class="fas fa-tshirt"></i>外套類
              </a>
            </li>
            <li class="list-group-item list-group-item-action">
              <a href="#" class="nav-link" :class="{ 'active' : selected == '褲裝類' }" @click.prevent="selected = '褲裝類'">
                <i class="fas fa-paw"></i>褲裝類
              </a>
            </li>
            <li class="list-group-item list-group-item-action">
              <a href="#" class="nav-link"  :class="{ 'active' : selected == '配件類' }" @click.prevent="selected = '配件類'">
                <i class="fas fa-tree"></i>配件類
              </a>
            </li>
          </ul>
        </div>
        <div class="col-md-10">
          <div class="product-list">
            <div class="row">
              <div class="col-md-4 mb-4" v-for="(item, index) in filterData" :key="item.id">
                <div class="card border-0 shadow mb-5 bg-white rounded">
                  <div class="product-img" style="height: 150px; background-size: cover; background-position: center"
                    :style="{backgroundImage : `url(${item.imageUrl})`}">
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">{{ item.title }}</h5>
                    <p class="card-text">{{ item.content }}</p>
                    <div class="d-flex justify-content-between">
                      <div class="h5" v-if="!item.price">{{ item.origin_price | currency }}元</div>
                      <del class="h5" v-if="item.price">{{ item.origin_price  | currency }}</del>
                      <div class="h5" v-if="item.price">{{ item.price | currency }}</div>
                    </div>
                  </div>
                  <div class="card-footer text-center">
                    <button type="button" class="btn btn-outline-info btn-sm" @click.prevent="goSingleProduct(item.id)">
                      <i class="fas fa-info"></i>
                      查看商品
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item" :class="{ 'disabled' : !pagination.has_pre }">
                  <a class="page-link" href="#" aria-label="Previous"
                    @click.prevent="getProducts(pagination.current_page - 1)">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                  </a>
                </li>
                <li class="page-item" v-for="(page, index) in pagination.total_pages" :key="index"
                  :class="{ 'active' : pagination.current_page == page }">
                  <a class="page-link" href="#" @click.prevent="getProducts(page)">{{ page }}</a></li>       
                <li class="page-item" :class="{ 'disabled' : !pagination.has_next }">
                  <a class="page-link" href="#" aria-label="Next"
                    @click.prevent="getProducts(pagination.current_page + 1)">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                  </a>
                </li>
              </ul>
            </nav>
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
        products: [],
        isLoading: false,
        pagination: {},
        selected: 'all',
      };
    },
    methods: {
      getProducts(page = 1) {
        const vm = this;
        let api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/products?page=${page}`;
        vm.isLoading = true;
        this.$http.get(api).then((response) => {
          console.log(response.data);
          vm.products = response.data.products.reverse();
          vm.pagination = response.data.pagination;
          vm.isLoading = false;
        });
      },
      goSingleProduct(id) {
        const vm = this;
        console.log(id);
        vm.$router.push(`/product/${id}`);                
      },
    },
    computed: {
      filterData() {
        const vm = this;
        if (vm.selected == 'all') {
          return vm.products;
        } else {
          return vm.products.filter(function(item){
            return item.category == vm.selected;
          });
        };
      },
    },
    created() {
      this.getProducts();
    },
  };
</script>