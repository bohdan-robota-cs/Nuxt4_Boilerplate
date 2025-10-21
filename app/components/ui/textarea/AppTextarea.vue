<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { useVModel } from '@vueuse/core';
import { Skeleton } from '~/components/ui/skeleton';

const props = defineProps<{
  class?: HTMLAttributes['class'];
  defaultValue?: string | number;
  modelValue?: string | number;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  readonly?: boolean;
  error?: string | null;
  isRequired?: boolean;
  isLoading?: boolean;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void;
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
});

const nestedError = ref<string | null | undefined>(null);

watch(
  () => modelValue.value,
  () => {
    nestedError.value = null;
  }
);

watch(
  () => props.error,
  () => {
    nestedError.value = props.error;
  }
);
</script>

<template>
  <Skeleton v-if="isLoading" class="h-20 rounded-t-md w-full mt-auto" />
  <div v-else class="w-full">
    <Label v-if="label" class="p2 mb-1 block">{{ isRequired ? label + ' *' : label }}</Label>
    <textarea
      v-model="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :class="
        cn(
          'flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground hover:border-grey focus-visible:border-main focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70',
          nestedError && ['border-destructive'],
          props.class
        )
      "
    />
    <div v-show="nestedError" class="mt-[6px] flex items-end">
      <p class="p2 mb-2 text-destructive">{{ nestedError }}</p>
    </div>
  </div>
</template>
