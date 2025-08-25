<template>
    <div class="container m-auto">
        <NuxtPage />
    </div>
</template>

<style>
@reference "@main.css";

h1 {
    @apply text-4xl text-center font-bold m-4 text-indigo-600;
}

.btn {
    @apply bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded;
}
</style>
