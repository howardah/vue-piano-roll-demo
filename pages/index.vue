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
import { PianoRoll, PianoRollNote } from "vue-piano-roll";
import "vue-piano-roll/dist/style.css";

const notes = useState(
  "notes",
  () =>
  [
  {
    "id": 0,
    "start": 0,
    "length": 1,
    "note": "B2",
    "velocity": 100,
    "color": "red",
    "dragging": false
  },
  {
    "id": 1,
    "start": 1,
    "length": 1,
    "note": "B2",
    "velocity": 100,
    "color": "red",
    "dragging": false
  },
  {
    "id": 2,
    "start": 2,
    "length": 1,
    "note": "C3",
    "velocity": 100,
    "color": "red",
    "dragging": false
  },
  {
    "id": 3,
    "start": 3,
    "length": 1,
    "note": "D3",
    "velocity": 100,
    "color": "red",
    "dragging": false
  },
  {
    "id": 4,
    "start": 4,
    "length": 1,
    "note": "D3",
    "velocity": 100,
    "color": "red",
    "dragging": false
  },
  {
    "id": 5,
    "start": 5,
    "length": 1,
    "note": "C3",
    "velocity": 100,
    "color": "red",
    "dragging": false
  },
  {
    "id": 6,
    "start": 6,
    "length": 1,
    "note": "B2",
    "velocity": 100,
    "color": "red",
    "dragging": false
  },
  {
    "id": 7,
    "start": 7,
    "length": 1,
    "note": "A2",
    "velocity": 100,
    "color": "red",
    "dragging": false
  },
  {
    "id": 8,
    "start": 8,
    "length": 1,
    "note": "G2",
    "velocity": 100,
    "color": "red",
    "dragging": false
  },
  {
    "id": 9,
    "start": 9,
    "length": 1,
    "note": "G2",
    "velocity": 100,
    "color": "red",
    "dragging": false
  },
  {
    "id": 10,
    "start": 10,
    "length": 1,
    "note": "A2",
    "velocity": 100,
    "color": "red",
    "dragging": false
  },
  {
    "id": 11,
    "start": 11,
    "length": 1,
    "note": "B2",
    "velocity": 100,
    "color": "red",
    "dragging": false
  },
  {
    "id": 12,
    "start": 12,
    "length": 1.5,
    "note": "B2",
    "velocity": 100,
    "color": "red",
    "dragging": false
  },
  {
    "id": 12,
    "start": 13.5,
    "length": 0.5,
    "note": "A2",
    "velocity": 100,
    "color": "red",
    "dragging": false
  },
  {
    "id": 13,
    "start": 14,
    "length": 2,
    "note": "A2",
    "velocity": 100,
    "color": "red",
    "dragging": false
  }
] as PianoRollNote[]
);

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
