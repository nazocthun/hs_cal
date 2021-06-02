<template>
  <div class="calculator pa-5">
    <v-container>
      <v-row>
        <v-col class="col-12 col-xs-12 col-sm-4">
          <v-row>
            <v-text-field
              v-model="currentLevel"
              :rules="levelRules"
              label="当前等级"
              required
            ></v-text-field>
          </v-row>

          <v-row>
            <v-text-field
              v-model="currentExp"
              :rules="expRules"
              label="当前经验值"
              required
            ></v-text-field>
          </v-row>

          <v-row>
            <v-label>战令已开始 {{getDays}} 天</v-label>
            <v-label v-if="!advance">，每日获取{{ getExp(currentLevel,currentExp) }}经验</v-label>
          </v-row>

          <v-row>
            <v-checkbox v-model="advance" label="高级功能"></v-checkbox>
          </v-row>

          <v-row v-if="advance">
          <v-radio-group v-model="selectAdvance" row>
            <v-radio 
              label="自定义游戏时间"
              value="gameHourCal"
            ></v-radio>
            <v-radio
              label="自定义每日经验"
              value="gameExpCal"
            ></v-radio>
          </v-radio-group>
          </v-row>

          <v-row v-if="gameHourAdvanceSelected">
            <v-label>每日时间计算 (包含任务 单位：小时)</v-label>
          </v-row>

          <v-row v-if="gameHourAdvanceSelected">
            <v-text-field
              v-model="rankedHour"
              :rules="gameHourRules"
              label="天梯 (按照400经验/小时)"
              required
            ></v-text-field>
          </v-row>

          <v-row v-if="gameHourAdvanceSelected">
            <v-text-field
              v-model="battlegroundsHour"
              :rules="gameHourRules"
              label="战棋 (按照300经验/小时)"
              required
            ></v-text-field>
          </v-row>

          <v-row v-if="gameHourAdvanceSelected">
            <v-select
              v-model="customPassBonus"
              :items="passBonus"
              label="战令加成"
            ></v-select>
          </v-row>

          <v-row v-if="gameHourAdvanceSelected">
            <v-label>约等于每日获取{{ ((getAdvanceExp(rankedHour,battlegroundsHour) + gameData["questExpPerWeek"] / 7) * (1 + getPassBonus)).toFixed(1) }}经验</v-label>
            <br>
            <br>
          </v-row>

          <v-row v-if="gameExpAdvanceSelected">
            <v-text-field
              v-model="customExp"
              :rules="expRules"
              label="每日经验 (不再计算战令加成)"
              required
            ></v-text-field>
          </v-row>

          <v-row>
            <v-btn class="primary" elevation="2" @click="calculate">计算</v-btn>
          </v-row>
        </v-col>

        <v-col class="col-12 col-xs-12 col-sm-8">
          <!-- <v-container class="pa-0"> -->
            <v-simple-table class="background">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">等级</th>
                    <th class="text-left">升级日期</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in calculatedData" :key="item.level" :class="{'past--text': pastDate(item.date),'cantFinish--text':cantFinishDate(item.date)}">
                    <td>{{ item.level }}</td>
                    <td>{{ item.date.getFullYear() }}年{{ item.date.getMonth()+1 }}月{{ item.date.getDate() }}日</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          <!-- </v-container> -->
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
var expData = require("../data/exp.json");
var gameData = require("../data/gameData.json");

export default {
  name: "Calculator",
  data: () => ({
    expData: expData,
    gameData: gameData,
    aDay: 86400000,

    passBonus: ["0%", "10%", "15%", "20%"],

    levelRules: [
      //(v) => !!v || "请输入等级",
      (v) => /^[0-9]*$/.test(v) || "等级必须为数字",
      (v) => (Number(v)<401 && Number(v)>0) || "等级必须在1-400之间",
    ],
    expRules: [
      //(v) => !!v || "请输入经验值",
      (v) => /^[0-9]*$/.test(v) || "经验值必须为数字",
    ],
    gameHourRules: [
      //(v) => !!v || "请输入经验值",
      (v) => /^[0-9]*$/.test(v) || "游戏时间必须为数字",
      (v) => (Number(v)<=24 && Number(v)>=0) || "游戏时间在0-24之间"
    ],
    calculatedData: [
      {
        level: 40,
        date: "待计算",
      },
      {
        level: 50,
        date: "待计算",
      },
      {
        level: 60,
        date: "待计算",
      },
      {
        level: 70,
        date: "待计算",
      },
      {
        level: 80,
        date: "待计算",
      },
      {
        level: 90,
        date: "待计算",
      },
      {
        level: 100,
        date: "待计算",
      },
      {
        level: 120,
        date: "待计算",
      },
      {
        level: 140,
        date: "待计算",
      },
      {
        level: 160,
        date: "待计算",
      },
      {
        level: 180,
        date: "待计算",
      },
      {
        level: 200,
        date: "待计算",
      },
      {
        level: 220,
        date: "待计算",
      },
      {
        level: 240,
        date: "待计算",
      },
      {
        level: 260,
        date: "待计算",
      },
      {
        level: 280,
        date: "待计算",
      },
      {
        level: 300,
        date: "待计算",
      },
      {
        level: 320,
        date: "待计算",
      },
      {
        level: 340,
        date: "待计算",
      },
      {
        level: 360,
        date: "待计算",
      },
      {
        level: 380,
        date: "待计算",
      },
      {
        level: 400,
        date: "待计算",
      },
    ]
  }),
  computed: {
    gameHourAdvanceSelected() {
      return this.advance && (this.selectAdvance === "gameHourCal")
    },
    gameExpAdvanceSelected() {
      return this.advance && (this.selectAdvance === "gameExpCal")
    },
    getPassBonus() {
      switch(this.customPassBonus) {
        case "10%": return 0.1
        case "15%": return 0.15
        case "20%": return 0.2
        default: return 0
      }
    },
    getDays() {
      const startDate = new Date(2021,2,31)
      const curTime = new Date()
      var days = (curTime - startDate) / this.aDay
      return days.toFixed(0)
    },
    currentLevel: {
      get() {
        return this.$store.state.currentLevel
      },
      set(newValue) {
        this.$store.commit('changeCurrentLevel', newValue)
      }
    },
    currentExp: {
      get() {
        return this.$store.state.currentExp
      },
      set(newValue) {
        this.$store.commit('changeCurrentExp', newValue)
      }
    },
    advance: {
      get() {
        return this.$store.state.advance
      },
      set(newValue) {
        this.$store.commit('toggleAdvance', newValue)
      }
    },
    selectAdvance: {
      get() {
        return this.$store.state.selectedAdvance
      },
      set(newValue) {
        this.$store.commit('toggleSelectedAdvance', newValue)
      }
    },
    customPassBonus: {
      get() {
        return this.$store.state.customPassBonus
      },
      set(newValue) {
        this.$store.commit('changeCustomPassBonus', newValue)
      }
    },
    customExp: {
      get() {
        return this.$store.state.customExp
      },
      set(newValue) {
        this.$store.commit('changeCustomExp', newValue)
      }
    },

    rankedHour: {
      get() {
        return this.$store.state.rankedHour
      },
      set(newValue) {
        this.$store.commit('changeRankedHour', newValue)
      }
    },
    battlegroundsHour: {
      get() {
        return this.$store.state.battlegroundsHour
      },
      set(newValue) {
        this.$store.commit('changeBattlegroundsHour', newValue)
      }
    },



  },
  methods: {
    calculate() {
      const aDay = this.aDay
      const startDate = new Date(2021,2,31)

      const expData = this.expData
      const gameData = this.gameData

      var calculatedData = this.calculatedData

      var currentLevel = this.currentLevel
      var currentExp = this.currentExp

      var rankedHour = this.rankedHour
      var battlegroundsHour = this.battlegroundsHour

      var levelExp = expData[currentLevel].totalExp
      var totalExp = levelExp + Number(currentExp)


      var passBouns = this.getPassBonus
      
      var customExp = this.customExp

      var duration = (Date.parse(Date()) - Date.parse(startDate)) / aDay

      for (var i=0 ; i<calculatedData.length ; i++) {
        //需要的经验值
        var expToEarn = expData[calculatedData[i].level].totalExp - totalExp
        //每天获取经验
        var perDayEarn = totalExp / duration
        if (!this.advance) {
          //需要的天数
          var daysToAchieve = expToEarn / perDayEarn
        }
        else if (this.selectAdvance === "gameHourCal") {
          var daysToAchieve = expToEarn / ((400 * rankedHour + 300 * battlegroundsHour) * (1 + passBouns) + gameData["questExpPerWeek"]/7)
        }
        else if (this.selectAdvance === "gameExpCal") {
          var daysToAchieve = expToEarn / customExp
        }
        else {
          var daysToAchieve = expToEarn / perDayEarn
        }
        // console.log(expToEarn,totalExp,duration,perDayEarn,daysToAchieve)
        var achieveDate = new Date()
        
        achieveDate.setTime(Date.parse(Date()) + daysToAchieve * aDay)
        //console.log(achieveDate)
        calculatedData[i].date = achieveDate
        // achieveDate.getFullYear() + "年" + (achieveDate.getMonth()+1) + "月" + achieveDate.getDate() + "日"        
      }
      
    },
    pastDate(date) {
      const curTime = new Date()
      return date < curTime
    },
    cantFinishDate(date) {
      const endDate = new Date(2021,7,10)
      return date > endDate
    },
    getExp(currentLevel,currentExp) {
      const startDate = new Date(2021,2,31)
      const curTime = new Date()
      var days = (curTime - startDate) / this.aDay
      return ((Number(expData[currentLevel].totalExp) + Number(currentExp)) / days).toFixed(1)
    },
    getAdvanceExp(rankedHour,battlegroundsHour) {
      return rankedHour * 400 + battlegroundsHour * 300
    },
  },
  created() {
    this.calculate()
  },
};
</script>

<style scoped>
  .cantFinish--text {
    color: red;
  }
  .past--text {
    color: #888a05;
  }
</style>
