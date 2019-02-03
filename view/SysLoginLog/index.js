
//获取数据
function ajaxRequest(params) {
   var loginName=$("#LoginName").val();
    $.ajax({
        type: "post",
        dataType: "json",
        url: "/sysLoginLog/getPageData?_t=" + new Date().getTime(),
        data:{"offset":params.data.offset,"limit":params.data.limit,"LoginName":loginName},
        success: function (ret) {
            console.log(ret);
            params.success({
                total: ret.data.rowCount,
                rows: ret.data.pageData
            });
        }
    })
}

$(function() {
    var $table = $('#table');
    $table.bootstrapTable({
      columns: [{
        title: 'LoginName',
        field: 'LoginName'
      }, {
        title: 'Ip',
        field: 'Ip'
      }, {
        title: 'LoginType',
        field: 'LoginType'
      }, {
        title: 'OtherInfo',
        field: 'OtherInfo'
      }]
    })
  })