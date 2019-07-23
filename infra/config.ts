import { Config } from "@pulumi/pulumi";

const config = new Config();

/// Docker config


export const dockerUsername = config.require("dockerUsername");
export const dockerPassword = config.require("dockerPassword");


/// MySQL config
export const dbUsername = config.require("dbUsername") || "petclinic";
export const dbPassword = config.require("dbPassword");

//export const dbUsername = "petclinic";
//export const dbPassword = "petclinic";

/// Kubernetes config
export const clusterNodeCount = config.getNumber("clusterNodeCount") || 1;
export const clusterNodeMachineType = config.get("clusterNodeMachineType") || "n1-standard-1";
//export const clusterUsername = "admin";
//export const clusterPassword = "123456789!!123456789!";

export const clusterUsername = config.get("clusterUsername") || "admin";
export const clusterPassword = config.require("clusterPassword");
