<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :immediate-check="false"
    @load="onLoad">
    <slot :data="list" />
  </van-list>
</template>

<script>
export default {
  name: 'list',

  props: {
    // 参数
    query: {
      type: Object,
      default: () => {}
    },
    // 请求函数
    request: Function
  },

  data () {
    return {
      loading: false,
      finished: false,
      params: {
        ...this.query,
        keyword: '',
        page: 0,
        size: 20
      },
      list: []
    }
  },

  mounted () {
    this.getData()
  },

  methods: {
    // 加载更多
    onLoad () {
      this.params.page++
      this.getData()
    },
    
    // 重新加载列表
    resetLoad (query = {}) {
      this.params = {
        ...this.params,
        ...query,
        page: 0,
        size: 20
      }
      this.list = []
      this.getData()
    },

    // 获取数据
    getData () {
      this.loading = true
      this.finished = false
      this.request && this.request(this.params).then(res => {
        this.loading = false
        if (this.params.keyword !== '') {
          this.list = this.list.concat(res.Payload)
          if (this.list.length === res.TotalCount) {
            this.finished = true
          }
        } else if (this.list.length === 0 && res.TotalCount === 0) {
          this.finished = true
        } else {
          this.list = this.list.concat(res.Payload)
          if (this.list.length === res.TotalCount) {
            this.finished = true
          }
        }
      })
    }
  }
}
</script>
