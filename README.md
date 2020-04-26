## 第一次
 [Create React App](https://github.com/facebook/create-react-app).

## 运行
```bash
  'npm start
```
打开[http://localhost:3000](http://localhost:3000)

## test
```bash
  'npm test'
```

## 打包
```bash
  'npm run build'
```

### 补充开发依赖

```bash
  'npm run eject'
```





### 遇到的坑，有些可能是我使用的版本问题：




##### class要使用 className

##### render多行时加():
```javasctipt
  return (
    <div className="about" >
      <p>这是关于页面</p>
      <div className="link">
        测试
        <Link to="/home">Go to home</Link>
      </div>
    </div>
  );
```

##### 变量跟vue不同一个{}:
```javasctipt
  <span>{item.id}</span>
```

##### 循环渲染：
```javasctipt
  let element = []
  for (let index = 0; index < this.props.list.length; index++) {
    let item = this.props.list[index]
    element.push(<p key={item.id}>{item.name}</p>)
  }
  return (
    <div>
      <p> 图雀--{this.props ? this.props.name : ''}</p>
      <p>{this.state ? this.state.title : ''}</p>
      {element}
      {this.props.list[0].name}
    </div>
  )
```

##### 页面销毁时在componentWillUnmount中清楚定时器：
```javasctipt
  componentWillUnmount() {
    console.log('son-componentWillUnmount')
    if (this.timer) clearTimeout(this.timer)
  }
```

##### 巨坑，不能直接setState ( title: new Date()），我特么找了半天：
##### 记录一下不是坑，是我太菜哦，react中dom附值时不能直接取Object

```javasctipt
  // 不能设置new Date()
  // 真特么坑
  this.setState({
    title: new Date().getTime()
  })
```

##### react-router 4.0以上， 最好使用 react-router-dom一套
```javasctipt
  import { Route, BrowserRouter as Router } from 'react-router-dom'; // import { ConnectedRouter } from 'connected-react-router'

  <Router>
    <Route path="/home" component={Home} />            
    <Route path="/about" component={About} />
  </Router>
```

##### constructorcu初始化state时,等于一个对象
```javasctipt
  this.state = {
    init: '1231'
  }
```

##### 组件挂载时有关的生命周期

  constructor被调用是在组件准备要挂载的最一开始，所以此时组件尚未挂载到网页上
  componentWillMount方法的调用在constructor之后，在render之前，在这方法里的代码调用setState方法不会触发重渲染，所以它一般不会用来作加载数据之用，它也很少被使用到。
  render 方法必须要返回一个 JSX 元素。但这里要注意的是，必须要用一个外层的 JSX 元素把所有内容包裹起来，返回并列多个 JSX 元素是不合法的。
  一般的从后台(服务器)获取的数据，都会与组件上要用的数据加载有关，所以都在componentDidMount方法里面作。虽然与组件上的数据无关的加载，也可以在constructor里作，但constructor是作组件state初绐化工作，并不是设计来作加载数据这工作的，所以所有有副作用的代码都会集中在componentDidMount方法里。


##### Eslint坑 API ---  no-unused-expressions

  Line 64:9:  Expected an assignment or function call and instead saw an expression  no-unused-expressions