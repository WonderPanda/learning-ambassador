import * as k8s from '@pulumi/kubernetes';

const qotm = 'qotm';
const qotmDeploymentName = `${qotm}-deployment`;
const qotmServiceName = `${qotm}-service`;
const qotmLabels = {
  app: qotm
};

export const qotmDeployment = new k8s.apps.v1.Deployment(qotmDeploymentName, {
  metadata: {
    name: qotmDeploymentName
  },
  spec: {
    replicas: 1,
    strategy: {
      type: 'RollingUpdate'
    },
    selector: {
      matchLabels: {
        ...qotmLabels,
        deployment: qotmDeploymentName
      }
    },
    template: {
      metadata: {
        labels: { ...qotmLabels, deployment: qotmDeploymentName }
      },
      spec: {
        containers: [
          {
            name: qotm,
            image: 'datawire/qotm:1.1',
            ports: [
              {
                name: 'http-api',
                containerPort: 5000
              }
            ]
          }
        ]
      }
    }
  }
});

const qotmServiceAmbassadorConfig = `
---
apiVersion: ambassador/v0
kind:  Mapping
name:  qotm_mapping
prefix: /qotm/
service: ${qotmServiceName}
`;

export const qotmService = new k8s.core.v1.Service(qotmServiceName, {
  metadata: {
    name: qotmServiceName,
    annotations: {
      ['getambassador.io/config']: qotmServiceAmbassadorConfig
    }
  },
  spec: {
    selector: qotmDeployment.spec.apply(x => x.template.metadata.labels),
    ports: [
      {
        port: 80,
        name: 'http-qotm',
        targetPort: 'http-api'
      }
    ]
  }
});
