import * as k8s from '@pulumi/kubernetes';

const whoAmI = 'who-am-i';
const whoAmIDeploymentName = `${whoAmI}-deployment`;
const whoAmIServiceName = `${whoAmI}-service`;
const whoAmILabels = {
  app: whoAmI
};

export const whoAmIDeployment = new k8s.apps.v1.Deployment(
  whoAmIDeploymentName,
  {
    metadata: {
      name: whoAmIDeploymentName
    },
    spec: {
      replicas: 1,
      strategy: {
        type: 'RollingUpdate'
      },
      selector: {
        matchLabels: {
          ...whoAmILabels,
          deployment: whoAmIDeploymentName
        }
      },
      template: {
        metadata: {
          labels: { ...whoAmILabels, deployment: whoAmIDeploymentName }
        },
        spec: {
          containers: [
            {
              name: whoAmI,
              image: 'containous/whoami',
              ports: [
                {
                  containerPort: 80,
                  name: 'container-port'
                }
              ]
            }
          ]
        }
      }
    }
  }
);

const whoAmIServiceAmbassadorConfig = `
---
apiVersion: ambassador/v0
kind: Mapping
name: who-am-i-mapping,
prefix: /whoami/
service: ${whoAmIServiceName}
`;

export const whoAmIService = new k8s.core.v1.Service(whoAmIServiceName, {
  metadata: {
    name: whoAmIServiceName,
    annotations: {
      ['getambassador.io/config']: whoAmIServiceAmbassadorConfig
    }
  },
  spec: {
    selector: whoAmIDeployment.spec.apply(x => x.template.metadata.labels),
    ports: [
      {
        port: 80,
        targetPort: 80,
        name: 'http'
      }
    ]
  }
});
