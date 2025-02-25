<script setup>
  import { ref, onMounted } from 'vue';

  import TheCameraRig from './TheCameraRig.vue';
  import BaseMine from './BaseMine.vue';
  import MinesweeperGrid from './MinesweeperGrid.vue';
  import '../aframe/tesselation-square.js';
  import '../aframe/clickable.js';
  import '../aframe/pause-sound.js';
  import '../aframe/toggle-event.js';

  const allAssetsLoaded = ref(false);

</script>

<template>
  <a-scene
    stats
    fog="type: exponential; color: #000033; density: 0"
    background="color: #a3d0ed;"
  >

    <a-assets @loaded="allAssetsLoaded = true">
      <a-asset-item id="crazy-frog" src="./assets/audio/Crazy-Frog-Axel-F.mp3" response-type="arraybuffer" preload="auto"></a-asset-item>
      <img id="sky" src="/assets/blue-black-sky-with-stars.jpg">
    </a-assets>

    <template v-if="allAssetsLoaded">

      <a-sky src="#sky"></a-sky>

      <!-- <a-entity light="type: ambient; color: #ffffff"></a-entity> -->
      <a-entity light="type: point; intensity: 2000" position="0 1000 0"></a-entity>

      <!--     <a-ocean
            width="100"
            depth="100"
            amplitude="0.1"
            density="100"
            amplitudeVariance="0.1"
          ></a-ocean>
          <a-ocean
            width="100"
            depth="100"
            amplitude="0.05"
            density="100"
            amplitudeVariance="0.1"
          ></a-ocean>
    -->

     <!--  <a-entity tesselation-square="row: 10; col: 10; base_position_x: 0; base_position_y: 0"></a-entity> -->


      <a-box
        color="red"
        position="7 1 7"
        scale="0.5 0.5 0.5"
        sound="src: #crazy-frog; on: click1"
        toggle-event
        pause-sound="event: click2"
        clickable
      ></a-box>

      <!-- Intégration de la grille -->
      <MinesweeperGrid />

      <!-- <BaseMine position="0 0 0"></BaseMine> -->

    </template>

    <TheCameraRig />

  </a-scene>
</template>