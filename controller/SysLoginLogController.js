var uuid = require('node-uuid');
var dbcontext =require('../Repository/dbcontext')
var pageQuerySql='SELECT * FROM ' +
                   '( SELECT  *, ROW_NUMBER () OVER (ORDER BY "LoginLogTime") AS RowId FROM "SysLoginLog" ) AS b ' +
                   'WHERE RowId BETWEEN $1  AND $2'
const queryRowCountSql='SELECT  count(1) as rowCount FROM "SysLoginLog" ';

var getPageData=function (req,res) {
    //分页计算
    var begin=req.body.offset;
    var end=req.body.offset+req.body.limit;
    var loginName=req.body.LoginName;

    var values=[begin,end]
    //查询结果
    var pageData=[];
    var rowCount=0;

    // if(loginName&&loginName!=="");
    // {
    //    pageQuerySql+=' AND "LoginName" LIKE "%$3%"  ';
    //    values.push(loginName);
    // }

    dbcontext.query(pageQuerySql,values, (err, ress) => {
        //是否异常
        if(err)
        {
            console.log(err);
        }else
        {
            pageData=ress.rows;

            //查询数量
            dbcontext.query(queryRowCountSql, (err, ress) => {
                //是否异常
                if(err)
                {
                    console.log(err);
                }else
                {
                    rowCount=ress.rows[0].rowcount;
                    res.send({"data":{"pageData":pageData,"rowCount":rowCount}});
                }
            })
        }
    })
   
}

var insert =function (req,res) {
    const inserSql='insert into "public"."SysLoginLog" ("Id","LoginName","Name","Ip","OtherInfo","LoginType","LoginLogTime") values ($1,$2,$3,$4,$5,$6,$7) ';
    var entityObj=createLogInfo(req);
    var values=[entityObj.Id,entityObj.LoginName,entityObj.Name,entityObj.Ip,entityObj.OtherInfo,entityObj.LoginType,entityObj.LoginLogTime];
    //查询数量
    dbcontext.query(inserSql,values, (err, ress) => {
        //是否异常
        if(err)
        {
            console.log(err);
        }
    })
}

module.exports ={
    getPageData:getPageData,
    insert:insert
}


var createLogInfo=function (req) {
    return {
        "Id": uuid.v4(),
        "LoginName": req.body.LoginName,
        "Name": null,
        "Ip": getClientIP(req),
        "OtherInfo": req.headers['user-agent'],
        "LoginType": "Cookie",
        "LoginLogTime": new Date(),
    }
}

/**
 * @getClientIP
 * @desc 获取用户 ip 地址
 * @param {Object} req - 请求
 */
function getClientIP(req) {
    return req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
        req.connection.remoteAddress || // 判断 connection 的远程 IP
        req.socket.remoteAddress || // 判断后端的 socket 的 IP
        req.connection.socket.remoteAddress;
};