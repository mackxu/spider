const async = require('async');
// import eachLimit from 'async/eachLimit';

const getLinks = async.asyncify(require('./src/getLinks'));
const downloadFile = require('./src/downloadFile');
const utils = require('./src/utils');
let entries = require('./src/entries');
entries = utils.addCDNForEnter(entries);
entries.sort();
console.log(`page count: ${entries.length}`);

// 获取线上的所有入口文件
async.eachLimit(entries, 2, downloadFile, err => {
  if (err) {
    console.log('index.js');
    console.log(err);
  }
});

// async.map(entries, getLinks, (err, links) => {
//     if(err) {
//         console.log(err);
//         return false;
//     }
//     links = utils.dedupe(utils.reduceDimension(links));
//     console.log(links);
//
//     // 下载文件保存到本地
//     async.each(links.concat(entries), downloadFile, (err) => {
//         if(err) {
//             console.log(err);
//         }
//     })
// });
