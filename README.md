# Vue.js 購物網站
## Demo
https://yangjiesu.github.io/PlayStation-custom/dist
## Intro
* 將後臺所建立的商品及購買系統利用 Ajax 將畫面呈現至前台客戶端
# 功能
本作品其主要功能有：
* 前台:商品展示、購物車清單、商品下單、優惠券套用、訂單列表、訂單結帳
<!-- ### 1. All Products
* 所有商品頁面
* 商品皆可於後台系統所建立

### 2. Single Product 
* 查看單一商品細節及訂購商品

### 3. Checkout 
* 購買清單及訂購人所需填的資料
* 使用 VeeValidate 進行資料驗證 -->
## Skills
* Vue Cli 2.0
* Vue Router
* Vue Component
* API的應用
* Bootstrap 4 + 手刻 SCSS 的混合應用
# 前台內容介紹
## 快速商品展示列
使用 swiper.js 製作成輪播元件，並可藉由傳入的 Props 切換不同的產品類別、商品名稱來提升靈活度
## 購物專區
重複使用「快速商品展示列」內的商品元件重新排版並製作商品搜尋、類別篩選、商品分頁功能，並於行動裝置時切換至快速商品展示列，避免頁面過長影響瀏覽體驗。
## 商品介紹
商品詳細介紹，選擇數量後即時顯示加總結果，方便使用者評估金額並加入購物車，提升使用體驗
## 購物車 & 訂單資料填寫 
主要分為兩個部分，右方為購物車內容，左方為整個購物車商品的加總，並可套用優惠券。<br>
表單部分具有驗證功能及提示，並於畫面上方放置步驟順序，提升操作體驗。
## 付款 & 付款完成頁面

## API Source
[六角學院 vue-course-api](https://github.com/hexschool/vue-course-api-wiki/wiki)
## Vue Plugins
* AJAX-[VuwAxios](https://www.npmjs.com/package/vue-axios)
* Loading-[Vue Loading Overlay](https://github.com/ankurk91/vue-loading-overlay)
* Validate-[VeeValidate](https://github.com/baianat/vee-validate)
* Swiper-[Swiper.js](http://idangero.us/swiper/)
