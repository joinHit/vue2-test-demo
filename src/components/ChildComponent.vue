<template>
  <div>
    <button @click="$emit('custom', 789)">点击</button>
    <p>{{ hobby }}</p>
  </div>
</template>

<script>
export default {
  name: 'ChildComponent',
  props: {
    hobby: {
      type: String,
      required: true
    }
  }
}
</script>
