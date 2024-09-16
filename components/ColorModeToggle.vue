<template>
  <ClientOnly>
    <button class="absolute right-1 bottom-1 p-2" @click="toggleColorMode">
      <Icon v-if="colorMode.preference === 'light'" name="heroicons:moon-solid" />
      <Icon v-else name="heroicons:sun-solid" />
    </button>
  </ClientOnly>
</template>

<script lang="ts" setup>
  const colorMode = useColorMode();
  
  const toggleColorMode = () => {
    colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark';
  };
</script>

<style>

</style>