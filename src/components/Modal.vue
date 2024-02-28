<script setup>
import closeModal from '../assets/img/close.svg'

defineEmits(['close-modal'])
const props = defineProps({
  modal: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="modal">
    <div class="close-modal">
      <img :src="closeModal" @click="$event => $emit('close-modal')" />
    </div>

    <div class="container container-form" :class="[modal.animate ? 'animate' : 'close']">
      <form class="new-expense">
        <legend>Add Expense</legend>
        <div class="field">
          <label for="name">Expense name:</label>
          <input type="text" id="name" placeholder="Add the expense name">
        </div>
        <div class="field">
          <label for="quantity">Quantity:</label>
          <input type="number" id="quantity" placeholder="Add the expense quantity">
        </div>
        <div class="field">
          <label for="category">Category:</label>
          <select id="category">
            <option value="">Select</option>
            <option value="savings">Savings</option>
            <option value="food">Food</option>
            <option value="home">Home</option>
            <option value="sundryExpenses">Sundry expenses</option>
            <option value="entertainment">Entertainment</option>
            <option value="health">Health</option>
            <option value="subscriptions">Subscriptions</option>
          </select>
        </div>
        <input type="submit" value="Add">
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: absolute;
  background-color: rgb(0 0 0 / 0.9);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.close-modal {
  position: absolute;
  right: 3rem;
  top: 3rem;
}

.container-form {
  transition: all 300ms ease-in;
  opacity: 0;
}

.container-form.animate {
  opacity: 1;
}

.container-form.close {
  opacity: 0;
}

.close-modal img {
  width: 3rem;
  cursor: pointer;
}

.new-expense {
  margin: 10rem auto 0 auto;
  display: grid;
  gap: 2rem;
}

.new-expense legend {
  text-align: center;
  color: var(--white);
  font-size: 3rem;
  font-weight: 700;
}

.field {
  display: grid;
  gap: 2rem;
}

.new-expense input,
.new-expense select {
  background-color: var(--light-gray);
  border-radius: 1rem;
  padding: 1rem;
  border: none;
}

.new-expense label {
  color: var(--white);
  font-size: 2rem
}

.new-expense input[type="submit"] {
  background-color: var(--blue);
  color: var(--white);
  font-weight: 700;
  cursor: pointer;
}
</style>