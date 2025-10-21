import { FetchError } from 'ofetch';
import { reactive, ref } from 'vue';

type Errors422 = Record<string, string[]>;
type ErrorsTransformed422 = Record<string, string>;

export default function useForm<TFormData extends Record<string, unknown>, TApiResult>(
  apiFn: (args: TFormData) => Promise<TApiResult>,
  formData: TFormData,
  onSuccess?: (args: TApiResult) => void
) {
  const { $toast } = useNuxtApp();
  const form = reactive(formData);
  const errors = ref<Record<keyof TFormData, string | undefined> | Record<string, string>>({});

  const notice = ref<string | null>(null);
  const pending = ref(false);
  const success = ref(false);

  async function send() {
    errors.value = {};
    notice.value = null;
    pending.value = true;
    success.value = false;

    try {
      const res = await apiFn(formData);
      success.value = true;
      onSuccess && onSuccess(res);
    } catch (e) {
      console.error(e);

      if (e instanceof FetchError && e.status === 422) {
        const errors422 = e.data.errors as Errors422;
        errors.value = transformErrors(errors422);
      } else {
        const errorMessage = e?.data?.message ?? 'Internal server error';
        notice.value = errorMessage;
        $toast.error(errorMessage || e?.message);
      }
    } finally {
      pending.value = false;
    }
  }

  function clear() {
    for (const key in formData) {
      formData[key] = '' as TFormData[typeof key];
    }
  }

  return {
    form,
    errors,
    notice,
    send,
    pending,
    success,
    clear,
  };
}

function transformErrors(errors: Errors422): ErrorsTransformed422 {
  const transformed: ErrorsTransformed422 = {};

  for (const key in errors) {
    if (errors.hasOwnProperty(key)) {
      transformed[key] = errors[key][0];
    }
  }

  return transformed;
}
