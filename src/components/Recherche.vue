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

<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue']
}
</script>
