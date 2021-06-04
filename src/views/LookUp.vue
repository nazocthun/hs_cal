<template>
  <div class="pa-5">
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
              <v-btn class="primary" elevation="2" @click="calculate">提交</v-btn>
            </v-row>
          </v-col>

          <v-col class="col-12 col-xs-12 col-sm-8">
            <v-simple-table class="background">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">等级</th>
                    <th class="text-left">升级日期</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
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

export default {
  
  name: "LookUp",

  data: () => ({
    levelRules: [
      //(v) => !!v || "请输入等级",
      (v) => /^[0-9]*$/.test(v) || "等级必须为数字",
      (v) => (Number(v)<401 && Number(v)>0) || "等级必须在1-400之间",
    ],
    
  }),
  computed:{
    currentLevel: {
      get() {
        return this.$store.state.currentLevel
      },
      set(newValue) {
        this.$store.commit('changeCurrentLevel', newValue)
      }
    },
  },
  methods: {
    calculate() {
      
    }
  }
};
</script>