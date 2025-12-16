<script setup lang="ts">
  interface ErrorLabelProps {
    label: string;
  }

  defineProps<ErrorLabelProps>();
</script>

<template>
  <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
    <span>{{ label }}</span>
  </div>
</template>
