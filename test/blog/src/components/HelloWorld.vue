<template>
  <div class="hello">
    <button @click="getlist">获取列表</button>

    <iframe :src="src" frameborder="0" width="800px" ref="iframe" height:400px></iframe>
    <button @click="load">下载</button>
    <a href="http://localhost:8081/load">下载</a>
    <img src="http://localhost:8081/upload" alt="">
    <h3>文件上传：</h3>选择一个文件上传:
    <br>
    <form action="http://localhost:8081/upload  " method="post" enctype="multipart/form-data">
      <input type="file" name="imageFile" multiple="multiple">

      <br>

      <input type="button" @click="submit" value="上传文件">
    </form>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      src: "http://localhost:8080/#/home",
      iframeWin: {}
      //imgSrc: 'http://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E8%83%8C%E6%99%AF%E5%9B%BE%E7%89%87&step_word=&hs=0&pn=1&spn=0&di=13262768550&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=1647269653%2C444126782&os=1607223553%2C4096538868&simid=0%2C0&adpicid=0&lpn=0&ln=1946&fr=&fmq=1543283317318_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=13&oriquery=&objurl=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F8718367adab44aed7d1f3917b91c8701a08bfbf4.jpg&fromurl=ipprf_z2C%24qAzdH3FAzdH3Ffp5vh_z%26e3Bp7vi5g2_z%26e3Bv54AzdH3Ft4w2j%3Ft4w2jI1%3Dc09cbn0n89d8dcmac%26f576vj%3Dkwt17t4w2j&gsm=0&rpstart=0&rpnum=0&islist=&querylist=&selected_tags=0'
    };
  },
  mounted() {
    window.addEventListener("message", this.handleMessage);
    this.iframeWin = this.$refs.iframe.contentWindow;
  },
  methods: {
    getlist: function() {
      let sort1 = function() {
        return new Promise((resolve, reject) =>{
          let a = 7;
          if (a > 5) {
            resolve("我比你大");
          } else {
            reject("我比你小");
          }
        });
      };

      let sort2 = function() {
        return new Promise((resolve, reject) =>{
          let a = 8;
          if (a > 5) {
            resolve("我比你大");
          } else {
            reject("我比你小");
          }
        });
      };

      let sort3 = function() {
        return new Promise((resolve, reject) =>{
          let a = 6;
          if (a > 5) {
            resolve("我比你大");
          } else {
            reject("我比你小");
          }
        });
      };

     Promise.all([sort1(),sort2(),sort3()]).then(res=>{
       console.log(res)
     })

      const url = "/getUserList";
      this.$http.get(url).then(res => {
        console.log(res);
      });
    },
    submit: function() {
      // this.imgSrc='http://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=export%20default&step_word=&hs=0&pn=0&spn=0&di=27938421280&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=519484828%2C3609973328&os=4257155175%2C366872957&simid=0%2C0&adpicid=0&lpn=0&ln=429&fr=&fmq=1542966060311_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171114%2F4b963c059a7643da8b25cbe6077d8416.jpeg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Bf5i7_z%26e3Bv54AzdH3FwAzdH3Fda9dnc09m_9b0c8d&gsm=0&rpstart=0&rpnum=0&islist=&querylist=&selected_tags=0'
      console.log(this.imgSrc);
    },

    load: function(event) {
      const url = "/load";
      this.$http.get(url).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
