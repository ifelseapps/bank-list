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
              <div>
                  <button @click="apply()" class="button button_success modal-form__button">Сохранить</button>
                  <button @click="close()" class="button button_deny modal-form__button">Отмена</button>
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
      id: [Number, Boolean]
  },

  data() {
      return {

      }
  },

  computed: {
    values() {
        if (this.id > 0) {
            let values = this.$store.state.list.filter((item) => item.id === this.id)[0]
            return Object.keys(values).reduce((result, field) => {
                result[field] = values[field]
                return result
            }, {})
        }

        return this.getCleanValues()
    }      
  },

  methods: {   
    getCleanValues() {
        return this.fields.reduce((result, field) => {
            result[field.code] = ''
            return result
        }, {})
    },

    apply() {
        this.$store.dispatch('save', this.values)
        this.success = true
        this.$emit('close')
    },

    close() {
        this.$emit('close')
    }
  }
}
</script>
<style lang="sass">
    @import '../sass/common'

    .modal
        @media print
            display: none

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
            width: 50%
            max-height: 70%
            padding: 20px
            box-sizing: border-box
            overflow: auto
            background: white
            box-shadow: 0px 0px 22px 3px rgba(0,0,0,0.43)
            @media screen and (max-width: $mobile-desktop)
                width: 90%
                max-height: 90%
        
    .modal-form
        &__button
            margin-right: 20px
            @media screen and (max-width: $mobile-desktop)
                width: 100%
                margin-right: 0
                margin-bottom: 10px
                &:last-child
                    margin-bottom: 0

        &__fields
            margin-bottom: 20px

        &__field
            display: block
            width: 100%
            margin: 10px 0
    
    .field
        padding: 5px 10px
        box-sizing: border-box
        border: solid 1px grey
        &:focus
            outline: solid 2px $sub-color
</style>
