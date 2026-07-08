<script lang="ts" setup>
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "~/components/ui/sheet";
import { Menu } from "@lucide/vue";

const { t } = useI18n();

const open = ref(false);

function closeSheet() {
  open.value = false;
}
</script>

<template>
  <Sheet v-model:open="open">
    <SheetTrigger>
      <button
        type="button"
        class="inline-flex size-10 cursor-pointer items-center justify-center rounded-md text-slate-200 transition-colors hover:bg-zinc-700 hover:text-white"
      >
        <Menu class="size-6" />
      </button>
    </SheetTrigger>

    <SheetContent>
      <SheetHeader>
        <SheetTitle class="font-display text-xl font-bold">
          {{ t("components.header.title") }}
        </SheetTitle>
      </SheetHeader>

      <nav class="mt-2 p-4">
        <ul class="flex flex-col gap-6">
          <li>
            <NuxtLink
              class="flex items-center gap-3 text-slate-800"
              @click="closeSheet"
              to="/servers"
            >
              <span class="bg-azisaba w-2 shrink-0 self-stretch" />
              {{ t("pages.servers.name") }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              class="flex items-center gap-3 text-slate-800"
              @click="closeSheet"
              to="/rules"
            >
              <span class="bg-azisaba w-2 shrink-0 self-stretch" />
              {{ t("pages.rules.name") }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink class="flex items-center gap-3 text-slate-800" @click="closeSheet" to="/blog">
              <span class="bg-azisaba w-2 shrink-0 self-stretch" />
              {{ t("pages.blog.name") }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              class="flex items-center gap-3 text-slate-800"
              @click="closeSheet"
              to="/recruits"
            >
              <span class="bg-azisaba w-2 shrink-0 self-stretch" />
              {{ t("pages.recruits.name") }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              class="flex items-center gap-3 text-slate-800"
              @click="closeSheet"
              to="/donation"
            >
              <span class="bg-azisaba w-2 shrink-0 self-stretch" />
              {{ t("pages.donation.name") }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              class="flex items-center gap-3 text-slate-800"
              @click="closeSheet"
              to="/support"
            >
              <span class="bg-azisaba w-2 shrink-0 self-stretch" />
              {{ t("pages.support.name") }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </SheetContent>
  </Sheet>
</template>

<style scoped>
ul > li {
  font-size: 1.2rem;
}
</style>
