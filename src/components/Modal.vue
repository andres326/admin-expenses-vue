<script setup>
import { computed, ref } from 'vue';
import closeModal from '../assets/img/close.svg'
import Alert from './Alert.vue'

const error = ref('')

const emit = defineEmits(['close-modal', 'update:name', 'update:qty', 'update:category', 'save-expense', 'delete-expense'])
const props = defineProps({
  modal: {
    type: Object,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  qty: {
    type: [String, Number],
    required: true
  },
  category: {
    type: String,
    required: true
  },
  available: {
    type: Number,
    required: true
  },
  id: {
    type: [String, null],
    required: true
  },
})

const oldQty = props.qty

const addExpense = () => {
  const { name, category, qty, available, id } = props
  if ([name, category, qty].includes('')) {
    error.value = 'All fields are required'
    setTimeout(() => { error.value = '' }, 3000)
    return
  }
  if (qty <= 0) {
    error.value = 'Quantity should be greater than 0'
    setTimeout(() => { error.value = '' }, 3000)
    return
  }
  if (id) {
    if (qty > oldQty + available) {
      error.value = 'You are exceeding the available budget'
      setTimeout(() => { error.value = '' }, 3000)
      return
    }
  } else {
    if (available < qty) {
      error.value = 'You are exceeding the available budget'
      setTimeout(() => { error.value = '' }, 3000)
      return
    }
  }

  emit('save-expense')
}

const isEditing = computed(() => props.id)
</script>

<template>
  <div class="modal">
    <div class="close-modal">
      <img :src="closeModal" @click="$event => $emit('close-modal')" />
    </div>

    <div class="container container-form" :class="[modal.animate ? 'animate' : 'close']">
      <form class="new-expense" @submit.prevent="addExpense">
        <legend>{{ isEditing ? 'Edit Expense' : 'Add Expense' }}</legend>
        <Alert v-if="error">{{ error }}</Alert>
        <div class="field">
          <label for="name">Expense name:</label>
          <input type="text" id="name" placeholder="Add the expense name" :value="name"
            @input="$event => $emit('update:name', $event.target.value)">
        </div>
        <div class="field">
          <label for="quantity">Quantity:</label>
          <input type="number" id="quantity" placeholder="Add the expense quantity" :value="qty"
            @input="$event => $emit('update:qty', +$event.target.value)">
        </div>
        <div class="field">
          <label for="category">Category:</label>
          <select id="category" :value="category" @input="$event => $emit('update:category', $event.target.value)">
            <option value=""> -- Select --</option>
            <option value="saving">Savings</option>
            <option value="food">Food</option>
            <option value="home">Home</option>
            <option value="sundryExpenses">Sundry expenses</option>
            <option value="entertainment">Entertainment</option>
            <option value="health">Health</option>
            <option value="subscriptions">Subscriptions</option>
          </select>
        </div>
        <input type="submit" :value="[isEditing ? 'Edit' : 'Add']">
      </form>
      <button v-if="isEditing" type="button" class="delete-btn" @click="$emit('delete-expense')">Delete</button>
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
  margin: 6rem auto 0 auto;
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

.delete-btn {
  border: none;
  padding: 1rem;
  width: 100%;
  background-color: #ef4444;
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--white);
  margin-top: 2rem;
  cursor: pointer;
  border-radius: 1rem;
}
</style>