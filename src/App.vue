<template>
  <main class="page" id="root">
    <h1 class="header header_lvl_1">{{ title }}</h1>
    <v-table :columns="columns"></v-table>
  </main>
</template>

<script>
import Table from './components/table.vue'

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
    'v-table': Table
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

.header
  margin: 0 0 10px

  &_lvl
    &_1
      font-size: 30px
      color: $main-color
</style>
