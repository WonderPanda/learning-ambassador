import * as k8s from '@pulumi/kubernetes';

export const ambassador = new k8s.helm.v2.Chart('ambassador', {
  chart: 'ambassador',
  repo: 'datawire',
  version: '0.40.2',
  values: {
    service: {
      type: 'NodePort'
    },
    adminService: {
      type: 'NodePort'
    }
  }
});
