const delay = require('mocker-api/utils/delay');
const { login } = require('./user');
const { getMenu } = require('./main.js');
const { FakeChartData } = require('./chart.js');


// 是否禁用代理
const MOCK = process.env.MOCK === 'true';

const proxy = {
 
  'GET /api/userinfo/:id': (req, res) => {
    console.log('-1--->', req.params)
    return res.json({
      id: req.params.id,
      username: 'kenny',
      sex: 6
    });
  },
  'GET /api/:owner/:repo/raw/:ref/(.*)': (req, res) => {
    const { owner, repo, ref } = req.params;
    // http://localhost:8081/api/admin/webpack-mock-api/raw/master/add/ddd.md
    // owner => admin
    // repo => webpack-mock-api
    // ref => master
    // req.params[0] => add/ddd.md
    return res.json({
      id: 1,
      owner, repo, ref,
      path: req.params[0]
    });
  },
  'GET /api/user/list/:id/:type': (req, res) => {
    const { type } = req.params;
    if (type === 'webpack') {
      return res.status(403).json({
        status: 'error',
        code: 403
      });
    }
    return res.json([
      {
        id: 1,
        username: 'kenny',
        sex: 6
      }, {
        id: 2,
        username: 'kenny',
        sex: 6
      }
    ]);
  },

  'DELETE /api/user/:id': (req, res) => {
    console.log('--2-->', req.body)
    console.log('--3-->', req.params.id)
    res.send({ status: 'ok', message: '删除成功！' });
  },
   //注意点： GET和POST中间只能有一个空格，不然会报404错误。
  'POST /api/user/login': login,
  'GET /api/main/getMenu': getMenu,
  
  'GET /api/fake_chart_data': FakeChartData,

  'GET /api/dashboard/chart':(req, res)=> {
    let result = null;
    switch (req.method) {
      case "GET":
        result = [100, 40, 78, 10, 30, 48];
        break;
      default:
        result = null;
    }
    // 返回你的mock数据。比如：
    res.json(result);
  }
}
console.log("解析mock/index.js文件");

module.exports = (!MOCK ? {} : delay(proxy, 1000));