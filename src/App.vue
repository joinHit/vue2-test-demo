<template>
  <div id="app">
    <index-component></index-component>
  </div>
</template>

<script>
import indexComponent from '@/components/TodoApp/indexComponent.vue'

export default {
  name: 'App',
  components: { indexComponent }
}
</script>
