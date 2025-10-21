<template>
  <Dialog :open="props.open">
    <DialogContent
      :class="
        cn('max-h-[90vh]', hideOverflow ? '' : 'overflow-y-auto', size ? SIZE_CONST[size] : SIZE_CONST.md, props.class)
      "
      @close="closeLocal"
      @interact-outside="closeLocal"
      @escape-key-down="closeLocal"
    >
      <DialogHeader>
        <DialogTitle class="text-center leading-relaxed">{{ title }}</DialogTitle>
        <DialogDescription v-if="description"> {{ description }} </DialogDescription>
      </DialogHeader>
      <slot />
      <DialogFooter v-if="footer"> {{ footer }} </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'vue';

const SIZE_CONST = {
  sm: '!max-w-[350px]',
  md: '!max-w-[540px]',
  lg: '!max-w-[850px]',
  xl: '!max-w-[1050px]',
  xxl: '!max-w-[94%]',
};

export type AppDialogSizeType = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

interface Props {
  open: boolean;
  class?: HTMLAttributes['class'];
  title?: string;
  description?: string;
  footer?: string;
  size?: AppDialogSizeType;
  hideOverflow?: boolean;
}

interface Emits {
  (e: 'close'): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const closeLocal = () => {
  emits('close');
};
</script>
