<script setup>
const props = defineProps({
  filter: {
    type: String,
    required: true
  }
})
defineEmits(['update:filter'])
</script>

<template>
  <div class="filters shadow container">
    <form>
      <div class="field">
        <label for="filter">Filter Expenses</label>
        <select id="filter" :value="filter" @input="$event => $emit('update:filter', $event.target.value)">
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
    </form>
  </div>
</template>


<style scoped>
.filters {
  margin-top: 10rem;
}

.filters .field {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.filters label {
  font-size: 3rem;
  font-weight: 900;
  color: var(--dark-gray)
}

.filters select {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 1rem;
  background-color: var(--light-gray);
  text-align: center;
}
</style>