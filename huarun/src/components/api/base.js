exports.install = function (Vue, options) {
    Vue.prototype.changeData = function (timeStamp) {
        var d = new Date(timeStamp);
        var datetime = d.getFullYear() + '-' +
          (d.getMonth() + 1) + '-' + d.getDate() + ' ' +
          d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        return datetime;
      }
    };

