import * as k8s from '@pulumi/kubernetes';

const httpBin = 'http-bin';

export const httpBinService = new k8s.core.v1.Service(httpBin, {
  metadata: {
    name: httpBin,
    annotations: {
      ['getambassador.io/config']: `
---
apiVersion: ambassador/v0
kind:  Mapping
name:  httpbin_mapping
prefix: /httpbin/
service: httpbin.org:80
host_rewrite: httpbin.org`
    }
  },
  spec: {
    ports: [
      {
        name: httpBin,
        port: 80
      }
    ]
  }
});
