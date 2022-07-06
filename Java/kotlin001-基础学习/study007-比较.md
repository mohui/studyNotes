#### == 和 ===
- ==: 等效于java的equals 比较对象的结构是否相等
- ===: 比较对象的引用是否相等
```
val name1 = "Whh";
val name2 = "whh".capitalize() /// Whh
println(name1 == name2) //true;
println(name1 === name2) //false;
```