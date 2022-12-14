<template>
  <div class="pa-2">
    <!-- <v-container> -->
      <v-row>
        <v-col class="col-12 col-xs-12 col-sm-6">
          <v-card>
            <v-card-title>对局经验收益数据</v-card-title>

            <v-divider class="mx-4"></v-divider>
            <v-card-subtitle>
              数据来源于NGA各种帖子<br>
              每局游戏最长计算30分钟，不保证正确<br>
              (单位: 经验/分钟)
            </v-card-subtitle>
            
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left" width="50%">对局类型</th>
                    <th class="text-left" width="25%">胜利</th>
                    <th class="text-left" width="25%">失败</th>
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
          </v-card>
          
          
            
          
        </v-col>

        <v-col class="col-12 col-xs-12 col-sm-6">
          <v-card>
            <v-card-title>任务收益</v-card-title>
            <v-divider class="mx-4"></v-divider>
            <v-card-subtitle>每日任务按照950/个，每周任务按照1750+1500x2计算</v-card-subtitle>

            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left" width="50%">战令加成</th>
                    <th class="text-left" width="25%">每日经验</th>
                    <th class="text-left" width="25%">每周经验</th>
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
          </v-card>
        </v-col>
      </v-row>
    <!-- </v-container> -->
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