```javascript
import * as cheerio from 'cheerio';
import axios from 'axios';

export default class Test {
  test() {
    const KEYWORD = '费德勒';
    const KEYWORD_REG = new RegExp(KEYWORD, 'i');
    const newsArray = [];

    axios
      .get('http://sports.sina.com.cn/tennis/')
      .then(response => {
        if (response.status === 200) {
          const $ = cheerio.load(response.data, {
            decodeEntities: false
          });
          const newsList = $('a[href]');
          for (let i = 0; i < newsList.length; ++i) {
            const obj = $(newsList[i]);
            const text = $(newsList[i]).text();
            //收集数据
            if (KEYWORD_REG.test(text)) {
              newsArray.push({
                title: text.trim(),
                href: obj.attr('href')
              });
            }
          }
        }
      })
      .catch(e => {
        console.log('爬虫失败了');
        console.log(e);
      });
  }
}
```