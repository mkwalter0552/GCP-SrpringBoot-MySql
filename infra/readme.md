This example is a full end to end example of delivering a containerized Spring Boot Mysql application. It

*Provisions a Google Kubernetes Engine (GKE) cluster

*Provisions a fully managed Google Cloud SQL MySql database

*Builds a containerized Spring Boot Mysql container image, and publishes it to Docker Hub

*Deploys that container image as a Kubernetes Service inside of the provisioned GKE cluster


All of these happen behind a single pulumi up command, and are expressed in just a handful of TypeScript.

Prerequisites:

Ensure you have downloaded and installed the Pulumi CLI.

We will be deploying to Google Cloud Platform (GCP), so you will need an account. If you don't have an account, sign up for free. In either case, follow the instructions here to connect Pulumi to your GCP account.
 
The Pulumi Google Cloud Platform Provider needs to be configured with Google credentials before it can be used to create resources.                  
 When developing locally, we recommend that you use gcloud login to configure your account credentials:
 gcloud auth login
 
 gcloud config set project <YOUR_GCP_PROJECT_HERE>
 
 gcloud auth application-default login
 
 
 pulumi config set gcp:project <your-project-here>
 
 pulumi config set gcp:region <your-region-here>
 
 pulumi config set gcp:zone <your-zone-here>


This example assumes that you have GCP's gcloud CLI on your path. This is installed as part of the GCP SDK.


Running the Example:

After cloning this repo, cd infra/ and run these commands.

1)Create a new stack, which is an isolated deployment target for this example:

$ pulumi stack init gcp-dev


2)Set the required configuration variables for this program:

$ pulumi config set gcp:project [your-gcp-project-here]

$ pulumi config set gcp:zone us-central1 # any valid GCP zone works

$ pulumi config set gcp:region us-central

$ pulumi config set clusterPassword --secret [your-new-cluster-password-here]   (atleast 16 characters long)

$ pulumi config set dbPassword --secret [your-new-db-password-here]

$ pulumi config set dockerUsername [your-dockerhub-username-here]

$ pulumi config set dockerPassword --secret [your-dockerhub-password-here]

3)Deploy everything with the pulumi up command. 

This provisions all the GCP resources necessary, including your GKE cluster and database, as well as building and publishing your container image, all in a single gesture:

After this completes, numerous outputs will show up. 
'appAddress' is the URL that your Spring Boot app will be available at, appName is the resulting Kubernetes Deployment, dbAddress is your MySql hostname in case you want to connect to it with mysql, and kueConfig is the full Kubernetes configuration that you can use with kubectl

4) At this point, you have a running cluster.Feel free to modify your program, and run pulumi up to redeploy changes. The Pulumi CLI automatically detects what has changed and makes the minimal edits necessary to accomplish these changes. This could be altering the app code, adding new GCP or Kubernetes resources, or anything, really.


5)Once you are done, you can destroy all of the resources, and the stack:
  
$ pulumi destroy

$ pulumi stack rm
