<template>
  <div class="container">
    <loading :active.sync="isLoading"></loading>

    <!-- step -->
    <div class="row justify-content-center my-4">
      <div class="col-md-10">
        <h3 class="text-center"><strong>購物車清單</strong></h3>
        <div class="row mt-4 justify-content-center text-center">
          <div class="col-md-4"><span class="step" :class="{ 'current-step': step == 1 }">1. 確認購買清單</span></div>
          <div class="col-md-4"><span class="step" :class="{ 'current-step': step == 2 }">2. 填寫收件資料</span></div>
          <div class="col-md-4"><span class="step" :class="{ 'current-step': step == 3 }">3. 完成訂單!</span></div>
        </div>
      </div>
    </div>

    <!-- step 1-->
    <div class="row justify-content-center mb-4" v-if="step == 1">
      <div class="col-md-10">
        <table class="table mt-4">
          <thead>
            <th class="text-danger text-center" v-if="cart.carts.length !== 0" @click.prevent="removeAll()">
              <i class="fas fa-trash-alt"></i>
              <strong>全部清空</strong>
            </th>
            <th>商品</th>
            <th class="text-right">數量</th>
            <th class="text-right" v-if="cart.final_total !== cart.total">折扣價</th>
            <th v-else class="text-right">售價</th>
          </thead>
          <tbody>
            <tr v-if="cart.carts.length == 0">還未購買任何商品!</tr>
            <tr v-for="(item, index) in cart.carts" :key="index">
              <td class="text-center align-middle">
                <button class="btn btn-outline-danger btn-sm" @click.prevent="removeCart(item.id)"><i class="fas fa-trash-alt"></i></button>
              </td>
              <td class="align-middle">
                {{ item.product.title }}
                <div class="text-success" v-if="item.coupon">已套用優惠券</div>
              </td>
              <td class="text-right align-middle">{{ item.qty }}{{item.product.unit}}</td>
              <td class="text-right align-middle">{{ item.final_total | currency }}</td>
            </tr>
          </tbody>
          <tfoot v-if="cart.carts.length !== 0">
            <tr>
              <td colspan="3" class="text-right">總計金額</td>
              <td class="text-right">{{ cart.total | currency }}</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <td colspan="3" class="text-right">折扣後金額</td>
              <td class="text-right">{{ cart.final_total | currency }}</td>
            </tr>
          </tfoot>
        </table>
        <div class="input-group input-group-sm mb-4">
          <input type="text" class="form-control p-2" placeholder="請輸入優惠碼" v-model="coupon_code">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click.prevent="addCoupon">套用優惠碼</button>
          </div>
        </div>
      </div>
    </div>

    <!-- step 2 -->
    <div class="row justify-content-center mb-4" v-if="step == 2">
      <div class="col-md-8 mb-4">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">購物車明細</h5>
          </div>
          <div class="card-body">
            <table class="table">
              <thead>
                <th>商品</th>
                <th class="text-right">數量</th>
                <th class="text-right" v-if="cart.final !== cart.total">折扣價</th>
                <th v-else class="text-right">售價</th>
              </thead>
              <tbody>
                <tr v-for="(item, index) in cart.carts" :key="index">
                  <td class="align-middle">{{ item.product.title }}</td>
                  <td class="text-right align-middle">{{ item.qty }}{{item.product.unit}}</td>
                  <td class="text-right align-middle">{{ item.final_total | currency }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="text-danger">
                  <td colspan="2" class="text-right">
                    <span v-if="cart.final_total==cart.total">總計金額</span>
                    <span v-else>折扣後金額</span>
                  </td>
                  <td class="text-right">{{ cart.final_total | currency }}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      <form class="col-md-8">
        <div class="form-group">
          <label for="useremail">Email</label>
          <input type="email" id="useremail" name="email" class="form-control" placeholder="請輸入Email"
          v-model="form.user.email"
          v-validate="'required|email'"
          :class="{ 'is-invalid': errors.has('email') }">
          </input>
          <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
        </div>
        <div class="form-group">
          <label for="username">收件人姓名</label>
          <input type="text" id="username" name="name" class="form-control" placeholder="請輸入姓名"
          v-model="form.user.name"
          v-validate="'required'"
          :class="{ 'is-invalid': errors.has('name') }">
          </input>
          <span class="text-danger" v-if="errors.has('name')">姓名欄位不可空白</span>
        </div>
        <div class="form-group">
          <label for="usertel">收件人電話</label>
          <input type="tel" id="usertel" name="tel" class="form-control" placeholder="請輸入電話"
          v-model="form.user.tel"
          v-validate="'required'"
          :class="{ 'is-invalid': errors.has('tel') }">
          </input>
          <span class="text-danger" v-if="errors.has('tel')">請輸入連絡電話</span>
        </div>
        <div class="form-group">
          <label for="useraddress">收件地址</label>
          <input type="address" id="useraddress" name="useraddress" class="form-control" placeholder="請輸入地址"
          v-model="form.user.address"
          v-validate="'required'"
          :class="{ 'is-invalid': errors.has('useraddress') }">
          <span class="text-danger" v-if="errors.has('useraddress')">地址欄位不可空白</span>
          </input>
        </div>
        <div class="form-group">
          <label for="usermessage">留言</label>
          <textarea name="message" id="usermessage" class="form-control" cols="30" rows="10"
          v-model="form.message"></textarea>
        </div>
      </form>
    </div>

    <!-- step 3 -->
    <div class="row justify-content-center" v-if="step == 3">
      <form class="col-md-6" @submit.prevent="payOrder">
        <table class="table">
          <thead>
            <th>品名</th>
            <th class="text-center">數量</th>
            <th class="text-right">總價</th>
          </thead>
          <tbody>
            <tr v-for="(item, index) in order.products" :key="item.id">
              <td>{{ item.product.title }}</td>
              <td class="text-center">{{ item.qty }}{{ item.product.unit }}</td>
              <td class="text-right">{{ item.final_total | currency }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="text-danger">
              <td colspan="2" class="text-right">
                <span>總計</span>
              </td>
              <td class="text-right">{{ order.total | currency }}</td>
            </tr>
          </tfoot>
        </table>
        <table class="table">
          <tbody>
            <tr>
              <th>Email</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th>姓名</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th>收件人電話</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th>收件人地址</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span v-if="!order.is_paid">尚未付款</span>
                <span v-else class="text-success">付款完成</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-right" v-if="order.is_paid === false">
          <button class="btn btn-danger">確認付款去</button>
        </div>
      </form>
    </div>


    <!-- button -->
    <div class="row justify-content-center my-4">
      <div :class="{ 'col-md-4': cart.total !== 0 }">
        <router-link class="btn btn-outline-info" to="/">< < 繼 續 逛</router-link>
      </div>
      <div class="col-md-6 text-right" v-if="cart.total !== 0">
        <button tupe="button" class="btn btn-info" v-if="step == 2" @click.prevent="stepChange('prev')">上一步</button>
        <button tupe="button" class="btn btn-info" v-if="step == 1" @click.prevent="stepChange()">下一步:填寫收件資料</button>
        <button tupe="button" class="btn btn-danger" v-if="step == 2" @click.prevent="createOrder">下一步:完成訂單!</button>
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
        step: 1,
        cart: {
          carts: [],
        },
        coupon_code: '',
        form: {
          user: {
            email: '',
            name: '',
            tel: '',
            address: '',
          },
          message: '',
        },
        orderId: '',
        order: {
          user: {
            email: '',
            name: '',
            tel: '',
            address: '',
          },
        },
      };
    },
    methods: {
      getCart() {
        // 取得購物車列表
        const vm = this;
        let api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;
        vm.isLoading = true;
        this.$http.get(api).then((response) => {
          console.log(response.data);
          vm.cart = response.data.data;
          vm.isLoading = false;
          vm.$emit('loadCart');
        });
      },
      removeCart(id) {
        // 刪除某一筆購物車
        const vm = this;
        let api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart/${id}`;
        this.$http.delete(api).then((response) => {
          console.log(response.data);
          vm.getCart();
        });
      },
      removeAll() {
        // 刪除全部購物車商品
        const vm = this;
        vm.cart.carts.forEach(function(item){
          let api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart/${item.id}`;
          vm.$http.delete(api).then((response) => {
            console.log(response.data);
            vm.getCart();
          });
        });
      },
      addCoupon() {
        // 套用優惠券
        const vm = this;
        let api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/coupon`;
        const coupon = {
          code: vm.coupon_code,
        };
        vm.isLoading = true;
        this.$http.post(api, { data: coupon }).then((response) => {
          console.log(response.data);
          vm.getCart();
          vm.isLoading = false;
        });
      },
      stepChange(step) {
        // 步驟切換
        const vm = this;
        if (vm.step == 1){
          vm.step = 2;
        } else {
          if (step == 'prev'){
            vm.step -= 1;
          } else {
            vm.step += 1;
          };
        };
      },
      createOrder() {
        // 建立訂單
        const vm = this;
        let api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/order`;
        this.$validator.validate().then(result => {
          if (result) {
            this.$http.post(api, { data: vm.form }).then((response) => {
              console.log(response);
              if (response.data.success){
                vm.step = 3;
                vm.orderId = response.data.orderId;
                vm.getOrder();
              };
            });
          } else {
            console.log('訂單欄位不完整');
          };
        });
      },
      getOrder() {
        // 取得訂單
        const vm = this;
        let api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/order/${vm.orderId}`;
        this.$http.get(api).then((response) => {
          console.log(response.data);
          vm.order = response.data.order;
        });
      },
      payOrder() {
        const vm = this;
        let api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/pay/${vm.orderId}`;
        this.$http.post(api).then((response) => {
          console.log(response.data);
          if(response.data.success){
            vm.getOrder();
            vm.$emit('loadCart');
          };
        });
      },
    },
    created() {
      this.getCart();
    },
  };
</script>