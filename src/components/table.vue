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
  <div v-else>Загрузка...</div>
</template>
<script>
export default {
  name: 'v-table',
  props: {
    columns: { type: Array, required: true }
  },

  created() {
    this.$store.dispatch('fetch')
  },

  computed: {
    getList() {
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
</style>