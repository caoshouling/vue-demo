//卸载
npm uninstall lodash --save （save表示删除package.json下的记录）
//使用淘宝镜像提升速度
npm config set -g registry https://registry.npm.taobao.org
//初始化NPM
npm init
//webpack 4要同时安装webpack和 webpack-cli
//安装webpack
npm i -D webpack (npm install webpack --save-dev的简写 )
//安装webpack-cli
npm i -D webpack-cli
//安装webpack-dev-server
npm i -D webpack-dev-server
//css文件加载器
npm i -D css-loader style-loader
    用法： use: ['style-loader', 'css-loader'], 注意会先执行后面的'css-loader
    css-loader: 加载.css文件
    style-loader: 在打包生成的js文件中，动态创建<style>将css-loader内部样式注入head标签（所以在单独打包css的时候就要把rules里的style-loader去掉）

    1、使用css-loader+style-loader的方式是将样式打包进js文件，然后以style标签的形式嵌入页面。css样式与js文件混在一起可能导致一些样式混乱，
       所以使用插件将css样式统一打包进一个css文件，然后以link标签的形式嵌入页面进行资源请求。
    2、webpack3通常使用的是ExtractWebpackPlugin,
    3、在webpack4中已不再支持ExtractWebpackPlugin，官方推荐使用MiniCssExtractPlugin进行替代。
    4、webpack4建议使用mini-css-extract-plugin
       npm install --save-dev mini-css-extract-plugin

// ES6动态import插件插件
@babel/plugin-syntax-dynamic-import


----------------------------------------------npm 错误--------------------------------
1.build时，Cannot read property 'hash' of undefined
  解决：node_modules下的cache文件内容删除

"build": "webpack --progress --hide-modules --config webpack.prod.config.js"
其中：--progress --hide-modules 使生成的代码变少



-----------------------------------------------element -UI ：https://element.eleme.io/#/zh-CN/component/installation
npm i element-ui -S
//如果是按需引入，需要安装babel-plugin-component
npm install babel-plugin-component -D 

------------------------------------------Vue-Bus的使用--------------------------------------------------------------------------
// ...
created() {
  this.$bus.on('add-todo', this.addTodo);
  this.$bus.once('once', () => console.log('This listener will only fire once'));
},
beforeDestroy() {
  this.$bus.off('add-todo', this.addTodo);
},
methods: {
  addTodo(newTodo) {
    this.todos.push(newTodo);
  }
}
使用方式一：
methods: {
  addTodo() {
    this.$bus.emit('add-todo', { text: this.newTodoText });
    this.$bus.emit('once');
    this.newTodoText = '';
  }
}

使用方式二

// xxx.js
import Vue from 'vue';
Vue.bus.emit('someEvent');




