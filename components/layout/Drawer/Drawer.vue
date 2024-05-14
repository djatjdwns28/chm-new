<template>
  <v-navigation-drawer app v-model="drawer" permanent>
    <v-list>
      <v-list-item v-for="(item, index) in items" :key="index">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script setup lang="ts">
const drawer = defineModel<boolean>();
const items = [{ title: 'WINC' }, { title: 'HapaKR' }, { title: 'Chuu' }, { title: 'd' }];
</script>
