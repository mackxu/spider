/**
 * Created by mackxu on 2017/7/6.
 */

const request = require('request');
const fs = require('fs');
const url = require('url');
const path = require('path');

const distPath = path.join(__dirname, '..', 'dist');

const confirmUrlWithHttp = (url) => {
    if(url.indexOf('//') === 0) {
        return `http:${url}`;
    }
    return url;
};

// 根据uri创建dist目录
const createBuildDir = (uriPath) => {
	let pathtmp = distPath;
	let pathArr = path.dirname(uriPath).split('/');
	if(!fs.existsSync(distPath)) {
		fs.mkdirSync(distPath);
	}
	pathArr.forEach(function (dirname) {
		if (!dirname) return false;
		pathtmp = path.join(pathtmp, dirname);
		if (fs.existsSync(pathtmp)) return false;            // 检查目录是否存在
		fs.mkdirSync(pathtmp);
	})
};

const createFile = (path) => {
	// 根据路径创建文件夹
	createBuildDir(path);
	return fs.createWriteStream(distPath + path);
}

let seed = 1;

/* * url 网络文件地址 * callback 回调函数 */
const downloadFile = (uri, callback) => {
	uri = confirmUrlWithHttp(uri);
	const path = url.parse(uri).path;
	// 检查文件是否存在
	if (fs.existsSync(distPath + path)) {
		console.log(path + ' file exists!!');
		return false;
	}
	const stream = createFile(path);
	request(uri).pipe(stream).on('close', function() {
		console.log(`${seed++}: ${uri} loaded.`);
		callback && callback();
	});
}

module.exports = exports = downloadFile;
