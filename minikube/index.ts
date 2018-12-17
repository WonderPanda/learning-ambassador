import { ambassador } from './ambassador';
// import { httpBinService } from './httpbin';
import { qotmService } from './qotm';

export let ambassadorIP = ambassador
  .getResourceProperty('v1/Service', 'ambassador', 'spec')
  .apply(x => x.clusterIP);

// export let httpBinServiceIp = httpBinService.spec.apply(x => x.clusterIP);

export let qotmServiceIp = qotmService.spec.apply(x => x.clusterIP);
