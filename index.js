const async = require('async');

const getLinks = async.asyncify(require('./src/getLinks'));
const downloadFile = require('./src/downloadFile');
const utils = require('./src/utils');


const entries = [
	'http://cms.ptqy.gitv.tv/common/tv/vip/memberpackage.html',
	'http://cms.ptqy.gitv.tv/common/tv/vip/memberrights.html',
	'http://cms.ptqy.gitv.tv/common/tv/subject2/index.html',
];


async.map(entries, getLinks, (err, links) => {
	if(err) {
		console.log(err);
		return false;
	}
	links = utils.dedupe(utils.reduceDimension(links));
	console.log(links);

	// 下载文件保存到本地
	async.each(links.concat(entries), downloadFile, (err) => {
		if(err) {
			console.log(err);
		}
	})
});
