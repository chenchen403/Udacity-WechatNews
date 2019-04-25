// 程序主页面

const categoryMap = {
  'gn': '国内',
  'gj': '国际',
  'cj': '财经',
  'yl': '娱乐',
  'js': '军事',
  'ty': '体育',
  'other': '其他',
}

Page({
  data: {
    categoryNames: ['国内','国际','财经','体育','军事','娱乐','其他'],
    newsList : [{
      id: '',
      title: '',
      source: '',
      date: '',
      firstImage: ''
    }],
    type: 'gn',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(){
    this.getNews()
  },

//获取新闻概览
getNews(callback){
  wx.request({
    url: 'https://test-miniprogram.com/api/news/list',
    data: {
      'type': this.data.type
    },
    success: res => {
      let result = res.data.result
      let newsList = []
      for (let i = 0; i < 9; i++) {
        newsList[i] = result[i]
        newsList[i].date = result[i].date.slice(0, 10)
        newsList[i].firstImage = result[i].firstImage ? result[i].firstImage : '/images/placeholder.png'
        console.log(newsList[i])
      }
      this.setData({
        newsList: newsList
      })
    },
    complete: () => {
      callback && callback()
    }
  })
},
//获取新闻详情
getDetail(){

},
/**
 * 页面相关事件处理函数--监听用户下拉动作
 */
onPullDownRefresh: function () {

}
})