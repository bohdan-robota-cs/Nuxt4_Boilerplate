<template>
  <Tabs v-model="activeTabValue">
    <TabsList>
      <TabsTrigger v-for="tab in tabs" :key="tab.value" :value="tab.value">
        {{ tab.label }}
      </TabsTrigger>
    </TabsList>

    <TabsContent v-for="tab in tabs" :key="tab.value" :value="tab.value" class="pt-[30px]">
      <slot :name="tab.value"></slot>
    </TabsContent>
  </Tabs>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { ITab } from '~/types/utility-types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const props = defineProps<{
  tabs: ITab[];
  modelValue?: ITab;
  defaultValue?: ITab;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: ITab): void;
}>();

const route = useRoute();
const router = useRouter();

const activeTab = computed(() => {
  const tabFromUrl = props.tabs.find(tab => tab.value === route.query.tab);
  return tabFromUrl || props.modelValue || props.defaultValue || props.tabs[0];
});

const activeTabValue = computed({
  get: () => activeTab?.value?.value,
  set: value => {
    const selectedTab = props.tabs.find(tab => tab.value === value);
    if (selectedTab) {
      emit('update:modelValue', selectedTab);
      router.push({ query: { ...route.query, tab: value } });
    }
  },
});

watch(
  () => route.query.tab,
  newTab => {
    const selectedTab = props.tabs.find(tab => tab.value === newTab);
    if (selectedTab) {
      emit('update:modelValue', selectedTab);
    }
  }
);
</script>
