<template>
  <div class="calculator pa-5">
    <v-container>
      <v-row>
        <v-col class="col-12 col-xs-12 col-sm-6">
          <v-row>
            <v-label>游戏经验数据</v-label>
          </v-row>
          
            <v-simple-table class="background">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">类型 (经验/分钟)</th>
                    <th class="text-left">胜利</th>
                    <th class="text-left">失败</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in gameData['gameExp']" :key="item.label">
                    <td>{{ item.label }}</td>
                    <td>{{ item.win }}</td>
                    <td>{{ item.lose }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          
        </v-col>

        <v-col class="col-12 col-xs-12 col-sm-6">
          <v-row>
            <v-label>任务收益</v-label>
          </v-row>
          
            <v-simple-table class="background">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">战令加成</th>
                    <th class="text-left">每日经验</th>
                    <th class="text-left">每周经验</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,key) in bounsList" :key="key">
                    <td>{{ key }}</td>
                    <td>{{ getDailyExp(item) }}</td>
                    <td>{{ getWeeklyExp(item) }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          
        </v-col>
      </v-row>
    </v-container>
  </div>

</template>
<script>
var gameData = require("../data/gameData.json");

export default {
  name: "Data",
  

  data: () => ({
    gameData: gameData,
    
    bounsList: {
      "无战令": 1,
      "10% (有战令)": 1.1,
      "15% (20级战令)": 1.15,
      "20% (70级战令)": 1.2
    }

  }),
  computed:{
    
  },
  methods: {
    getDailyExp(bonus){
      return (this.gameData['questExpPerWeek']/ 7 * bonus).toFixed(1)
    },
    getWeeklyExp(bonus){
      return (this.gameData['questExpPerWeek'] * bonus).toFixed(1)
    }
  }

};
</script>