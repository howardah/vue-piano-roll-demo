<template>
  <h1>Vue3 Piano Roll</h1>
  <TheTransport />
  <div class="page">
    <div class="roller">
      <PianoRoll
        :beat="beat"
        range-bottom="F#2"
        range-top="D#3"
        v-model="notes"
        :zoom-x="zoomX"
        :zoom-y="zoomY"
        :length="30"
      />
    </div>
    <pre
      >{{ notes }}
        </pre
    >
  </div>
</template>

<script setup lang="ts">
import { PianoRoll } from "vue-piano-roll";
import "vue-piano-roll/dist/style.css";
import { notes as demoNotes } from "~/assets/demoData";

const notes = useState("notes", () => demoNotes);

const beat = useState("beat", () => -1);
const zoomX = useState("zoomX", () => 1);
const zoomY = useState("zoomY", () => 1);
</script>

<style lang="scss" scoped>
.page {
  @apply m-auto;
  max-width: calc(100vw - 4rem);
}
.roller {
  @apply rounded overflow-hidden shadow-lg;

  max-height: calc(100vh - 30rem);
}

pre {
  @apply max-h-64 my-4 rounded overflow-hidden shadow-inner;
  @apply border-2 border-gray-400;
  @apply text-left text-xs text-gray-500 bg-gray-100 p-2 overflow-scroll;
}
</style>
