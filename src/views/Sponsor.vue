<template>
  <v-row class="pa-3">
    <v-col class="col-12 col-xs-12 col-sm-6">
      <v-card>
        <v-card-title>打赏作者</v-card-title>
        <v-card-subtitle>如果你觉得本工具有用的话，可以请我喝一杯肥宅快乐水</v-card-subtitle>
        <v-divider class="mx-4"></v-divider>
        <div class="pa-12">
          <v-img
            src="https://i.loli.net/2021/06/03/cItAWxCY65Ffm1K.png"
            height="387px"
            width="387px"
          ></v-img>
        </div>
        
      </v-card>
    </v-col>
    <v-col class="col-12 col-xs-12 col-sm-6">
      <v-card >
        <v-card-title>广告位</v-card-title>
        <v-card-subtitle>麦当当加速</v-card-subtitle>
        <v-divider class="mx-4"></v-divider>
        <v-card-text class="text--primary">
      
          <div class="text--primary">
            中转机场，YouTube 4K秒开，可看Netflix， <br>
            需要的话可以使用我的邀请链接。<br>
            现在注册有24小时/10GB流量试用。
          </div>
      
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            text
            @click="handle('https://www.mdd.one/#/register?code=SlP25a3a')"
          >
            点击跳转
          </v-btn>
        </v-card-actions>
        
      </v-card>
    </v-col>

    
  </v-row>

</template>

<script>

export default {
  
  name: "Sponsor",

  data: () => ({
    
  }),
  computed:{
    
  },
  watch: {
    
  },
  methods: {
    handle(url) { window.open(url, '_blank') }
  }
};
</script>

<style scoped>

</style>