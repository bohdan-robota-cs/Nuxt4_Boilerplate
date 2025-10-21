import type { $Fetch } from 'nitropack/types';
import type { IEmailInput, IRecoveryPasswordInput, IVerifyEmailInput, IVerifyEmailResponse } from '~/types/auth-types';
import type { IMessageResponse } from '~/types/utility-types';
import type { UserType } from '~/constants/user-types';

class AuthModule {
  constructor(private fetchInstance: $Fetch) {}
  forgotPassword(userType: UserType, data: IEmailInput) {
    return this.fetchInstance<IMessageResponse>(`/${userType}/request-reset-password`, { method: 'POST', body: data });
  }
  forgotPasswordNomineeJudge(userType: UserType, data: IEmailInput, programSlug: string) {
    return this.fetchInstance<IMessageResponse>(`/${userType}/program/${programSlug}/request-reset-password`, {
      method: 'POST',
      body: data,
    });
  }
  resendEmail(userType: UserType, data: IEmailInput) {
    return this.fetchInstance<IMessageResponse>(`/${userType}/resend-verification-email`, {
      method: 'POST',
      body: data,
    });
  }
  verifyEmail(userType: UserType, data: IVerifyEmailInput) {
    return this.fetchInstance<IVerifyEmailResponse>(`/${userType}/verify`, { method: 'POST', body: data });
  }
  resetPassword(userType: UserType, data: IRecoveryPasswordInput) {
    return this.fetchInstance<IMessageResponse>(`/${userType}/reset-password`, { method: 'POST', body: data });
  }
}

export default AuthModule;
