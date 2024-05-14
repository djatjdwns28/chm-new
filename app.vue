<template>
  <div id="app">
    <NuxtLayout>
      <v-app>
        <NuxtPage />
      </v-app>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
const { Get } = usePpbFetch();

const res = await Get('/me');

onMounted(() => {
  console.log(res);
});
</script>
