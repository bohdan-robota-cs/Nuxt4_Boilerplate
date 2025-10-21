<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import type { ButtonVariants } from '.';
import { Primitive } from 'reka-ui';
import { cn } from '@/lib/utils';
import { buttonVariants } from '.';
import { Loader2 } from 'lucide-vue-next';

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant'];
  size?: ButtonVariants['size'];
  class?: HTMLAttributes['class'];
  isLoading?: boolean;
  disabled?: boolean;
  loadingText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  isLoading: false,
  disabled: false,
  loadingText: 'Please wait',
  variant: 'default',
  size: 'default',
  class: '',
});

const isDisabled = computed(() => props.disabled || props.isLoading);
</script>

<template>
  <Primitive
    :as="as"
    :class="
      cn(buttonVariants({ variant: props.variant, size: props.size }), props.class, {
        'cursor-not-allowed': isDisabled && props.variant,
      })
    "
    :disabled="isDisabled"
  >
    <template v-if="isLoading">
      <Loader2 class="h-5 w-5 animate-spin" />
      <span>{{ props.loadingText }}</span>
    </template>
    <template v-else>
      <slot />
    </template>
  </Primitive>
</template>
