// pages/details/details.js
//新闻详情页

Page({
  data: {
    id: '1552623252490', //调试模式
    //调试结束以后恢复
    //id: '',
    details: {},
  },


  onLoad(options) {
    //调试结束以后恢复
    /*this.setData({
      id: options.id
    })*/
    this.getDetail()
  },

  //获取新闻详情
  getDetail(callback) {
      wx.request({
        url: 'https://test-miniprogram.com/api/news/detail',
        data: {
          'id': this.data.id
        },
        success: res => {
          let details = res.data.result
          details.date = details.date.slice(0,10)
          this.setData({
            details: details
          })
          this.detailsContent(details.content)
        },
        complete: () => {
          callback && callback()
        }
      })
    },

  //判断新闻详情内容（content）是图片还是文字
  detailsContent(content) {
    console.log(content)
    let contentFormat = []
    for (let i = 0; i < content.length; i++) {
      contentFormat[i] = content[i].type === 'image' ? "<image class='content-image' src='{{content[i].firstImage}}' mode='aspectFill'></image>" : "<view class='content-para'>{{content[i].text}}</view>"
    }
    console.log(contentFormat)
  }
})