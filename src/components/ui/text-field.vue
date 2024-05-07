<script>
export default {
  name: 'TextField',
  props: {
    modelValue: [String, Number, null],
    inputClasses: String,
    placeholder: String,
    type: String,
    icon: String,
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value);
    },
    focus() {
      this.$refs.input.focus();
    },
  },
};
</script>

<template>
  <div class="input-container">
    <input
      ref="input"
      class="input"
      :class="[{ 'input-with-icon': !!icon }, inputClasses]"
      :type="type"
      :value="modelValue"
      @input="updateInput"
      :placeholder="placeholder"
    />
    <span v-if="icon" class="material-symbols-rounded input-icon">
      {{ icon }}
    </span>
  </div>
</template>

<style scoped>
.input-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px rgba(185, 185, 185, 0.5) solid;
  border-radius: 8px;
}

.input {
  font-family: 'Golos Text', sans-serif;
  font-size: 16px;
  box-sizing: border-box;
  display: block;
  width: 100%;
  background-color: transparent;
  border: 0;
  padding: 4px 8px;
  height: 100%;
  border-radius: 8px;
}

.input-icon {
  position: absolute;
  left: 8px;
  color: var(--text-secondary);
}

.input-with-icon {
  padding-left: 32px;
}
</style>
