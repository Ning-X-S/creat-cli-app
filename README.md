第一次写 [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

运行
### `npm start`

打开[http://localhost:3000](http://localhost:3000)

### `npm test`

test

### `npm run build`

打包

### `npm run eject`

补充开发依赖

### 遇到的坑，有些可能是我使用的版本问题：

# class要使用 className

# render多行时加():
  return (
    <div className="about" >
      <p>这是关于页面</p>
      <div className="link">
        测试
        <Link to="/home">Go to home</Link>
      </div>
    </div>
  );

# 变量跟vue不同一个{}:

  <span>{item.id}</span>

# 循环渲染：
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

# 页面销毁时在componentWillUnmount中清楚定时器：
  componentWillUnmount() {
    console.log('son-componentWillUnmount')
    if (this.timer) clearTimeout(this.timer)
  }

# 巨坑，不能直接setState ( title: new Date()），我特么找了半天：
  // 不能设置new Date()
  // 真特么坑
  this.setState({
    title: new Date().getTime()
  })

# react-router 4.0以上， 最好使用 react-router-dom一套

  import { Route, BrowserRouter as Router } from 'react-router-dom'; // import { ConnectedRouter } from 'connected-react-router'


  <Router>
    <Route path="/home" component={Home} />            
    <Route path="/about" component={About} />
  </Router>
