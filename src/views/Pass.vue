<template>
  <div class="pa-2">
    <v-card class="background" id="create">
      <v-card-text>
        <v-simple-table v-if="refresh" class="background" :height="height" fixed-header>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left" id="head">等级</th>
                <th class="text-left">升下级所需经验</th>
                <th class="text-left">总需经验</th>
                <th class="text-left">奖励</th>
                <th class="text-left">通行证奖励</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in expData" :key="i">
                <td :class="{head: i==='1'}">{{ i }}</td>
                <td>{{ item.exp }}</td>
                <td>{{ item.totalExp }}</td>
                <td>{{ item.freePrize }}</td>
                <td :class="{ 'red--text' : i === '101' }">{{ item.passPrize }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
      <v-btn bottom :right="right" fab class="v-btn primary" @click="toTop">
        <span>
          <span aria-hidden="true" class="v-icon notranslate">
            <svg  viewBox="0 0 24 24" role="img" aria-hidden="true" class="v-icon__svg">
              <path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"></path>
            </svg>
          </span>
        </span>
      </v-btn>
    </v-card>
  </div>
</template>
<script>
var expData = require("../data/exp.json")

export default {
  name: "Pass",
  

  data: () => ({
    expData: expData,
    refresh: true,
    right: true,
    
    
  }),
  updated() {
    this.height = document.documentElement.clientHeight
  },
  computed: {
    height: {
      get() {
        var clientHeight = document.documentElement.clientHeight
        return (document.documentElement.clientWidth < 600 ? clientHeight - 56 : clientHeight - 64) * 0.94
      },
      set(newValue) {
        return (document.documentElement.clientWidth < 600 ? newValue - 56 : newValue - 64) * 0.94
      }
    }
  },
  watch: {
    
    
  },
  methods: {
    toTop() {
        this.refresh = false
        // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
        this.$nextTick(() => {
        	// 重新渲染组件
            this.refresh = true
        })
    }

  }
};
</script>

<style scoped>
  .red {
    color: red;
  }

  #create .v-btn--floating {
    position: relative;
  }

  .v-btn {
    bottom: 0;
    right: 0;
    position: absolute;
    margin: 0 30px 20px 0;
  }
</style>