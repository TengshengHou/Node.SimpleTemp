var uuid = require('node-uuid');
var  dbcontext =require('../Repository/dbcontext')

var index=function name(req,res) {
    dbcontext.query('SELECT  *  FROM "SysLoginLog"', (err, ress) => {
        res.header("status",200)
        res.header("content-type",'application/x-javascript')
        console.log(err, ress);
         //dbcontext.end();
        res.send({"info_name":ress.rows});
       
    })
};

const inserSql='insert into "public"."SysLoginLog" ("Id","LoginName") values ($1,$2) ';
var insert=function name(req,res) {
    var values=[uuid.v4(),'adminte4xt'];
    dbcontext.query(inserSql,values, (err, ress) => {
        res.header("status",200)
        res.header("content-type",'application/x-javascript')
        console.log(err, ress);
         //dbcontext.end();
        res.send({"info_name":ress});
       
    })
};

module.exports ={
    index:index,
    insert:insert
}