<template>
  <div>
    <child-component @custom="onCustom" :hobby="like" />
    <p v-if="emitted">Emitted!</p>
    <span>{{ abc }}</span>
  </div>
</template>

<script>
import ChildComponent from './ChildComponent'

export default {
  name: 'ParentComponent',
  components: { ChildComponent },
  data() {
    return {
      emitted: false,
      abc: '',
      like: 'swim'
    }
  },
  methods: {
    onCustom(param) {
      this.abc = param
      this.emitted = true
    }
  }
}
</script>
