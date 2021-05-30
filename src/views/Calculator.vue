<template>
  <div class="calculator pa-6">
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
            <v-label>战令已过去{{getDays()}}天</v-label>
            <v-label v-if="!advance">，每日获取{{ getExp(currentLevel,currentExp) }}经验</v-label>
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
              v-model="chessHour"
              :rules="gameHourRules"
              label="战棋 (按照300经验/小时)"
              required
            ></v-text-field>
          </v-row>

          <v-row v-if="gameHourAdvanceSelected">
            <v-select
              v-model="currentPassBonus"
              :items="passBonus"
              label="战令加成"
            ></v-select>
          </v-row>

          <v-row v-if="gameHourAdvanceSelected">
            <v-label>相当于每日获取{{ (getAdvanceExp(rankedHour,chessHour) * (1 + getPassBonus)).toFixed(0) }}经验</v-label>
          </v-row>

          <v-row v-if="gameExpAdvanceSelected">
            <v-text-field
              v-model="dailyExp"
              :rules="expRules"
              label="每日经验 (不再计算战令加成)"
              required
            ></v-text-field>
          </v-row>

          <v-row>
            <v-checkbox v-model="advance" label="高级功能"></v-checkbox>
          </v-row>

          <v-row>
            <v-btn class="primary" elevation="2" @click="calculate">计算</v-btn>
          </v-row>
        </v-col>

        <v-col class="col-12 col-xs-12 col-sm-8">
          <v-container>
            <v-simple-table class="background">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">等级</th>
                    <th class="text-left">升级日期</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in formList" :key="item.level" :class="{'past--text': pastDate(item.date),'cantFinish--text':cantFinishDate(item.date)}">
                    <td>{{ item.level }}</td>
                    <td>{{ item.date.getFullYear() }}年{{ item.date.getMonth()+1 }}月{{ item.date.getDate() }}日</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-container>
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
    advance: false,

    aDay: 86400000,

    currentLevel: 0,
    currentExp: 0,

    rankedHour: 0,
    battlegroundsHour: 0,
    
    chessHour: 0,
    dailyExp: 3000,
    selectAdvance: "gameHourCal",
    currentPassBonus: "0%",
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

    passBonus: ["0%", "10%", "15%", "20%"],

    formList: [
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
    expList() {
      return expData;
    },
    gameHourAdvanceSelected() {
      return this.advance && (this.selectAdvance === "gameHourCal")
    },
    gameExpAdvanceSelected() {
      return this.advance && (this.selectAdvance === "gameExpCal")
    },
    getPassBonus() {
      switch(this.currentPassBonus) {
        case "10%": return 0.1
        case "15%": return 0.15
        case "20%": return 0.2
        default: return 0
      }
    },
  },
  methods: {
    calculate() {
      const aDay = this.aDay
      const startDate = new Date(2021,2,31)

      var expList = this.expList
      var formList = this.formList

      var currentLevel = this.currentLevel
      var currentExp = this.currentExp

      var rankedHour = this.rankedHour
      var battlegroundsHour = this.battlegroundsHour

      var levelExp = expList[currentLevel].totalExp
      var totalExp = levelExp + Number(currentExp)


      var passBouns = this.getPassBonus
      
      var dailyExp = this.dailyExp

      var duration = (Date.parse(Date()) - Date.parse(startDate)) / aDay

      for (var i=0 ; i<formList.length ; i++) {
        //需要的经验值
        var expToEarn = expList[formList[i].level].totalExp - totalExp
        //每天获取经验
        var perDayEarn = totalExp / duration
        if (!this.advance) {
          //需要的天数
          var daysToAchieve = expToEarn / perDayEarn
        }
        else if (this.selectAdvance === "gameHourCal") {
          var daysToAchieve = expToEarn / ((400 * rankedHour + 300 * battlegroundsHour) * (1 + passBouns))
        }
        else if (this.selectAdvance === "gameExpCal") {
          var daysToAchieve = expToEarn / dailyExp
        }
        else {
          var daysToAchieve = expToEarn / perDayEarn
        }
        // console.log(expToEarn,totalExp,duration,perDayEarn,daysToAchieve)
        var achieveDate = new Date()
        
        achieveDate.setTime(Date.parse(Date()) + daysToAchieve * aDay)
        //console.log(achieveDate)
        formList[i].date = achieveDate
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
    getDays() {
      const startDate = new Date(2021,2,31)
      const curTime = new Date()
      var days = (curTime - startDate) / this.aDay
      return days.toFixed(0)
    },
    getExp(currentLevel,currentExp) {
      const startDate = new Date(2021,2,31)
      const curTime = new Date()
      var days = (curTime - startDate) / this.aDay
      return ((Number(expData[currentLevel].totalExp) + Number(currentExp)) / days).toFixed(2)
    },
    getAdvanceExp(rankedHour,battlegroundsHour) {
      return rankedHour * 400 + battlegroundsHour * 300
    },
  },
  watch: {
    currentLevel(newValue) {
      localStorage.currentLevel = newValue;
    },
    currentExp(newValue) {
      localStorage.currentExp = newValue;
    },
    rankedHour(newValue) {
      localStorage.rankedHour = newValue;
    },
    battlegroundsHour(newValue) {
      localStorage.battlegroundsHour = newValue;
    },
  },
  created() {
    this.currentLevel = localStorage.currentLevel ? localStorage.currentLevel : 40
    this.currentExp = localStorage.currentExp ? localStorage.currentExp : 1000
    this.rankedHour = localStorage.rankedHour ? localStorage.rankedHour : 1
    this.battlegroundsHour = localStorage.battlegroundsHour ? localStorage.battlegroundsHour : 0


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
