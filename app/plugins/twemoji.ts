import twemoji from "@twemoji/api";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("twemoji", {
    mounted(el) {
      twemoji.parse(el, { folder: "svg", ext: ".svg" });
    },
    updated(el) {
      twemoji.parse(el, { folder: "svg", ext: ".svg" });
    },
    getSSRProps() {
      return {};
    },
  });
});
