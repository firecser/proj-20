Page({
  data: {
    recommendList: [],
    skip: 0,
    limit: 3
  },
  onLoad() {
    this.fetchRecommendData();
  },
  onReachBottom() {
    this.setData({ skip: this.data.skip + this.data.limit });
    this.fetchRecommendData();
  },
  async fetchRecommendData() {
    try {
      const res = await wx.cloud.database().collection('proj-20-shop')
        .skip(this.data.skip)
        .limit(this.data.limit)
        .get();
      this.setData({
        recommendList: this.data.recommendList.concat(res.data)
      });
    } catch (e) {
      console.error('获取推荐数据失败', e);
    }
  }
})