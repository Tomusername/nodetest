
<script>
  //js
  export default {
    name: 'pagination',
    props: ['total'], //父组件传过来的总条数
    data() {
      return {
        current: 0, //当前页数
        pagination: '', //可以分的页数
        pageNum: 10, //每页显示的条数，默认为10
        totals: '' //总条数
      }
    },
    watch: {
      //这里用到了watch来监听初始父组件传过来的值
      total(e) {
        this.totals = e;
        this.pagination = Math.ceil(this.totals / this.pageNum); //拿到可以分的页数
      }
    },
    methods: {
      //点击事件获取当前页数传给父组件
      clickCurrent(index) {
        if (index < 0 || index > this.pagination - 1) {
          return
        } else {
          this.current = index;
          let data = {
            index: index,
            pN: this.pageNum
          };
          this.$emit('fetchDatas', data.index, data.pN); //这里是关键点击事件里面就是依靠$emit来传值给父组件的，具体的可以参考vue的api
          //写到这里也基本上就完成了；
        }
      }
    }
  }

</script>

<template>
   <div class='page-warp'>
    <ul class='pagination'>
      <li :class="{'disabled':this.current < 1}">
        <a href='javascript:;' @click='clickCurrent(current-1)'>
          上一页
        </a>
      </li>
      <li :class="{'disabled':this.current < 1}">
        <a href="javascript:;" @click="clickCurrent(0)">
          1
        </a>
      </li>
      <li :class="{'disabled':this.current < 1}">
        ···
      </li>
      <li v-for="page in pagination">
        <a :class="{skin:page == current+1,'disabled':page < current || page > current+2 || page == 1 || page == pagination }"
          v-text="page" href="javascript:;" @click="clickCurrent(page-1)">
        </a>
      </li>
      <li :class="{'disabled':this.current < 1}">
        ···
      </li>
      <li :class="{'disabled': this.current+1 == pagination}">
        <a v-text="pagination" href="javascript:;" @click="clickCurrent(pagination-1)">
        </a>
      </li>
      <li :class="{'disabled': this.current+1 == pagination}">
        <a href="javascript:;" @click="clickCurrent(current+1)">
          下一页
        </a>
      </li>
      <li>
        <a href="javascript:;">
          共<span v-text="pagination"></span>页
        </a>
      </li>
    </ul>
  </div>
</template>



<style>
  .pagination>li {
    display: inline;
  }

  .pagination>.disabled>a,
  .pagination>.disabled>a:hover,
  .pagination>.disabled>span,
  .pagination>.disabled>span:hover {
    color: #777;
    cursor: not-allowed;
  }

  .pagination>li>.skin {
    color: deepskyblue;
  }

  .pagination>li>a,
  .pagination>li>span {
    padding: 3px 5px;
    color: #000;
  }

  .disabled {
    display: none;
  }

</style>
