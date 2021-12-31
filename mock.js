const Mock = require("mockjs");

let num = Mock.mock({
  age1: 1,
  "age2|1-40": 1,
  "age3|+1": 5,
  "age4|1-2.1-10": 1,
});

let bool = Mock.mock({
  online1: false,
  "online2|1-10": false, // false的概率是 min / (min + max)
});

let obj = Mock.mock({
  "info|0-3": {
    "name|1-10": "李四",
    "age|1-100": 18,
    sex: "男",
  },
});

let arr = Mock.mock({
    "list|2":[
        "张三",
        "李四",
        "王五",
        {name:"张三",age:19,"arr":[
          1,
          2,
          3,
        ]}
    ]
})

// console.log(num);
// console.log(bool);
// console.log(obj);
console.log(arr);
