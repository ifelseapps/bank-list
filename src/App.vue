<template>
  <main class="page" id="root">
    <h1 class="header header_lvl_1">{{ title }}</h1>
    <v-search placeholder="Введите БИК или название банка" class="page__search"></v-search>
    <v-table :columns="columns" class="page__list"></v-table>
  </main>
</template>

<script>
import Table from './components/table.vue'
import Search from './components/search.vue'

export default {
  name: 'app',
  data () {
    return {
      title: 'Список банков',
      columns: [
        { title: 'Название', code: 'name', sortable: true, isTitle: true },
        { title: 'БИК', code: 'bik', sortable: false },
        { title: 'Корреспондентский счет', code: 'coracc', sortable: false },
        { title: 'Адрес', code: 'address', sortable: false },
      ]
    }
  },
  components: {
    'v-table': Table,
    'v-search': Search
  }
}
</script>

<style lang="sass">
@import './sass/common'

body
  font-family: 'Roboto', sans-serif
  color: #424242

.page
  width: 90%
  margin: 30px auto

  &__search
    margin: 10px 0

  &__list
    margin-top: 20px

.header
  margin: 0

  &_lvl
    &_1
      font-size: 30px
      color: $main-color

@media print
  .page
    width: 100%
    margin: 0

    &__search
      display: none

  body,
  .header
    color: black
</style>
