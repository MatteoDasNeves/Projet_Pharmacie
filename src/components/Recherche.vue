<script setup>
defineProps(['modelValue']);
defineEmits(['update:modelValue']);
</script>

<template>
  <div>
    <input 
      :value="modelValue" 
      @input="$emit('update:modelValue', $event.target.value)" 
      placeholder="Rechercher par nom..."
    >
    <hr>
  </div>
</template>
