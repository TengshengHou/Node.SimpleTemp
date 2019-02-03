var uuid = require('node-uuid');
var dbcontext =require('../Repository/dbcontext')
var sysLoginLog =require('../controller/SysLoginLogController')

var login=function (req,res) {

    var values=[req.body.LoginName,req.body.Password]
    dbcontext.query('SELECT  *  FROM "SysUser" WHERE "LoginName"=$1 AND "Password"=$2 ',values, (err, ress) => {
        //是否异常
        if(err)
        {
            console.log(err);
        }
        //验证登陆
        if(ress.rows.length>0)
        {
            //颁发Cookie
            res.cookie('UserName',ress.rows[0].LoginName ,{'max':9000000,'httpOnly':true});
            sysLoginLog.insert(req,res);
            res.redirect(302, '/SysLoginLog/index.html')
        }else
        {
            res.redirect(302, '.')
        }
            
    })
}

module.exports ={
    login:login
}


