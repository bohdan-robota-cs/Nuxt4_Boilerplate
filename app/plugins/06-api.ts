import AuthAdminModule from '~/repository/modules/admin/auth';
import AuthModule from '~/repository/modules/general/auth';

interface IApiInstance {
  //admin types
  authAdmin: AuthAdminModule;

  //general types
  auth: AuthModule;
}

export default defineNuxtPlugin({
  name: 'api',
  dependsOn: ['fetchGeneral'],
  setup() {
    const fetchAdmin = useNuxtApp().$fetchAdmin;
    const fetchGeneral = useNuxtApp().$fetchGeneral;

    const modules: IApiInstance = {
      //admin modules
      authAdmin: new AuthAdminModule(fetchAdmin),

      //general modules
      auth: new AuthModule(fetchGeneral),
    };

    return {
      provide: {
        api: modules,
      },
    };
  },
});
