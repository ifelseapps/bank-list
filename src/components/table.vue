<template>
  <table v-if="isLoaded" class="table">
    <thead class="table__header">
      <td v-for="col in columns" class="table__cell">{{ col.title }}</td>
    </thead>
    <tbody>
      <tr v-for="item in getList" class="table__row">
        <td v-for="col in columns" class="table__cell">
          <span class="table__mobile-header">{{ item[col.code] }}</span>
          <div class="mobile-props">
            <div v-for="col in getMobileProps" class="mobile-props__item prop">
              <div class="prop__title">{{ col.title }}</div>
              <div class="prop__value">{{ item[col.code] }}</div>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <v-loader v-else></v-loader>
</template>
<script>
import Loader from './loader.vue'

export default {
  name: 'v-table',
  components: {
    'v-loader': Loader
  },
  props: {
    columns: { type: Array, required: true }
  },

  created() {
    this.$store.dispatch('fetch')
  },

  computed: {
    getList() {
      const search = this.$store.state.search

      if (search.length) {
        return this.$store.state.list.filter(
          (item) => item.name.indexOf(search) >= 0 || item.bik.indexOf(search) >= 0
        )
      }

      return this.$store.state.list
    },

    getMobileProps() {
      return this.columns.filter((col) => !col.isTitle)
    },

    isLoaded() {
      return this.$store.state.list.length > 0
    }
  }
}
</script>
<style lang="sass">
  @import '../sass/common'

  .table
    width: 100%
    border-collapse: collapse

    &__cell
      padding: 10px 5px
      border-bottom: solid 2px #69F0AE

    &__header &__cell
      background: #69F0AE
      font-weight: 700
      border-bottom: none

    &__row
      cursor: pointer

    &__row:last-child &__cell
      border-bottom: none

  @media screen and (max-width: $mobile-desktop)
    .table__cell:not(:first-child)
      display: none

    .table__cell:first-child
      font-size: 16px
    
    .table__header
      display: none

    .table__mobile-header
      font-size: 20px

  .mobile-props
    display: none

    &__item
      margin: 5px 0

  @media screen and (max-width: $mobile-desktop)
    .mobile-props
      display: block

  .prop
    &__title
      font-weight: 700
      &::after
        content: ':'

  @media print
    .table
      &__cell
        padding: 0 10px
        border: solid 1px black

      &__header &__cell
        background: none

      &__row:last-child &__cell
        border-bottom: solid 1px black
</style>
