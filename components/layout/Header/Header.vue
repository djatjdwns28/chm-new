<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="updateDrawer" />
    <v-toolbar-title>My Nuxt 3 App</v-toolbar-title>
  </v-app-bar>
</template>
<script setup lang="ts">
const drawer = defineModel<boolean>();

const updateDrawer = () => {
  drawer.value = !drawer.value;
};
</script>
