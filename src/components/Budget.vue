<script setup>
import { ref } from 'vue';
import Alert from './Alert.vue'

const budget = ref(0)
const error = ref('')

const emit = defineEmits(['define-budget'])

const defineBudget = () => {
  if (budget.value <= 0 || budget.value === '') {
    error.value = 'Invalid budget'
    setTimeout(() => { error.value = '' }, 3000)
    return
  }
  emit('define-budget', budget.value)
}
</script>

<template>
  <form class="budget" @submit.prevent="defineBudget">
    <Alert v-if="error">
      {{ error }}
    </Alert>
    <div class="field">
      <label for="new-budget">Define Budget</label>
      <input id="new-budget" class="new-budget" type="number" placeholder="Add your budget" min="0"
        v-model.number="budget" />
    </div>
    <input type="submit" value="Submit budget" />
  </form>
</template>


<style scoped>
.budget {
  width: 100%;
}

.field {
  display: grid;
  gap: 2rem;
}

.budget label {
  font-size: 2.8rem;
  text-align: center;
  color: var(--blue);
}

.budget input[type="number"] {
  background-color: var(--light-gray);
  border-radius: 1rem;
  padding: 1rem;
  border: none;
  font-size: 2.2rem;
  text-align: center;
}

.budget input[type="submit"] {
  background-color: var(--blue);
  border: none;
  border-radius: 1rem;
  padding: 1rem;
  text-align: center;
  font-size: 2rem;
  margin-top: 2rem;
  color: var(--white);
  font-weight: 900;
  width: 100%;
  transition: background-color 300ms ease;
}

.budget input[type="submit"]:hover {
  background-color: #1048a4;
  cursor: pointer;
}
</style>