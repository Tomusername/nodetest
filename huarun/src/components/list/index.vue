<script>
import pagination from "../pagination/page.vue";
//import moment from "moment"
import Datepicker from "vuejs-datepicker";

export default {
  name: "list",
  data() {
    return {
      name: "tom",
      listData: [],
      appsData: [],
      statusData: [
        // { name: "全部", value: "" },
        { name: "待办", value: "undo", isSelected: true },
        { name: "已办", value: "done" }
      ],
      //account: 18666930547, //账号信息
      page: 1,
      count: 1, //每页请求数量
      startTime: "",
      endTime: "",
      tipsShow: false,
      code: "",
      actionAfter: false,
      isDelete: false,
      deleteData: {},
      appActionShow: false,
      tipMsg: "操作数据成功！",
      listReqData: {
        msgId: "",
        appId: "",
        account: "",
        startTime: "",
        endTime: "",
        todoStatus: "undo",
        page: 1,
        count: 10
      },
      endTime: "",
      startTime: "",
      pageSet: {
        totalRow: 100, //required option
        language: "cn", //default: 'cn'
        pageSizeMenu: [10, 20, 100] //default: [10, 20, 50, 100]
      },
      item: {},
      appPub: {
        appId: "",
        //appSecket:'',
        pubId: ""
        //pubSecket:'',
      },
      appId: ""
    };
  },
  components: {
    pagination,
    Datepicker
  },
  mounted() {
    //this.getList(),
    this.getApps();
  },
  //过滤器
  filters: {
    changeTime: function(timeStamp) {
      var d = new Date(timeStamp);
      var datetime =
        d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      //+ ' ' +d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
      return datetime;
    }
  },
  methods: {
    //列表接口数据
    getList: function() {
      function format(shijianchuo) {
        //shijianchuo是整数，否则要parseInt转换
        var time = new Date(shijianchuo);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y + "-" + m + "-" + d + "";
      }
      function changeData(timeStamp) {
        var d = new Date(timeStamp);
        var datetime =
          d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        //+ ' ' +d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        return datetime;
      }

      //列表数据接口
      //localhost:8080/todorepaire/undo?account=13728696911&page=1&count=10&startTime=2017-12-15 11:25:00&endTime=2017-12-15 11:26:00
      //this.startTime=changeData(this.listReqData.startTime)
      //this.endTime=changeData(this.listReqData.endTime)
      //console.log(startTime)
      var startTime = "";
      if (this.listReqData.startTime) {
        startTime = changeData(this.listReqData.startTime);
      }
      var endTime = "";
      if (this.listReqData.endTime) {
        endTime = changeData(this.listReqData.endTime);
      }
      let undoUrl =
        "/todorepaire/undo?account=" +
        this.listReqData.account +
        "&page=" +
        this.listReqData.page +
        "&count=" +
        this.listReqData.count +
        "&startTime=" +
        startTime +
        "&endTime=" +
        endTime +
        "&msgId=" +
        this.listReqData.msgId +
        "&status=" +
        this.listReqData.todoStatus +
        "&appId=" +
        this.listReqData.appId;

      this.$http.get(undoUrl).then(res => {
        this.listData = res.data.data.list;
        for (var i = 0; i < this.listData.length; i++) {
          this.listData[i].publishTime = format(this.listData[i].createTime);
        }

        this.items = res.data.data.list;

        this.pageSet.totalRow = res.data.data.totalCount;
        console.log(this.listData);

        //this.clearSearchData()
      });
    },
    //应用下拉数据
    getApps: function() {
      const appsUrl = "/todorepaire/apps";
      this.$http.get(appsUrl).then(res => {
        console.log(res.data.data);
        this.appsData = res.data.data;
        console.log(this.appsData);
        console.log(this.appsData);
      });
    },
    //从page组件传递过来的当前page
    pageChange(pInfo) {
      console.log(pInfo); //{pageNumber: 1, pageSize: 10}
      this.listReqData.page = pInfo.pageNumber;
      this.listReqData.count = pInfo.pageSize;
      this.getList();
    },
    //取消操作
    cancelAction: function() {
      this.tipsShow = false;
      this.appActionShow = false;
    },

    actionOk: function() {
      setTimeout(() => {
        this.actionAfter = false;
      }, 2000);
    },
    //删除代办
    deleteUndo: function(item, code) {
      const undoUrl = "/todorepaire/undo";
      this.isDelete = false;
      this.appDelete = false;
      this.item = item;
      this.appPub.appId = item.appId;
      console.log(item);
      this.deleteData = item;
      if (!item.appName) {
        //alert('buxing');
        this.appActionShow = true;
        return;
      }
      if (code == 1) {
        let postData = {
          appId: item.appId,
          oid: item.oid,
          msgId: item.msgId
        };
        this.$http({
          method: "delete",
          url: undoUrl,
          dataType: "json",
          contentType: "application/json",
          data: postData
        }).then(res => {
          console.log(res);
          if (res.data.code == 5007) {
            this.tipsShow = true;
            this.code = code;
          } else if (res.data.code == 200) {
            // this.actionOk();
            // this.getList();
            this.tipsShow = true;
            this.isDelete = true;
          }
          else if (res.data.code == 5008) {
            this.tipsShow = true;
            console.log(res.data.msg);
          }else if (res.success == false) {
          this.tipMsg = res.msg;
           this.actionAfter = true;
            this.actionOk();
        }
        });
      } else {
        console.log(this.item);
        var postData = {
          appId: this.item.appId,
          oid: this.item.oid,
          msgId: this.item.msgId
          // eid:101,
          // appId:item.appId,
          // oid:item.appId,
          // msgId:item.msgId
        };
        this.$http({
          method: "put",
          url: undoUrl,
          dataType: "json",
          contentType: "application/json",
          data: postData
        }).then(res => {
          console.log(res);
          if (res.data.code == 5007) {
            this.tipsShow = true;
            this.code = 2;
          } else if (res.data.code == 200) {
            this.getList();
            this.actionAfter = true;
            this.actionOk();
          } else if (res.data.code == 5008) {
            this.tipsShow = true;
            console.log(res.data.msg);
          }else if (res.success == false) {
          this.tipMsg = res.msg;
           this.actionAfter = true;
            this.actionOk();
        }
        });
      }
    },
    deleteOkClick: function() {
      const undoUrl = "/todorepaire/undo";
      //this.item = this.deleteData;
      this.appPub.appId = this.deleteData.appId;
      //console.log(item);
      let postData = {
        appId: this.deleteData.appId,
        oid: this.deleteData.oid,
        msgId: this.deleteData.msgId
      };
      this.$http({
        method: "delete",
        url: undoUrl,
        dataType: "json",
        contentType: "application/json",
        data: postData
      }).then(res => {
        console.log(res);
        if (res.data.code == 5007) {
          this.tipsShow = true;
          this.code = code;
        } else if (res.data.code == 200) {
          this.getList();
          this.actionAfter = true;
          this.tipsShow = false;
          this.actionOk();
        } else if (res.data.code == 5008) {
          this.tipsShow = true;
          console.log(res.data.msg);
        } else if (res.success == false) {
          this.tipMsg = res.msg;
           this.actionAfter = true;
            this.actionOk();
        }
      });
    },
    //点击确定按钮
    appPubClick: function() {
      let postData = {
        appId: this.appPub.appId,
        //appSecket:this.appPub.appSecket,
        pubId: this.appPub.pubId
        //pubSecket:this.appPub.pubSecket,
        //eid:this.appPub.eid,
      };
      const appPubUrl = "/todorepaire/appPub";
      this.$http({
        method: "post",
        url: appPubUrl,
        dataType: "json",
        contentType: "application/json",
        data: postData
      }).then(res => {
        console.log(res);
        if (res.data.code==200) {
          this.tipsShow = false;
          this.actionAfter = true;
          this.actionOk();
        }else if (res.success == false) {
          this.tipMsg = res.msg;
           this.actionAfter = true;
            this.actionOk();
        }
      });
    },
    //清空数据
    cancelData: function() {
      this.appPub.appId = "";
      this.appPub.pubId = "";
    },
    //清空搜索条件
    clearSearchData: function() {
      (this.listReqData.msgId = ""),
        (this.listReqData.appId = ""),
        (this.listReqData.account = ""),
        (this.listReqData.startTime = ""),
        (this.listReqData.endTime = ""),
        (this.listReqData.todoStatus = "");
    },
    //时间格式化
    customFormatter: function(shijianchuo) {
      //shijianchuo是整数，否则要parseInt转换
      var time = new Date(shijianchuo);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return y + "-" + m + "-" + d + "";
    },
    changeTime: function(timeStamp) {
      var d = new Date(timeStamp);
      var datetime =
        d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      //+ ' ' +d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
      return datetime;
    },
    getSearchList: function() {
      this.listReqData.page = 1;
      this.getList();
    }
  }
};
</script>
<template>
  <div>
    <header>待办管理</header>
    <div class="action-after" v-if="actionAfter">
      <p>
       {{tipMsg}}
      </p>
    </div>
    <div class="search-content">
      <div class='search-left'>
        <!-- <div>
          <label for="">标题：</label>
          <input type="text">
        </div> -->
        <div >
          <label for="">账号：</label>
          <input v-model="listReqData.account" type="text">
        </div>
        <div>
          <label for="">应333用：</label>
          <select v-model="listReqData.appId" name="" id="">
            <option v-for="item in appsData" v-bind:value="item.appid">{{item.appname}}</option>
          </select>
        </div>
        <div>
          <label for="">MsgId：</label>
          <input v-model="listReqData.msgId" type="text">
        </div>
        <div>
          <label for="">状态：</label>
          <select v-model="listReqData.todoStatus" name="" id="">
            <option value="undo" selected="true">待办</option>
            <option value='done'>已办</option>
          </select>
        </div>
        <div style="width:460px;">
          统计时间：
          <div style="display:inline-block">
            <datepicker v-model="listReqData.startTime" :format="customFormatter" @click="changeTime(listReqData.startTime)"></datepicker>至
            <datepicker v-model="listReqData.endTime" :format="customFormatter"></datepicker>
          </div>
        </div>
      </div>
      <div class="search-right">
        <button @click="getSearchList">
          查询
        </button>

      </div>
    </div>
    <div class="list-content">

      <table>
        <thead>
          <tr>
            <!-- <th width="100"><span class="checkbox cur" id="selectAll">
              </span></th> -->
            <th width="100">内容</th>
            <th width="100">应用名称</th>
            <th width="100">推送时间</th>
            <th width="100">MsgId</th>
            <th width="100">接收人</th>
            <th width="100">状态</th>
            <th width="100">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in listData">
            <!-- <td><span class='checkbox cur' id='selectOne'> </span></td> -->
            <td>{{item.content}}</td>
            <td>{{item.appName}}</td>
            <td>{{item.publishTime|changeTime}}</td>
            <td>{{item.msgId}}</td>
            <td>{{item.userName}}</td>
            <td v-if="item.todoStatus==='undo'">待办</td>
            <td v-if="item.todoStatus==='done'">已办</td>
            <td class="action">
              <span v-on:click="deleteUndo(item,1)">删除</span>
              <span v-if="item.todoStatus==='undo'" v-on:click="deleteUndo(item,2)">转已办</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <v-page :setting="pageSet" @page-change="pageChange"></v-page>
    <div v-show="tipsShow" style="width:100%; height:100%;position:fixed; top :0px;background-color:#000;background: rgba(0, 0, 0, 0.5);text-align:center">
      <div class="copywriting-tips addSoul">
        <div class="title">
          <span class="title-name">待办操作</span>
          <span class="cancel" @click="cancelAction">×</span>
        </div>
        <div class="content" v-if="!isDelete">
          <div>
            <label for="">appId：</label>
            <span style="display:inline-block;width:153px;text-align:left;padding-left:5px">{{appPub.appId}}</span>
          </div>
          <!-- <div>
            <label for="">appSecret：</label>
            <input v-model="appPub.appSecket" type="text">
          </div> -->
          <div>
            <label for="">公共号编码：</label>
            <input v-model="appPub.pubId" type="text">
          </div>
          <!-- <div>
            <label for="">公共号密钥：</label>
            <input v-model="appPub.pubSecket" type="text">
          </div> -->
          <!-- <div>
            <label for="">eid：</label>
            <input v-model="appPub.eid" type="text">
          </div> -->

        </div>
        <div class="content" v-if="isDelete">
          <!-- <div>
            <label for="">appId：</label>
            <span style="display:inline-block;width:153px;text-align:left;padding-left:5px">{{appPub.appId}}</span>
          </div> -->
          <!-- <div>
            <label for="">appSecret：</label>
            <input v-model="appPub.appSecket" type="text">
          </div> -->
          <div>
            确认要删除吗？
          </div>
          <!-- <div>
            <label for="">公共号密钥：</label>
            <input v-model="appPub.pubSecket" type="text">
          </div> -->
          <!-- <div>
            <label for="">eid：</label>
            <input v-model="appPub.eid" type="text">
          </div> -->

        </div>
        <div class="action" v-if="!isDelete">
          <div class="action-con" style="margin-left:60px;margin-top:70px;">
            <div id="action-cancel">
              <button class="cancel" @click="cancelAction">取消</button>
            </div>
            <div id="mainAdd" style="margin-left:45px;">
              <button class="ok" @click="appPubClick()">确定</button>
            </div>
          </div>
        </div>

        <div class="action" v-if="isDelete">
          <div class="action-con" style="margin-left:60px;margin-top:70px;">
            <div id="action-cancel">
              <button class="cancel" @click="cancelAction">取消</button>
            </div>
            <div id="mainAdd" style="margin-left:45px;">
              <button class="ok" @click="deleteOkClick()">确定</button>
            </div>
          </div>
        </div>


      </div>
    </div>

 <div v-show="appActionShow" style="width:100%; height:100%;position:fixed; top :0px;background-color:#000;background: rgba(0, 0, 0, 0.5);text-align:center">
      <div class="copywriting-tips addSoul">
        <div class="title">
          <span class="title-name">待办操作</span>
          <span class="cancel" @click="cancelAction">×</span>
        </div>
        <div class="content">
          <div>
            异常数据，Appid为空，
            请到APP上进行此操作!
          </div>
        </div>
        <div class="action">
          <div class="action-con" style="margin-left:60px;margin-top:70px;">
            <div id="action-cancel">
              <button class="cancel" @click="cancelAction">取消</button>
            </div>
            <div id="mainAdd" style="margin-left:45px;">
              <button class="ok" @click="cancelAction()">确定</button>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>
<style lang="sass" scoped>
  @import 'index.scss'

</style>
