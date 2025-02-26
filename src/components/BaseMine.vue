<script setup>

import '../aframe/clickable.js';
import '../aframe/event-set.js';
import '../aframe/look-at.js';

const props = defineProps({
  position: String, // Ex: "0 0 0"
  isMine: Boolean,
  showHint: Boolean,
  adjacentMines: Number,
  width: { type: Number, default: 1 },
  depth: { type: Number, default: 1 },
});

const emits = defineEmits(['revealed-propagation']);

function handleClick() {
  emits("revealed-propagation")
}

</script>

<template>
  <a-box
    clickable
    @click="handleClick"
    :position="position"
    :material="`color: ${isMine ? 'red' : (showHint === false || (showHint && adjacentMines==0)) ? 'blue' : 'green'}`"
    :depth="depth"
    :width="width"
    height="0.2"
  >
    <!-- Afficher le nombre si révélé et non mine -->
    <a-text v-if="showHint && !isMine"
            :value="adjacentMines"
            position="0 0.5 0"
            look-at
          >
    </a-text>
  </a-box>
</template>