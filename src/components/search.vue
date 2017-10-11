<template>
  <div class="search">
      <svg class="search__icon"><use xlink:href="#icon-search"></use></svg>
      <input v-model="search" class="search__field" type="text" :placeholder="placeholder">
  </div>
</template>
<script>
export default {
  name: 'v-search',
  props: {
      placeholder: {type: String, required: true}
  },
  computed: {
      search: {
          get() {
              return this.$store.state.search
          },
          set(value) {
            this.$store.commit('search', value)
          }
      }
  }
}
</script>
<style lang="sass">
.search
    position: relative

    &__icon
        position: absolute
        top: 50%
        left: 10px
        transform: translateY(-50%)
        width: 20px
        height: 20px
        fill: grey

    &__field
        width: 100%
        padding: 10px 0 10px 40px
        box-sizing: border-box
        border: solid 1px grey
        &:focus
            outline: solid 2px #69F0AE
</style>

