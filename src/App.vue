<template>
  <v-app id="inspire">
    <v-navigation-drawer class="panel" v-model="drawer" app>
      <v-list-item class="navbar">
        <v-list-item-content class="text--text">
          <v-list-item-title class="title"> 炉石经验计算器 </v-list-item-title>
          <v-list-item-subtitle class="text--text"> 作者：<a href="https://github.com/nazocthun" class="text--text">nazocthun@GitHub</a>  </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon class="icon--text">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="icon--text">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app scroll-target="#scrolling-techniques-2" class="navbar">

      <v-app-bar-nav-icon @click="drawer = !drawer" class="text--text"></v-app-bar-nav-icon>

      <v-app-bar-title class="text--text">
        <b>炉石经验计算器</b>
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="switchTheme" class="text--text">
        <v-icon v-if="$vuetify.theme.dark">mdi-brightness-6</v-icon>
        <v-icon v-if="!$vuetify.theme.dark">mdi-brightness-4</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="background">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      { title: "计算器", icon: "mdi-calculator", to: "/" },
      { title: "游戏数据", icon: "mdi-database", to: "/data" },
      { title: "战令奖励查询", icon: "mdi-file-table-box-outline", to: "/pass" },
      { title: "使用说明", icon: "mdi-help", to: "/readme" },
      { title: "打赏作者", icon: "mdi-currency-usd", to: "/sponsor" },
    ],
  }),
  mounted() {
    //this.$vuetify.theme.dark = localStorage.darkMode
  },
  methods: {
    switchTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;

      localStorage.setItem('theme', this.$vuetify.theme.dark ? 'dark' : 'light');
    }
    
  },
};
</script>