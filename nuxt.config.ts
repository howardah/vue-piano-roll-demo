import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	alias: {
		"@main.css": new URL("./assets/css/main.css", import.meta.url).pathname,
	},
	// css: ["./assets/css/main.css"],
	css: ["./assets/css/main.css", "vue-piano-roll/dist/style.css"],

	vite: { plugins: [tailwindcss()] },
});
