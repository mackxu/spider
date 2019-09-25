# spider
抓取文件并保存

### 发送请求
request(uri).pipe(stream)
### 把下载数据写入磁盘
fs.createWriteStream(distPath + path)
### 在数据中查找节点
$ = cheerio.load(content)
### 优化点：限制同一时间请求数量
async.eachLimit(coll, limit, iteratee, callbackopt)
