<script lang="ts" setup>
import { ChevronDown, X } from "@lucide/vue";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";

const props = defineProps<{
  options: string[];
  placeholder?: string;
}>();

const model = defineModel<string[]>({ required: true });
const open = ref(false);

const selectedOptions = computed(() =>
  props.options.filter((option) => model.value.includes(option)),
);

const { t } = useI18n();

function toggleTag(tag: string) {
  model.value = model.value.includes(tag)
    ? model.value.filter((t) => t !== tag)
    : [...model.value, tag];
}

function removeTag(tag: string) {
  model.value = model.value.filter((t) => t !== tag);
}
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <button
        type="button"
        class="border-input bg-background flex min-h-10 w-full cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-left"
      >
        <div class="flex min-h-5 min-w-0 flex-1 items-center">
          <div class="flex flex-wrap gap-2" v-if="selectedOptions.length">
            <Badge class="h-5 gap-1" :key="tag" @click.stop v-for="tag in selectedOptions">
              {{ tag }}

              <button
                aria-label="タグを削除"
                type="button"
                class="-mr-1 inline-flex size-5 cursor-pointer items-center justify-center rounded-full opacity-70 hover:opacity-100"
                @click.stop="removeTag(tag)"
              >
                <X class="size-3" />
              </button>
            </Badge>
          </div>

          <span class="text-muted-foreground h-5 truncate text-sm leading-5" v-else>
            {{ placeholder ?? t("components.tagPicker.placeholder") }}
          </span>
        </div>

        <ChevronDown
          class="size-4 shrink-0 text-slate-600 opacity-50 transition-transform"
          :class="{ 'rotate-180': open }"
        />
      </button>
    </PopoverTrigger>

    <PopoverContent class="p-3" align="start">
      <div class="flex max-h-64 flex-wrap gap-2 overflow-y-auto">
        <Badge
          type="button"
          class="cursor-pointer"
          :key="option"
          :variant="model.includes(option) ? 'default' : 'secondary'"
          @click="toggleTag(option)"
          as="button"
          v-for="option in options"
        >
          {{ option }}
        </Badge>
      </div>
    </PopoverContent>
  </Popover>
</template>

<style scoped></style>
