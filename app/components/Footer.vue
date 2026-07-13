<script lang="ts" setup>
const { t } = useI18n();

const year = new Date().getFullYear();
</script>

<template>
  <footer class="border-t border-slate-800 bg-zinc-800 px-4 py-8 text-white">
    <div class="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
      <div class="grid grid-cols-1 gap-8 text-sm sm:grid-cols-2 sm:gap-10">
        <nav class="flex flex-col gap-2">
          <h2 class="font-bold text-white">{{ t("components.footer.navigation.legal") }}</h2>
          <ul>
            <li>
              <NuxtLink to="/rules/terms">
                {{ t("components.footer.links.terms") }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/privacy-policy">
                {{ t("components.footer.links.privacyPolicy") }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/donation/commercial-transactions">
                {{ t("components.footer.links.commercialTransactions") }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/rules">
                {{ t("components.footer.links.rules") }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <nav class="flex flex-col gap-2">
          <h2 class="font-bold text-white">アジ鯖をフォロー</h2>
          <ul>
            <li>
              <NuxtLink rel="noopener noreferrer" to="https://www.youtube.com/@AzisabaNetwork">
                {{ t("components.footer.links.youtube") }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink rel="noopener noreferrer" to="https://github.com/AzisabaNetwork">
                {{ t("components.footer.links.github") }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink rel="noopener noreferrer" to="https://x.com/AzisabaNetwork">
                {{ t("components.footer.links.twitter") }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>

      <p>{{ t("components.footer.copyright", { year }) }}</p>
    </div>
  </footer>
</template>

<style scoped>
ul {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

li > a {
  transition: color 0.2s ease-in;
  color: var(--color-slate-400);
  text-decoration: none;
}

li > a:hover {
  color: white;
  text-decoration: underline;
}
</style>
