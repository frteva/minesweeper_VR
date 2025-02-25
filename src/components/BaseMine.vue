<script setup>

import '../aframe/clickable.js';
import '../aframe/event-set.js';

const props = defineProps({
  position: String, // Ex: "0 0 0"
  isMine: Boolean,
  revealed: { type: Boolean, default: false },
  adjacentMines: Number,
  width: { type: Number, default: 1 },
  depth: { type: Number, default: 1 },
});

const emits = defineEmits(['revealed-propagation']);

function handleClick() {
  if (props.adjacentMines != 0) return;
  emits("revealed-propagation")
}

</script>

<template>
  <a-box
    clickable
    @click="handleClick"
    :event-set__click="`_event: click; attribute: material.color; value: green;`"
    :position="position"
    :material="`color: ${isMine ? 'red' : 'blue'}`"
    :depth="depth"
    :width="width"
    height="0.2"
  >
    <!-- Afficher le nombre si révélé et non mine -->
    <a-text v-if="!isMine" 
            :value="adjacentMines" 
            position="0 0.5 0">
    </a-text>
  </a-box>
</template>