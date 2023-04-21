```javascript
workItems.sort((a, b) => a.date.getTime() < b.date.getTime() ? 1 : -1)

return workItems.sort((a, b) => {
    const dateDiff = b.date.getTime() - a.date.getTime();
    if (dateDiff === 0) {
        return b.itemId > a.itemId ? 1 : -1;
    } else {
        return dateDiff;
    }
});

return workItems.sort((a, b) => {
    if (a.date.getTime() === b.date.getTime() && a.itemId === b.itemId) {
        return 1;
    }
    const names = [a.itemId, b.itemId].sort();
    if (
        a.date.getTime() > b.date.getTime() ||
        (a.date.getTime() === b.date.getTime() && b.itemId === names[0])
    ) {
        return -1;
    }
    return 1;
});

```