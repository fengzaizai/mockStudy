### mock.js是什么？

http://mockjs.com/0.1/

Mock.js 是一款模拟数据生成器，旨在帮助前端攻城师独立于后端进行开发，帮助编写单元测试。提供了以下模拟功能：

- 根据数据模板生成模拟数据
- 模拟 Ajax 请求，生成并返回模拟数据
- 基于 HTML 模板生成模拟数据

### 安装

```
npm install mockjs
```

或者：http://mockjs.com/dist/mock.js

### 语法规范

Mock.js 的语法规范包括两部分：

1. 数据模板定义规范（Data Template Definition，DTD）
2. 数据占位符定义规范（Data Placeholder Definition，DPD）

**数据模板中的每个属性由 3 部分构成：属性名、生成规则、属性值：**

```javascript
// 属性名   name
// 生成规则 rule
// 属性值   value
'name|rule': value
```

**生成格式**

```javascript
'name|min-max': value
'name|count': value
'name|min-max.dmin-dmax': value
'name|min-max.dcount': value
'name|count.dmin-dmax': value
'name|count.dcount': value
'name|+step': value
```

#### 数据模板定义规范：

#####　1.属性值是字符串 String

```javascript
1.'name|min-max': string
```

通过重复 `string` 生成一个字符串，重复次数大于等于 `min`，小于等于 `max`。

```javascript
2.'name|count': string
```

通过重复 `string` 生成一个字符串，重复次数等于 `count`。

#####　2.属性值是数字 Number

```javascript
1.'name|+1': number
```

属性值自动加 1，初始值为 `number`。

```javascript
2.'name|min-max': number
```

生成一个大于等于 `min`、小于等于 `max` 的整数，属性值 `number` 只是用来确定类型。

``` javascript
3.'name|min-max.dmin-dmax': number
```

生成一个浮点数，整数部分大于等于 `min`、小于等于 `max`，小数部分保留 `dmin` 到 `dmax` 位。

##### 3.属性值是布尔型 **Boolean**

```javascript
1.'name|1': boolean
```

随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率同样是 1/2。

```javascript
2.'name|min-max': value 
```

随机生成一个布尔值，值为 `value` 的概率是 `min / (min + max)`，值为 `!value` 的概率是 `max / (min + max)`。

##### 4.属性值是对象 Object

```javascript
1.'name|count': object
```

从属性值 `object` 中随机选取 `count` 个属性。

```javascript
2.'name|min-max': object
```

从属性值 `object` 中随机选取 `min` 到 `max` 个属性。

##### 5.属性值是数组 Array

```javascript
1.'name|1': array
```

从属性值 `array` 中随机选取 1 个元素，作为最终值。

```javascript
2.'name|+1': array
```

从属性值 `array` 中顺序选取 1 个元素，作为最终值。

```javascript
3.'name|min-max': array
```

通过重复属性值 `array` 生成一个新数组，重复次数大于等于 `min`，小于等于 `max`。

```javascript
4.'name|count': array
```

通过重复属性值 `array` 生成一个新数组，重复次数为 `count`。

##### 6.属性值是函数 Function

```javascript
1.'name': function
```

执行函数 `function`，取其返回值作为最终的属性值，函数的上下文为属性 `'name'` 所在的对象。

##### 7.属性值是正则表达式 **RegExp**

```javascript
1.'name': regexp
```

根据正则表达式 `regexp` 反向生成可以匹配它的字符串。用于生成自定义格式的字符串。

#### 数据占位符定义规范:

**占位符** 只是在属性值字符串中占个位置，并不出现在最终的属性值中。

**占位符** 的格式为：

```javascript
@占位符
@占位符(参数 [, 参数])
```

1. 用 `@` 来标识其后的字符串是 **占位符**。
2. **占位符** 引用的是 `Mock.Random` 中的方法。
3. 通过 `Mock.Random.extend()` 来扩展自定义占位符。
4. **占位符** 也可以引用 **数据模板** 中的属性。
5. **占位符** 会优先引用 **数据模板** 中的属性。
6. **占位符** 支持 **相对路径** 和 **绝对路径**。

### 使用

#### 引入

```html
<script src="http://mockjs.com/dist/mock.js"></script>
```

或

```javascript
import Mock from "mockjs"
```

...

#### Mock.mock()

```javascript
Mock.mock( rurl?, rtype?, template|function( options ) )
```

根据数据模板生成模拟数据。

```javascript
Mock.mock( template )
```

根据模板生成数据

```javascript
Mock.mock( rurl, template )
```

记录数据模板。当拦截到匹配 `rurl` 的 Ajax 请求时，将根据数据模板 `template` 生成模拟数据，并作为响应数据返回。

```javascript
Mock.mock( rurl, function( options ) )
```

记录用于生成响应数据的函数。当拦截到匹配 `rurl` 的 Ajax 请求时，函数 `function(options)` 将被执行，并把执行结果作为响应数据返回。

```javascript
Mock.mock( rurl, rtype, template )
```

记录数据模板。当拦截到匹配 `rurl` 和 `rtype` 的 Ajax 请求时，将根据数据模板 `template` 生成模拟数据，并作为响应数据返回。

```javascript
Mock.mock( rurl, rtype, function( options ) )
```

记录用于生成响应数据的函数。当拦截到匹配 `rurl` 和 `rtype` 的 Ajax 请求时，函数 `function(options)` 将被执行，并把执行结果作为响应数据返回。

**rurl**

可选。

表示需要拦截的 URL，可以是 URL 字符串或 URL 正则。例如 `/\/domain\/list\.json/`、`'/domian/list.json'`。

**rtype**

可选。

表示需要拦截的 Ajax 请求类型。例如 `GET`、`POST`、`PUT`、`DELETE` 等。

**template**

可选。

表示数据模板，可以是对象或字符串。例如 `{ 'data|1-10':[{}] }`、`'@EMAIL'`。

**function(options)**

可选。

表示用于生成响应数据的函数。

**options**

指向本次请求的 Ajax 选项集，含有 `url`、`type` 和 `body` 三个属性，参见 [XMLHttpRequest 规范](https://xhr.spec.whatwg.org/)。

##### 使用

```javascript
	
```

