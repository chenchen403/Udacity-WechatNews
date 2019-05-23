// pages/details/details.js
//新闻详情页

Page({
  data: {
    id: '',
    details: {},
    detailsContent: []
  },


  onLoad(options) {
    this.setData({
      id: options.id
    })
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
            details: details,
            detailsContent: details.content
          })
        },
        complete: () => {
          callback && callback()
        }
      })
    }

})