const http = require('http');
const fs = require('fs')
const path = require('path');

http.createServer((req, res) => {
  // let po = {}
  // req.url.split('?').forEach((params, index) => {
  //   if (index !== 0) {
  //     let keyValue = params.split('=')
  //     po[keyValue[0]] = keyValue[1]
  //   }
  // })
  // console.log(po);
  // if (po.a === '1') {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By","3.2.1");
    res.setHeader("Content-Type", "application/json;charset=utf-8");
  // }
  const filePath = path.join(__dirname, req.url)
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) console.error('not file')
    console.log(1);
    res.end(data)
  })
}).listen(821, '127.0.0.1')
// http://192.168.16.94:8080/
// http.createServer((req, res) => {
//   // let po = {}
//   // req.url.split('?').forEach((params, index) => {
//   //   if (index !== 0) {
//   //     let keyValue = params.split('=')
//   //     po[keyValue[0]] = keyValue[1]
//   //   }
//   // })
//   // console.log(po);
//   // if (po.a === '1') {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
//     res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.setHeader("X-Powered-By","3.2.1");
//     res.setHeader("Content-Type", "application/json;charset=utf-8");
//   
// }).listen(82, '127.0.0.1')










let num = Math.floor(((Math.random()*30)*10));
console.log(num);