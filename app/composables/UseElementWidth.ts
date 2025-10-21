import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue';

export function useElementWidth(targetRef: Ref<HTMLElement | null>) {
  const width = ref(0);
  let observer: ResizeObserver | null = null;

  const observe = () => {
    if (targetRef.value) {
      observer = new ResizeObserver(entries => {
        for (const entry of entries) {
          width.value = entry.contentRect.width;
        }
      });
      observer.observe(targetRef.value);
    }
  };

  const stop = () => {
    if (observer && targetRef.value) {
      observer.unobserve(targetRef.value);
    }
  };

  onMounted(observe);
  onBeforeUnmount(stop);

  return { width };
}
