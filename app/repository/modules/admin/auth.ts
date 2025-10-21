import type { $Fetch } from 'nitropack/types';
import type { IAdminLoginInput, ILoginAdminResponse, IRecoveryPasswordInput } from '~/types/admin/auth-types';
import type { IEmailInput } from '~/types/auth-types';
import type { IMessageResponse } from '~/types/utility-types';

class AuthAdminModule {
  constructor(private fetchInstance: $Fetch) {}
  login(data: IAdminLoginInput) {
    return this.fetchInstance<ILoginAdminResponse>('/admin/login', { method: 'POST', body: data });
  }
  forgotPassword(data: IEmailInput) {
    return this.fetchInstance<IMessageResponse>('/admin/request-reset-password', { method: 'POST', body: data });
  }
  resetPassword(data: IRecoveryPasswordInput) {
    return this.fetchInstance<IMessageResponse>('/admin/reset-password', { method: 'POST', body: data });
  }
}

export default AuthAdminModule;
