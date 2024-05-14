<template>
  <v-text-field v-model="value" :label="label" :placeholder="placeholder" :outlined="outlined" :dense="dense" :class="classAttr" />
</template>
<script setup lang="ts">
interface Props {
  classAttr?: string;
  label?: string;
  placeholder?: string;
  outlined?: boolean;
  dense?: boolean;
}
const { classAttr, dense, outlined, placeholder, label } = withDefaults(defineProps<Props>(), {
  classAttr: '',
  dense: true,
  outlined: true,
  placeholder: '',
  label: ''
});

const value = defineModel<string>();
</script>
