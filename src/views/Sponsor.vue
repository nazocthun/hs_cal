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