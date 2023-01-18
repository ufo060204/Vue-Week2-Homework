// 改為使用 Vue 來開發
import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";

const site = "https://vue3-course-api.hexschool.io/v2/";
const api_path = "ufo060204";

const app = createApp({
  data() {
    return {
      products: [],
      tempProduct: {},
    };
  },
  methods: {
    // 確認登入
    checkLogin() {
      // console.log(`${site}api/user/check`);
      const url = `${site}api/user/check`;
      axios.post(url)
        .then(res => {
          // console.log(res);
          this.getProducts();
        })
        .catch(err => {
          // console.log(err);
          window.location = './login.html';
        });
    },
    // 取得產品列表
    getProducts() {
      const url = `${site}api/${api_path}/admin/products`;
      axios.get(url)
        .then(res => {
          console.log(res);
          this.products = res.data.products;
          console.log(this.products);
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  mounted() {
    // 取出 token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)ufoToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    // axios headers 將 token 加入到 headers
    axios.defaults.headers.common["Authorization"] = token;
    this.checkLogin();
  },
});

app.mount("#app"); // 渲染
