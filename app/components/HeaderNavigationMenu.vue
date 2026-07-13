<script lang="ts" setup>
import { FileText } from "@lucide/vue";

const { t } = useI18n();

const { data: servers } = await useAsyncData("servers", () =>
  queryCollection("server").where("status", "=", "available").all(),
);

const { data: rules } = await useAsyncData("rules", async () => {
  const items = await queryCollection("rule").all();
  const categoryOrder = ["general", "minecraft", "discord", "guideline", "other"];

  return items.sort(
    (a, b) => categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category),
  );
});
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>
          <NuxtLink to="/servers">
            {{ t("pages.servers.name") }}
          </NuxtLink>
        </NavigationMenuTrigger>

        <NavigationMenuContent>
          <div class="grid w-lg grid-cols-2 gap-2">
            <NuxtLink
              class="flex min-w-0 items-center gap-3 rounded-md p-2 hover:bg-zinc-300"
              :key="server.id"
              :to="`/servers/${server.path.split('/').pop()}`"
              v-for="server in servers"
            >
              <NuxtImg class="size-12 shrink-0 rounded" :src="server.iconSrc" />
              <p class="font-heading truncate font-bold">{{ server.title }}</p>
            </NuxtLink>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuTrigger>
          <NuxtLink to="/rules">
            {{ t("pages.rules.name") }}
          </NuxtLink>
        </NavigationMenuTrigger>

        <NavigationMenuContent>
          <div class="grid w-lg grid-cols-2 gap-2">
            <NuxtLink
              class="flex min-w-0 items-center gap-3 rounded-md p-2 hover:bg-zinc-300"
              :key="rule.id"
              :to="`/rules/${rule.path.split('/').pop()}`"
              v-for="rule in rules"
            >
              <span
                aria-hidden="true"
                class="flex size-12 shrink-0 items-center justify-center rounded bg-blue-500"
              >
                <FileText class="size-6 text-white" />
              </span>
              <p class="font-heading truncate font-bold">{{ rule.title }}</p>
            </NuxtLink>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink as-child>
          <NuxtLink to="/blog">
            {{ t("pages.blog.name") }}
          </NuxtLink>
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink as-child>
          <NuxtLink to="/recruits">
            {{ t("pages.recruits.name") }}
          </NuxtLink>
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink as-child>
          <NuxtLink to="/donation">
            {{ t("pages.donation.name") }}
          </NuxtLink>
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink as-child>
          <NuxtLink to="/support">
            {{ t("pages.support.name") }}
          </NuxtLink>
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NuxtLink to="/play">
          <Button class="cursor-pointer" variant="secondary">
            {{ t("pages.play.name") }}
          </Button>
        </NuxtLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>

<style scoped>
:deep([data-slot="navigation-menu-trigger"]),
:deep([data-slot="navigation-menu-link"]) {
  background-color: transparent !important;
  color: inherit !important;
}

:deep([data-slot="navigation-menu-trigger"]:hover),
:deep([data-slot="navigation-menu-trigger"]:focus-visible),
:deep([data-slot="navigation-menu-trigger"][data-state="open"]),
:deep([data-slot="navigation-menu-link"]:hover),
:deep([data-slot="navigation-menu-link"]:focus-visible),
:deep([data-slot="navigation-menu-link"][data-active]) {
  border-radius: 0.5rem;
  color: var(--color-slate-200) !important;
}

:deep([data-slot="navigation-menu-trigger"]:hover *),
:deep([data-slot="navigation-menu-trigger"]:focus-visible *),
:deep([data-slot="navigation-menu-trigger"][data-state="open"] *),
:deep([data-slot="navigation-menu-link"]:hover *),
:deep([data-slot="navigation-menu-link"]:focus-visible *),
:deep([data-slot="navigation-menu-link"][data-active] *) {
  color: var(--color-slate-200) !important;
}
</style>
