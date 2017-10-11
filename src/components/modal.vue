<template>
  <div v-if="show" class="modal">
      <div class="modal__overlay"></div>
      <div class="modal__box">
          <div class="modal-form">
              <div class="modal-form__fields">
                  <input
                    v-for="field in fields"
                    v-model="values[field.code]"
                    class="field modal-form__field"
                    :placeholder="field.title"
                    :name="field.code"
                    type="text">
              </div>
              <div class="modal-form__buttons">
                  <button @click="apply()">Сохранить</button>
                  <button @click="$emit('close')">Отмена</button>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  name: 'v-modal',
  props: {
      show: { type: Boolean, required: true },
      fields: { type: Array, required: true },
      id: { type: Number, required: true }
  },

  data() {
      return {}
  },

  computed: {
    values() {
        if (this.id > 0) {
            return this.$store.state.list.filter((item) => item.id === this.id)[0]
        }

        return this.fields.reduce((result, field) => {
            result[field.code] = ''
            return result
        }, {})          
    }      
  },

  methods: {
      apply() {
          this.$store.dispatch('save', this.values)
          this.$emit('close')
      }
  }
}
</script>
<style lang="sass">
    @import '../sass/common'

    .modal
        &__overlay
            position: fixed
            top: 0
            left: 0
            width: 100%
            height: 100%
            background: rgba(black, 0.7)
        
        &__box
            position: fixed
            top: 50%
            left: 50%
            transform: translate(-50%, -50%)
            width: 40%
            height: 40%
            padding: 20px
            box-sizing: border-box
            overflow: auto
            background: white
            box-shadow: 0px 0px 22px 3px rgba(0,0,0,0.43)
        
    .modal-form
        &__field
            display: block
            width: 100%
            margin: 10px 0
</style>
