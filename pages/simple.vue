<template>
    <div class="py-4">
        <div class="page">
            <div class="roller">
                <PianoRoll
                    v-if="!stylized"
                    :current-tick="beat"
                    range-bottom="F#2"
                    range-top="D#3"
                    v-model="notes"
                    :zoom-x="zoomX"
                    :zoom-y="zoomY"
                    :length="16"
                    :on-note-event="onNoteEvent"
                />
                <PianoRoll
                    v-else
                    :current-tick="beat"
                    range-bottom="F#2"
                    range-top="D#3"
                    v-model="notes"
                    :zoom-x="zoomX"
                    :zoom-y="zoomY"
                    :length="16"
                    :note-height="1"
                    :on-note-event="onNoteEvent"
                    :shadow-map="shadowMap"
                    shadow-color="rgb(50 62 100 / 29%)"
                    label-incidental-color="rgba(0,0,0,0.1)"
                    label-color="teal"
                    background-color="white"
                    incidental-color="rgba(0,0,0,0.1)"
                    label-background-color="white"
                    grid-color="rgba(200,200,200,1)"
                    label-border-color="rgba(200,200,200,1)"
                    note-color="teal"
                />
            </div>

            <div class="style-note">
                The Vue Piano Roll component styling is also highly
                customizable.
                <button @click="stylizeFlip">
                    Click to {{ stylized ? "unstyle" : "style" }}
                </button>
            </div>
        </div>

        <TheTransport ref="transport" size="small" />
    </div>
</template>

<script setup lang="ts">
import { type NoteEvent, PianoRoll, type ShadowMap } from "vue-piano-roll";
import "vue-piano-roll/dist/style.css";
import { notes as demoNotes } from "~/assets/demoData";

import TheTransport from "~/components/TheTransport.vue";

const notes = useState("notes", () => demoNotes);

const shadowMap = [
    { note: "G", length: 4 },
    { note: "B", length: 4 },
    { note: "D", length: 16 },
    { note: "F#", start: 4, length: 4 },
    { note: "A", start: 4, length: 4 },
    { note: "G", start: 8, length: 6 },
    { note: "B", start: 8, length: 6 },
    { note: "F#", start: 14, length: 2 },
    { note: "A", start: 14, length: 2 },
] as ShadowMap[];

const stylized = ref(false);

const beat = useState("beat", () => -1);
const zoomX = useState("zoomX", () => 1);
const zoomY = useState("zoomY", () => 0.8);

const transport = ref<typeof TheTransport>();

const onNoteEvent = (event: NoteEvent) => {
    transport.value?.onNoteEvent(event);
};

const stylizeFlip = () => {
    stylized.value = !stylized.value;
    const noteColor = stylized.value ? "teal" : "#f43f5f";
    notes.value = notes.value.map((note) => ({
        ...note,
        color: noteColor,
    }));
};

useHead(() => ({
    title: "Vue3 Piano Roll",
    meta: [
        {
            hid: "description",
            name: "description",
            content: "A piano roll component for Vue3",
        },
    ],
}));
</script>

<style scoped>
@reference "@main.css";

.page {
    @apply m-auto;
    max-width: calc(100vw - 4rem);
}
.roller {
    @apply rounded overflow-hidden shadow-lg;

    max-height: max(calc(100vh - 30rem), 30rem);
    /*   min-height: 30rem;*/
}

pre {
    @apply max-h-64 my-4 rounded overflow-hidden shadow-inner;
    @apply border-2 border-gray-400;
    @apply text-left text-xs text-gray-500 bg-gray-100 p-2 overflow-scroll;
}

.style-note {
    @apply text-center text-sm text-gray-500;
    @apply my-2;

    button {
        @apply text-indigo-500 underline;

        &:hover {
            @apply text-indigo-700;
        }
    }
}
</style>
