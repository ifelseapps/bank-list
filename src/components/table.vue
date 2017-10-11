<template>
  <div>
    <v-modal
      :show="showModal"
      :fields="columns"
      :id="editId"
      @close="closeModal"></v-modal>
    <button @click="edit(0)" class="button button_success page__add">Добавить банк</button>
    <table v-if="isLoaded" class="table">
      <thead class="table__header">
        <td v-for="col in columns" class="table__cell">{{ col.title }}</td>
        <td class="table__cell"></td>
      </thead>
      <tbody>
        <tr v-for="item in getList" class="table__row">
          <td v-for="col in columns" class="table__cell">
            <span :class="{ 'table__mobile-header': col.isTitle }">{{ item[col.code] }}</span>
            <div v-if="col.isTitle" class="mobile-props">
              <div v-for="col in getMobileProps" class="mobile-props__item prop">
                <div class="prop__title">{{ col.title }}</div>
                <div class="prop__value">{{ item[col.code] }}</div>
              </div>
            </div>
          </td>
          <td class="table__cell">
            <svg @click="edit(item.id)" class="table__edit-icon">
              <use xlink:href="#icon-edit"></use>
            </svg>
          </td>
        </tr>
      </tbody>
    </table>
    <v-loader v-else></v-loader>    
  </div>
</template>
<script>
import Loader from './loader.vue'
import Modal from './modal.vue'

export default {
  name: 'v-table',
  components: {
    'v-loader': Loader,
    'v-modal': Modal
  },
  props: {
    columns: { type: Array, required: true }
  },

  data() {
    return {
      showModal: false,
      editId: 0
    }
  },

  created() {
    this.$store.dispatch('fetch')
  },

  computed: {
    getList() {
      const search = this.$store.state.search.toLowerCase()

      if (search.length) {
        return this.$store.state.list.filter(
          (item) => item.name.toLowerCase().indexOf(search) >= 0 || item.bik.indexOf(search) >= 0
        )
      }

      return this.$store.state.list
    },

    getMobileProps() {
      return this.columns.filter((col) => !col.isTitle)
    },

    isLoaded() {
      return this.$store.state.completed
    }
  },

  methods: {
    edit(id) {
      this.showModal = true
      this.editId = id
    },

    closeModal() {
      this.editId = false
      this.showModal = false
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
      &:last-child
        text-align: right

    &__header &__cell
      background: #69F0AE
      font-weight: 700
      border-bottom: none

    &__row
      cursor: pointer

    &__row:last-child &__cell
      border-bottom: none

    &__edit-icon
      width: 18px
      height: 18px
      fill: grey
      transition: all 0.3s
      &:hover
        fill: $main-color

  @media screen and (max-width: $mobile-desktop)
    .table__cell:not(:first-child):not(:last-child)
      display: none

    .table__cell:first-child
      font-size: 16px
    
    .table__cell:last-child
      vertical-align: top

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
        &:last-child
          display: none

      &__header &__cell
        background: none

      &__row:last-child &__cell
        border-bottom: solid 1px black
</style>
