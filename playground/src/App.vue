<script setup lang="ts">
// import './style.css'

const classes = ['bg-red border-blue hover:border-red']
</script>

<template>
  <div>
    <button class="bg-red border-blue myclassName hover:(bg-gray-400 font-medium) hover:border-red">
      Click
    </button>
    <button :class="classes">
      Click
    </button>
    <button class="bg-blue">
      Click
    </button>
  </div>
</template>
