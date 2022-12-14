<template>
  <div class="pa-2">
    <div class="px-10">
      <v-menu ref="menu" v-model="seasonSelector" :nudge-right="40" :close-on-click="true" transition="scale-transition"
        offset-y min-width="auto">
        <template v-slot:activator="{ on, attrs }">
          <v-text-field v-model="selectedSeason" label="选择版本" readonly v-bind="attrs" v-on="on" />
        </template>
        <v-list>
          <v-list-item v-for="(seasonInfo, index) in seasons" :key="index" @click="setSelectedSeason(seasonInfo)">
            <v-list-item-title>{{ seasonInfo.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <v-card class="ma-5" v-for="(item, i) in expData" :key="i">
      <v-card-title>等级{{ i }}</v-card-title>
      <v-card-subtitle class="font-weight-bold">
        <div >
          升级所需经验：{{ item.exp }}
        </div>
        <div>
          到达本级总需经验：{{ item.totalExp }}
        </div>
      </v-card-subtitle>
      <v-card-text>
        <div class="orange--text text----darken-4">
          免费奖励：{{ prizeData[i].freePrize }}
        </div>
        <div class="green--text" v-if="prizeData[i].passPrize">
          战令奖励：{{ prizeData[i].passPrize }}
        </div>
      </v-card-text>
    </v-card>

    <v-btn bottom :right="right" fab class="v-btn primary" @click="toTop">
      <span>
        <span aria-hidden="true" class="v-icon notranslate">
          <svg  viewBox="0 0 24 24" role="img" aria-hidden="true" class="v-icon__svg">
            <path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"></path>
          </svg>
        </span>
      </span>
    </v-btn>
  </div>
</template>
<script>
var expData = require("../data/exp.json")
var prizeData = require(`../data/prize/season0.json`)

export default {
  name: "Pass",
  data: () => ({
    expData: expData,
    prizeData: prizeData,
    refresh: true,
    right: true,
    height: '600px',
    seasonSelector: false,
    selectedSeason: '',
    selectedSeasonIndex: 0,
    seasons: [
      {
        title: '第七季-巫妖王的进军',
        index: 7,
      },
      {
        title: '第六季-纳斯利亚堡的悬案',
        index: 6,
      },
      {
        title: '第五季-探寻沉没之城',
        index: 5,
      },
      {
        title: '第四季-奥特兰克的决裂',
        index: 4,
      },
      {
        title: '第三季-暴风城下的集结',
        index: 3,
      },
      {
        title: '第二季-贫瘠之地的锤炼',
        index: 2,
      },
      {
        title: '第一季-暗月马戏团',
        index: 1,
      },
    ]
  }),
  mounted() {
    this.height = document.documentElement.clientHeight - 48 - (document.documentElement.clientWidth < 600 ? 56 : 64)
    window.addEventListener("resize", () => {
      this.height = document.documentElement.clientHeight - 48 - (document.documentElement.clientWidth < 600 ? 56 : 64)
    });
  },
  computed: {

  },
  watch: {
    
  },
  methods: {
    toTop() {
      scrollTo(0, 0);
    },
    setSelectedSeason(seasonInfo) {
      this.selectedSeason = seasonInfo.title
      this.selectedSeasonIndex = seasonInfo.index
      this.prizeData = require(`../data/prize/season${this.selectedSeasonIndex}.json`)
      localStorage.setItem('selectedSeason', this.selectedSeason)
      localStorage.setItem('selectedSeasonIndex', this.selectedSeasonIndex)
    },
    log() {
      console.log(this.seasonSelector)
    }
  },
  created() {
    console.log(localStorage.getItem('selectedSeasonIndex'))
    if (localStorage.getItem('selectedSeasonIndex') && localStorage.getItem('selectedSeason')) {
      this.selectedSeasonIndex = localStorage.getItem('selectedSeasonIndex')
      this.selectedSeason = localStorage.getItem('selectedSeason')
    }
    this.prizeData = require(`../data/prize/season${this.selectedSeasonIndex}.json`)
  }
};
</script>

<style scoped>
.red {
    color: red;
  }

  .v-btn {
    bottom: 0;
    right: 0;
    position: fixed;
    margin: 0 16px 16px 0;
  }
  .pass-card-text {
    height:600px;
    bottom: 16px;
  }
</style>
