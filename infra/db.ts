import * as gcp from "@pulumi/gcp";
import * as config from "./config";

// Provision a database for our spring boot app.
export const instance = new gcp.sql.DatabaseInstance("my-instance", {
    settings: {
        tier: "D0",
    },
});

const db= new gcp.sql.Database("petclinic",{
    instance:instance.name,
    name: config.dbUsername,
    
})
// Create a user with the configured credentials for the spring boot app to use.
const user = new gcp.sql.User("web-db-user", {
    instance: instance.name,
    name: config.dbUsername,
    password: config.dbPassword,
});
