exports.getMenu  = function(req, res){
    console.log("------getMenu 方法---------");
    let responseData = [
        { 
          index: '1',
          title: '导航一',
          class: 'el-icon-location',
          children :[
            {
              index:'12',
              title: 'Echarts',
              children :[
                  {
                    index:'/echarts',
                    title: 'Echarts示例'
                  },
                  {
                    index:'/chinamap',
                    title: '中国地图'
                  }
      
              ]
            },
            {
              index:'13',
              title: '组件通讯',
              children :[
                  {
                    index:'/vuebus',
                    title: 'vue-bus示例'
                  },
                  {
                    index:'/page2',
                    title: '选项13-2'
                  }
      
              ]
            },
            {
              index:'/page1',
              title: '选项4'
            },
            {
              index:'/page2',
              title: '选项5'
            },
          ]
         
        },
        {
          index: '/page1',
          class : 'el-icon-menu',
          title : '导航二'
        },
        {
          index: '/page2',
          class : 'el-icon-setting',
          title :'导航三'
        }
      ];

    return  res.json(responseData);
}
//module.exports =   getMenu;