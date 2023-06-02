<template>
  <div class="transport">
    <div class="top">
      <button class="btn rewind" @click="rewind"><Icon :icon="rewindIcon" /></button>
      <button class="btn fast-forward" @click="fastForward">
        <Icon :icon="fastForwardIcon" />
      </button>
      <button class="btn stop" @click="stop"><Icon :icon="stopIcon" /></button>
      <button class="btn play" :class="{ playing }" @click="playPause">
        <Icon :icon="playing ? pauseIcon : playIcon" />
      </button>
    </div>
    <div class="bottom">
      <select v-model="synthSelector">
        <option value="synth">Synth</option>
        <option value="amSynth">AM Synth</option>
        <option value="fmSynth">FM Synth</option>
      </select>

      <input v-model="tempo" min="1" max="400" type="number" name="tempo" id="tempo" />

      <button class="btn zoom-in" @click="zoomIn">+</button>
      <button class="btn zoom-out" @click="zoomOut">-</button>

      <button class="btn clear" @click="notes = []">Clear</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import playIcon from "@iconify-icons/mdi/play";
import pauseIcon from "@iconify-icons/mdi/pause";
import stopIcon from "@iconify-icons/mdi/stop";
import rewindIcon from "@iconify-icons/mdi/rewind";
import fastForwardIcon from "@iconify-icons/mdi/fast-forward";
import * as Tone from "tone";
import { NoteEvent, PianoRollNote } from "vue-piano-roll";

const playing = useState("playing", () => false);
const beat = useState("beat", () => -1);
const tempo = useState("tempo", () => 120);
const notes = useState("notes", () => [] as PianoRollNote[]);
const zoomX = useState("zoomX", () => 1);
const zoomY = useState("zoomY", () => 1);

const synthSelector = useState("synthSelector", () => "amSynth");

const rewind = () => {
  console.log(beat.value);
  beat.value -= 1;
};

const fastForward = () => {
  beat.value += 1;
};

const playPause = () => {
  startStop();
};

const initialized = ref(false);

let synth: null | Tone.PolySynth = null;

const synthList: Record<string, any> = {
  synth: null as null | Tone.Synth,
  amSynth: null as null | Tone.AMSynth,
  fmSynth: null as null | Tone.FMSynth,
};

const unit = "8n";

watch(synthSelector, (value) => {
  if (synth) synth.releaseAll();
  synth = synthList[value];
});

const zoomIn = () => {
  zoomX.value += 0.1;
  zoomY.value += 0.1;
};

const zoomOut = () => {
  zoomX.value -= 0.1;
  zoomY.value -= 0.1;
};

const initialize = async () => {
  await Tone.start();
  // initialize synthList with all the synths
  for (const key in synthList) {
    let newSynth;

    switch (key) {
      case "synth":
        newSynth = new Tone.PolySynth(Tone.Synth).toDestination();
        break;
      case "amSynth":
        newSynth = new Tone.PolySynth(Tone.AMSynth).toDestination();
        break;
      case "fmSynth":
        newSynth = new Tone.PolySynth(Tone.FMSynth).toDestination();
        break;

      default:
        newSynth = new Tone.Synth().toDestination();
        break;
    }

    synthList[key] = newSynth;
  }

  synth = synthList[synthSelector.value];
  initialized.value = true;
};

const schedule = () => {
  Tone.Transport.cancel();
  Tone.Transport.scheduleRepeat(() => {
    beat.value += 1;
  }, unit);
};

const play = async () => {
  playing.value = true;
  if (!initialized.value) await initialize();
  if (!synth) synth = new Tone.PolySynth(Tone.Synth).toDestination();

  Tone.Transport.start();
};

const stop = () => {
  pause();
  beat.value = -1;
};

const pause = () => {
  Tone.Transport.stop();
  playing.value = false;
  if (synth) synth.releaseAll();
};

const startStop = () => {
  if (Tone.Transport.state === "started") {
    pause();
    return;
  }

  play();
};

const onNoteEvent = (event: NoteEvent) => {
  event.notesEnding.forEach((note) => {
    synth?.triggerRelease(note);
  });

  event.notesStarting.forEach((note) => {
    synth?.triggerAttack(note);
  });
};

defineExpose({
  onNoteEvent,
});

watch(tempo, (value) => {
  Tone.Transport.bpm.value = value;
});

onMounted(() => {
  Tone.Transport.bpm.value = tempo.value;
  schedule();
});
</script>

<style lang="scss" scoped>
.transport {
  @apply grid gap-2 pt-2 pb-8 px-4;
  .top,
  .bottom {
    @apply flex items-center justify-center;
  }
  .top {
    .btn {
      // @apply bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded;
      @apply rounded-none;

      &:first-child {
        @apply rounded-l;
      }

      &:last-child {
        @apply rounded-r;
      }
    }
  }

  .bottom {
    @apply gap-2;

    select {
      //   @apply bg-indigo-500 hover:bg-indigo-700 text-white text-xs font-bold py-2 px-4 rounded;
      @apply bg-white text-indigo-500 text-xs font-bold py-2 px-4 rounded border-4 border-indigo-500;
      @apply hover:border-indigo-700 hover:text-indigo-700;

      &:focus {
        @apply outline-none;
      }
    }

    input {
      @apply bg-white text-indigo-500 text-xs font-bold py-2 px-4 rounded border-4 border-indigo-500;
      @apply hover:border-indigo-700 hover:text-indigo-700;

      width: fit-content;

      &:focus {
        @apply outline-none;
      }
    }

    .clear {
        // @apply bg-white text-indigo-500 text-xs font-bold py-2 px-4 rounded border-4 border-indigo-500;
        @apply bg-rose-500 text-white text-xs font-bold py-2 px-4 rounded border-4 border-rose-500;
        @apply hover:border-rose-700 hover:bg-rose-700;
    }
  }
}
</style>
