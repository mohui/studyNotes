```javascript
const oldReturn = rows.reduce(
      (result, current) => {
        result.day = current.day;
        result.rate = current.rate;

        //累加items
        for (const item of result.items) {
          const currentItem = current.items.find(it => it.id === item.id);
          if (currentItem) {
            item.score += currentItem.score;
          }
        }
        for (const item of current.items) {
          const currentItem = result.items.find(it => it.id === item.id);
          if (!currentItem) {
            result.items.push(item);
          }
        }

        return result;
      },
      {
        day: month,
        rate: null,
        items: []
      }
    )
```