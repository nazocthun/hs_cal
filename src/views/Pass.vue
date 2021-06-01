<template>
  <v-container>
    <v-simple-table class="background">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">等级</th>
            <th class="text-left">升下级所需经验</th>
            <th class="text-left">总需经验</th>
            <th class="text-left">奖励</th>
            <th class="text-left">通行证奖励</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in expData" :key="i">
            <td>{{ i }}</td>
            <td>{{ item.exp }}</td>
            <td>{{ item.totalExp }}</td>
            <td>{{ item.freePrize }}</td>
            <td :class="{ 'red--text' : i === '101' }">{{ item.passPrize }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>
<script>
var expData = require("../data/exp.json")

export default {
  name: "Pass",

  data: () => ({
    expData: expData
    
  }),
};
</script>

<style scoped>
  .red {
    color: red;
  }
</style>