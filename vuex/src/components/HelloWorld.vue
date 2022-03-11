<template>
  <div class="hello">
    <a-input class="my-btn" :value="initialVal" @change="handleChange"></a-input>
    <a-button class="addContent"
              type="primary"
              @click="addList">添加到列表</a-button>
    <a-list class="demo-loadmore-list"
            item-layout="horizontal"
            :data-source="infoList">
      <a-list-item slot="renderItem"
                   slot-scope="item, index"
                   class="list-item">
        <a slot="actions" @click="delItem(item.id)">删除</a>
        <div>
          <a-checkbox @change="onChange(item.id, $event)" :checked="item.done">
            {{item.info}}
          </a-checkbox>
        </div>
      </a-list-item>
      <div slot="footer" class="footer">
        <span class="my-span">剩余{{showNum}}条</span>
        <div>
          <a-button :type="status === 'all' ? 'primary' : 'default'" @click="showSelectList('all')">全部</a-button>
          <a-button :type="status === 'undone' ? 'primary' : 'default'" @click="showSelectList('undone')">未完成</a-button>
          <a-button :type="status === 'done' ? 'primary' : 'default'" @click="showSelectList('done')">已完成</a-button>
        </div>
        <span class="clearDone" @click="clearDone">清除已完成</span>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: []
    }
  },
  computed: {
    ...mapState(['initialVal', 'status']),
    ...mapGetters(['showNum', 'infoList'])
  },
  methods: {
    onChange (id, e) {
      const listItem = {
        status: e.target.checked,
        id: id
      }
      this.$store.commit('setStatus', listItem)
    },
    handleChange (e) {
      this.$store.commit('setIntialVal', e.target.value)
    },
    addList () {
      if (this.initialVal === '') {
        return this.$message.warning('不能为空')
      }
      this.$store.commit('addList')
    },
    delItem (id) {
      this.$store.commit('delListItem', id)
    },
    clearDone () {
      this.$store.commit('clearDone')
    },
    showSelectList (type) {
      this.$store.commit('showSelectList', type)
    }
  },
  mounted () {
    this.$store.dispatch('getList')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.demo-loadmore-list {
  width: 550px;
  margin: 0 auto;
  min-height: 350px;
}
.my-btn {
  width: 400px;
}
.addContent {
  width: 100px;
}
.list-item {
  width: 500px;
  display: flex;
  margin-left: 25px;
}
.footer {
  display: flex;
  justify-content: space-between;
  padding: 0 25px;
}
.clearDone {
  display: inline-block;
  line-height: 30px;
  color: #1890ff;
  cursor: pointer;
}
.my-span {
  display: inline-block;
  line-height: 30px;
}
</style>
