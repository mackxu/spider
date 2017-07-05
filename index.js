const downloadFile = require('./src/downloadFile');

// var fileUrl  = 'http://image.tianjimedia.com/uploadImages/2015/129/56/J63MI042Z4P8.jpg';
const fileUrl = 'http://cms.ptqy.gitv.tv/common/tv/vip/memberpackage.html';

downloadFile(fileUrl, function () {
		console.log(fileUrl + ' 下载完毕');
});