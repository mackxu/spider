const async = require('async');

const getLinks = async.asyncify(require('./src/getLinks'));
const downloadFile = require('./src/downloadFile');
const concat = Array.prototype.concat;


const entries = [
	'http://cms.ptqy.gitv.tv/common/tv/vip/memberpackage.html',
	'http://cms.ptqy.gitv.tv/common/tv/vip/memberrights.html',
	'http://cms.ptqy.gitv.tv/common/tv/subject2/index.html',
];
/**
 * 二维数组转一维
 * @param {Array} arr
 * @return []
 */
const reduceDimension = arr => concat.apply([], arr);
/**
 * 数组去重
 * @param {Array} arr
 * @return []
 */
const dedupe = arr => Array.from(new Set(arr));

async.map(entries, getLinks, (err, links) => {
	if(err) {
		console.log(err);
		return false;
	}
	links = dedupe(reduceDimension(links));
	console.log(links);

	async.each(links.concat(entries), downloadFile, (err) => {
		if(err) {
			console.log(err);
		}
	})
});
