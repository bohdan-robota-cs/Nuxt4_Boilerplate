<template>
  <div class="flex w-full h-screen bg-white">
    <div class="flex flex-col items-start gap-y-[50px] p-[20px]">
      <div class="flex flex-col gap-y-[20px]">
        <div class="flex items-center gap-x-[50px]">
          <h1 class="h1">Heading example h1</h1>
          <h2 class="h2">Heading example h2</h2>
          <h3 class="h3">Heading example h3</h3>
          <h4 class="h4">Heading example h4</h4>
        </div>
        <div class="flex items-center gap-x-[50px]">
          <p class="p1">Text example p1</p>
          <p class="p2">Text example p2</p>
          <p class="p3">Text example p3</p>
          <p class="p4">Text example p4</p>
        </div>
      </div>

      <div class="w-full flex items-center gap-x-[50px]">
        <Button size="lg" @click="showToast">Toast</Button>
        <Button size="lg" @click="showOverviewModal">Modal</Button>
        <Button size="lg" variant="secondary">Secondary</Button>
        <Button size="lg" variant="outline">Outline</Button>
        <Button size="lg" variant="ghost">Ghost</Button>
        <Button size="lg" :is-loading="true">Loading</Button>
        <Button size="default">Button</Button>
        <Button size="sm">Button</Button>
      </div>

      <div class="w-full flex items-start gap-x-[50px]">
        <AppInput id="email" type="email" label="Email" placeholder="Email" />
        <AppInput id="email" tooltip="Tooltip description" type="email" label="Email" placeholder="Email" />
        <AppInput id="email" type="email" label="Email" placeholder="Email" error="Validation error" />
      </div>

      <AppTextarea id="respond" type="text" label="Message" placeholder="Message" />

      <AppTabs v-model="currentTab" :tabs="tabs">
        <template #personal>
          <h3 class="h3">Personal info</h3>
        </template>
        <template #details>
          <h3 class="h3">Details</h3>
        </template>
        <template #payments>
          <h3 class="h3">Payments</h3>
        </template>
      </AppTabs>
      <AppSelect v-model="selectItem" :items="selectItems" label="Select Item" class="w-[300px]" />
    </div>
    <AppModal :open="overviewModalStatus" title="Modal title" @close="hideOverviewModal">
      <div class="mt-[32px] flex justify-between">
        <Button variant="secondary" @click="hideOverviewModal">Cancel</Button>
        <Button @click="hideOverviewModal">OK</Button>
      </div>
    </AppModal>
  </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button';
import AppModal from '~/components/ui/dialog/AppModal.vue';
import AppInput from '~/components/ui/input/AppInput.vue';
import AppTextarea from '~/components/ui/textarea/AppTextarea.vue';
import type { ISelectItem, ITab } from '~/types/utility-types';
import AppTabs from '~/components/ui/tabs/AppTabs.vue';
import AppSelect from '~/components/ui/select/AppSelect.vue';

const { $toast } = useNuxtApp();

const selectItem = ref<ISelectItem>({ value: 1, name: 'Personal information' });

const currentTab = ref<ITab>({ value: 'account', label: 'Personal information' });

const selectItems = ref<ISelectItem[]>([
  { value: 1, name: 'Personal information' },
  { value: 2, name: 'Organization details' },
  { value: 3, name: 'Payments connection' },
]);

const tabs = ref<ITab[]>([
  { value: 'personal', label: 'Personal information' },
  { value: 'details', label: 'Organization details' },
  { value: 'payments', label: 'Payments connection' },
]);

const overviewModalStatus = ref<boolean>(false);

const showOverviewModal = () => {
  overviewModalStatus.value = true;
};

const hideOverviewModal = () => {
  overviewModalStatus.value = false;
};

const showToast = () => {
  $toast.success('Success message');
};
</script>
<style scoped></style>
