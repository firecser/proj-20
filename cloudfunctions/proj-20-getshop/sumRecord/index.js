const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();
const $ = db.command.aggregate;

// 聚合记录云函数入口函数
exports.main = async (event, context) => {
  // 返回数据库聚合结果
  return db.collection('proj-20-shop').aggregate() // 修改数据库名称
    .group({
      _id: '$region',
      sum: $.sum('$sales')
    })
    .end();
};
