```javascript
const array = [];
const arr = [];
array.push(arr);

// 二维数组降一维数组
array = array.flat();
```

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


```javascript
// language=PostgreSQL
hospitals = (
  await Promise.all(
    hospitals.map(it =>
      appDB.execute(
        `select hishospid as id from hospital_mapping where h_id = ?`,
        it
      )
    )
  )
)
  .filter(it => it.length > 0)
  .reduce(
    (result, current) => [...result, ...current.map(it => it.id)],
    []
  );
```