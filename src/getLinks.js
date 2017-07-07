/**
 * 解析html中的外链
 * Created by xuyadong on 2017/7/6.
 */

const request = require('request');
const cheerio = require('cheerio');

// 移除链接尾部的参数
const removeParamsOfUrl = url => {
	if(typeof url !== 'string') {
		return url;
	}
	const i = url.indexOf('?');
	if(i === -1) return url;
	return url.substring(0, i);
};

const getElsAttr = ($els, attr, $) => {
	const values = $els.map((i, el) => {
		const val = $(el).attr(attr);
		return removeParamsOfUrl(val);
	}).get();
	// 筛选出js、css文件的url
	return values.filter(url => /\.(css|js)$/.test(url));
};

const getStyleUrl = ($els, $) => getElsAttr($els, 'href', $);
const getScriptUrl = ($els, $) => getElsAttr($els, 'src', $);

const findLinks = (content) => {
	const $ = cheerio.load(content);
	// 收集页面内的外链资源路径
	const styles = getStyleUrl($('link'), $);
	const scripts = getScriptUrl($('script'), $);
	return styles.concat(scripts);
};

// 获取文件内容中的所有链接
const getLinks = (uri) => {
	return new Promise((resolve, reject) => {
		// 获取文件内容
		request(uri, (err, response, body) => {
			if(err) {
				reject(new Error(err));
				return false;
			}
			if(response.statusCode !== 200) {
				const { statusCode, statusMessage } = response;
				reject(new Error({
					statusCode,
					statusMessage
				}));
				return false;
			}

			// 查找到link、script的链接, 并返回
			resolve(findLinks(body));
		});
	});



};

module.exports = exports = getLinks;
