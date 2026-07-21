<script lang="ts" setup>
import { cn } from "~/lib/utils";

const { t } = useI18n();

defineProps<{
  transparent?: boolean;
}>();
</script>

<template>
  <header :class="cn('text-white', transparent ? 'bg-transparent' : 'bg-zinc-800')">
    <div class="mx-auto flex w-full max-w-4xl items-center justify-between px-2 py-3">
      <NuxtLink class="flex items-center gap-2" to="/">
        <NuxtImg class="rounded-md" height="32" src="/images/logo.webp" width="32" />

        <div class="flex flex-col justify-center gap-1">
          <h1 class="font-logo text-lg leading-none font-bold">
            {{ t("components.header.title") }}
          </h1>
          <span class="font-mono text-xs leading-none text-slate-200">azisaba.net</span>
        </div>
      </NuxtLink>

      <div class="hidden min-[1100px]:block">
        <HeaderNavigationMenu />
      </div>

      <div class="min-[1100px]:hidden">
        <ClientOnly>
          <HeaderSheet />
        </ClientOnly>
      </div>
    </div>
  </header>
</template>
