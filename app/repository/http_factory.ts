import type { $Fetch } from 'nitropack/types';

class Http_factory {
  public fetchInstance: $Fetch;

  constructor(fetchInstance: $Fetch) {
    this.fetchInstance = fetchInstance;
  }
}

export default Http_factory;
