/**
 * Created by mackxu on 2017/7/6.
 */

const concat = Array.prototype.concat;

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

exports.addCDNForEnter = (enteies) => {
    const path = 'http://cms.ptqy.gitv.tv/common/tv/';
    return enteies.map(entry => path + entry);
};

exports.reduceDimension = reduceDimension;
exports.dedupe = dedupe;
