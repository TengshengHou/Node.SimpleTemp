var helloController=require('./controller/helloController');
var accountController=require('./controller/AccountController');
var sysLoginLogController=require('./controller/SysLoginLogController');
var Route=function (app) {
  
    app.route('/hello/index').get(helloController.index);
    app.route('/hello/insert').get(helloController.insert);
    app.route("/sysLoginLog/getPageData").post(sysLoginLogController.getPageData);
    app.route("/Account/Login").post(accountController.login);  
};
module.exports = Route;
