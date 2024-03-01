
<script setup>
import { computed } from 'vue';
import CircleProgress from 'vue3-circle-progress'
import 'vue3-circle-progress/dist/circle-progress.css'
import { formatQty } from '../helpers'

const props = defineProps({
  budget: {
    type: Number,
    required: true
  },
  available: {
    type: Number,
    required: true
  },
  spent: {
    type: Number,
    required: true
  }
})

defineEmits(['reset-app'])

const percentage = computed(() =>
  parseInt(((props.budget - props.available) / props.budget) * 100)
)

console.log('´c', percentage)
</script>

<template>
  <div class="two-columns">
    <div class="graph-container">
      <p class="percentage">{{ percentage }}%</p>
      <CircleProgress :percent="percentage" :size="250" :border-width="20" :border-bg-width="20" fill-color="#3b82f6" />
    </div>
    <div class="budget-container">
      <button class="reset-app" type="button" @click="$emit('reset-app')">Reset values</button>
      <p><span>Budget:</span>
        {{ formatQty(budget) }}</p>
      <p><span>Available:</span>
        {{ formatQty(available) }}</p>
      <p><span>Spent:</span>
        {{ formatQty(spent) }}</p>
    </div>
  </div>
</template>

<style scoped>
.graph-container {
  position: relative;
}

.percentage {
  position: absolute;
  margin: auto;
  top: calc(50% - 1.5rem);
  left: 0;
  right: 0;
  text-align: center;
  z-index: 100;
  font-size: 3rem;
  font-weight: 900;
  color: var(--dark-gray);
}

.two-columns {
  display: flex;
  flex-direction: column;
}

.two-columns> :first-child {
  margin-bottom: 3rem;
}

@media (min-width: 768px) {
  .two-columns {
    flex-direction: row;
    gap: 4rem;
    align-items: center;
  }

  .two-columns> :first-child {
    margin-bottom: 0;
  }
}

.reset-app {
  background-color: #db2777;
  border: none;
  padding: 1rem;
  width: 100%;
  color: var(--white);
  font-weight: 900;
  text-transform: uppercase;
  border-radius: 1rem;
  transition: background-color 300ms ease;
}

.reset-app:hover {
  cursor: pointer;
  background-color: #c11d67;
}

.budget-container {
  width: 100%;
}

.budget-container p {
  font-size: 2.4rem;
  text-align: center;
  color: var(--dark-gray);
}

@media (min-width: 768px) {
  .budget-container p {
    text-align: left;
  }
}

.budget-container span {
  font-weight: 900;
  color: var(--blue);
}
</style>