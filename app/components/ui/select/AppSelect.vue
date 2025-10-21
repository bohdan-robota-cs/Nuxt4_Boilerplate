<template>
  <Skeleton v-if="isLoading" class="h-11 rounded-t-md w-full mt-auto" />
  <div v-else ref="selectRef" class="relative">
    <Select v-model="selectedItem">
      <Label v-if="label" class="p2 mb-1 block">{{ isRequired ? label + ' *' : label }}</Label>
      <SelectTrigger
        :disabled="disabled"
        :class="[
          'p1 placeholder:p1 flex h-9 w-full rounded-md border border-stroke bg-transparent px-4 py-5 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium hover:border-grey focus-visible:border-main focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70',
          nestedError && ['!border-destructive'],
        ]"
      >
        <SelectValue :placeholder="placeholder || 'Select'">
          {{ selectedItem?.name ?? placeholder }}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem v-for="item in items" :key="item.value" :value="item" @select="updateModelValue(item)">
            {{ item.name }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <InputErrorSvg v-if="nestedError && selectWidth > 200" class="absolute right-10 top-8 h-5 w-5" />
    <div v-show="nestedError" class="mt-[6px] flex items-end">
      <p class="p2 mb-2 text-destructive">{{ nestedError }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import InputErrorSvg from '~/components/icons/InputErrorSvg.vue';
import type { ISelectItem } from '~/types/utility-types';
import { Skeleton } from '~/components/ui/skeleton';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const props = defineProps<{
  items: ISelectItem[];
  defaultValue?: ISelectItem;
  modelValue: ISelectItem | null;
  error?: string | null;
  placeholder?: string;
  disabled?: boolean;
  label: string;
  isRequired?: boolean;
  isLoading?: boolean;
}>();

const selectRef = ref<HTMLElement | null>(null);
const { width: selectWidth } = useElementWidth(selectRef);
const emits = defineEmits<{
  (e: 'update:modelValue', payload: ISelectItem): void;
}>();

const selectedItem = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue ?? null,
});

const nestedError = ref<string | null | undefined>(null);

const updateModelValue = (item: ISelectItem) => {
  emits('update:modelValue', item);
};

watch(
  () => props.error,
  () => {
    nestedError.value = props.error;
  },
  { immediate: true, deep: true }
);
</script>
