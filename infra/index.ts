import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import * as docker from "@pulumi/docker";
import * as k8s from "@pulumi/kubernetes";
import * as db from "./db";
import * as config from "./config";
import * as cluster from "./cluster";


// Get the GCR repository for our app container, and build and publish the app image.
const appImage = new docker.Image("springBoot", {
    imageName: `${config.dockerUsername}/${pulumi.getProject()}_${pulumi.getStack()}`,
    build: "../",
    registry: {
        server: "docker.io",
        username: config.dockerUsername,
        password: config.dockerPassword,
    },
});
// Deploy the app container as a Kubernetes load balanced service.
const appPort = 8080;
const appLabels = { app: "spring-boot-app" };
const appDeployment = new k8s.apps.v1.Deployment("spring-boot-deployment", {
    spec: {
        selector: { matchLabels: appLabels },
        replicas: 1,
        template: {
            metadata: { labels: appLabels },
            spec: {
                containers: [{
                    name: "spring-boot-app",
                    image: appImage.imageName,
                    ports: [{ containerPort: appPort }],
                }],
            },
        },
    },
}, { provider: cluster.provider });
const appService = new k8s.core.v1.Service("spring-boot-service", {
    metadata: { labels: appDeployment.metadata.labels },
    spec: {
        type: "LoadBalancer",
        ports: [{ port: appPort, targetPort: appPort }],
        selector: appDeployment.spec.template.metadata.labels,
    },
}, { provider: cluster.provider });

// Export the app deployment name so we can easily access it.
export let appName = appDeployment.metadata.name;

// Export the service's IP address.
export let appAddress = appService.status.apply(s => `http://${s.loadBalancer.ingress[0].ip}:${appPort}`);

// Export the database address for client connections.
export let dbAddress = db.instance.firstIpAddress;

// Also export the Kubeconfig so that clients can easily access our cluster.
export let kubeConfig = cluster.config;
