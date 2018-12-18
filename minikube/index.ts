import { ambassador } from './ambassador';
// import { httpBinService } from './httpbin';
import { qotmService } from './qotm';
import { whoAmIService } from './whoami';
import { whoAmIServiceTwo } from './whoami2';

export let ambassadorIP = ambassador
  .getResourceProperty('v1/Service', 'ambassador', 'spec')
  .apply(x => x.clusterIP);

// export let httpBinServiceIp = httpBinService.spec.apply(x => x.clusterIP);

// let whoAmIService = new ServiceDeployment('who-am-i', {
//   image: 'jwilder/whoami',
//   isMinikube: true,
//   ports: [8000],
//   replicas: 1
// });

export let whoAmIServiceIp = whoAmIService.spec.apply(x => x.clusterIP);
export let whoAmIServiceTwoIp = whoAmIServiceTwo.spec.apply(x => x.clusterIP);

export let qotmServiceIp = qotmService.spec.apply(x => x.clusterIP);
