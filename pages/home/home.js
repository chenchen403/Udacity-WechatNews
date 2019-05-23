// 程序主页面

const categoryMap = {
  '国内': 'gn',
  '国际': 'gj',
  '财经': 'cj',
  '娱乐': 'yl',
  '军事': 'js',
  '体育': 'ty',
  '其他': 'other',
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
    typeEN: 'gn',
    typeZH: '国内',
    selectedID: ''
  },
  onPullDownRefresh() {
    this.getNews(() => {
      wx.stopPullDownRefresh()
    })
  },
  onLoad(){
    this.getNews()
  },

  //获取新闻概览
  getNews(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        'type': this.data.typeEN
      },
      success: res => {
        let result = res.data.result
        let newsList = []
        for (let i = 0; i < result.length; i++) {
          newsList[i] = result[i]
          //console.log(newsList[i])
          newsList[i].date = result[i].date.slice(0, 10)
          newsList[i].firstImage = result[i].firstImage ? result[i].firstImage : '/images/placeholder.png'
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

  onTapChangeCategory(event) {
    let typeZH = event.currentTarget.dataset.category
    let typeEN = categoryMap[typeZH]
    this.setData ({
      typeEN: typeEN,
      typeZH: typeZH
    })
    this.getNews()
  },

  //获取选定新闻ID并且跳转到详情页面
  onTapDetails (event){
    let selectedID = event.currentTarget.dataset.id
    this.setData({
      selectedID: selectedID
    })
    wx.navigateTo({
      url: '/pages/details/details?id=' + this.data.selectedID,
    })
  },

  //下拉刷新
  onPullDownRefresh: function () {

  }
})