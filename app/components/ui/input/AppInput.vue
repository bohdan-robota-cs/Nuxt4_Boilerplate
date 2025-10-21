<template>
  <Skeleton v-if="isLoading" class="h-11 rounded-t-md w-full mt-auto" />
  <div v-else :class="cn('relative w-full overflow-visible', props.class)">
    <div class="flex items-center gap-[4px] mb-1">
      <Label v-if="label" :for="id as string" class="p2 block">{{ isRequired ? label + ' *' : label }}</Label>
      <TooltipProvider v-if="props.tooltip">
        <Tooltip>
          <TooltipTrigger><Info class="w-[18px] h-[18px]" /></TooltipTrigger>
          <TooltipContent class="max-w-[300px]">
            {{ props.tooltip }}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
    <input
      :id="id as string"
      ref="inputRef"
      v-model="modelValue"
      :name="name"
      :placeholder="placeholder"
      :type="inputType"
      :disabled="disabled"
      :class="
        cn(
          `${smallPadding ? 'px-2' : 'px-4'} p1 placeholder:p1 flex h-9 w-full rounded-md border border-stroke bg-transparent  py-5 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium hover:border-grey focus-visible:border-main focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70`,
          nestedError && ['border-destructive']
        )
      "
    />
    <button
      v-if="props.type === 'password'"
      type="button"
      :class="
        cn(
          'absolute right-4 top-8 text-grey',
          disabled ? 'cursor-not-allowed opacity-50' : 'hover:text-main',
          nestedError && ['right-12']
        )
      "
      :disabled="disabled"
      @click="isPasswordVisible = !isPasswordVisible"
    >
      <EyeIcon v-if="!isPasswordVisible" class="h-5 w-5" />
      <EyeOffIcon v-else class="h-5 w-5" />
    </button>
    <InputErrorSvg
      v-if="nestedError && inputWidth > 170"
      :class="cn('absolute top-8 h-5 w-5', props.type === 'number' ? 'right-8' : 'right-4')"
    />
    <div v-show="nestedError" class="mt-[6px] flex items-end">
      <p class="p2 mb-2 text-destructive">{{ nestedError }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { useVModel } from '@vueuse/core';
import InputErrorSvg from '~/components/icons/InputErrorSvg.vue';
import { EyeIcon, EyeOffIcon, Info } from 'lucide-vue-next';
import { Skeleton } from '~/components/ui/skeleton';
import { useElementWidth } from '~/composables/UseElementWidth';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip';

const props = defineProps<{
  modelValue?: string | number | null;
  defaultValue?: string | number | null;
  minValueZero?: boolean;
  minValue?: number;
  maxValue?: number;
  class?: HTMLAttributes['class'];
  error?: string | null;
  placeholder?: string;
  tooltip?: string;
  id?: string | number;
  name?: string;
  disabled?: boolean;
  label?: string;
  type: string;
  isLoading?: boolean;
  isRequired?: boolean;
  smallPadding?: boolean;
}>();

const inputRef = ref<HTMLElement | null>(null);
const { width: inputWidth } = useElementWidth(inputRef);

const nestedError = ref<string | null | undefined>(null);

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number | null): void;
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue ?? '',
});

const isPasswordVisible = ref(false);

const inputType = computed(() =>
  props.type === 'password' ? (isPasswordVisible.value ? 'text' : 'password') : props.type
);

watch(
  () => props.error,
  () => {
    nestedError.value = props.error;
  },
  { immediate: true }
);
</script>
