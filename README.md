# TET Project 4 - Scalable Systems

## Team members

* Wendy Arango - warango4@eafit.edu.co
* Manuela Carrasco - mcarras1@eafit.edu.co
* Juan Manuel Ciro - jcirore@eafit.edu.co
* Juan José Suárez - jsuare32@eafit.edu.co

## Members roles and responsabilities
 * Wendy Arango **-->** Database deployment.
   - Deploying MongoDB in Google Cloud with Google Kubernetes Engine (GKE).
 * Manuela Carrasco **-->** Load balancer depoyment.
   - Deploying NGINX in Google Cloud with Google Kubernetes Engine (GKE).
 * Juan Manuel Ciro **-->** Front end deployment.
   - Organizing application so it can be understandable for any user.
 * Juan José Suárez **-->** Back end deployment.
   - Developing application functionalities.

## Non functional requirements
  1. Availability:
    There is a guarantee the application is going to be up 99.99% of the time. (High availability).
    In this project, **availability** is reflected this way:
       - For application: there are two instances of NGINX server that store a Docker container which has the application and all its dependencies. There is a load balancer which sends users requests to both instances. Each processes the requests depending on the actual number of users. If there is a failover of one of the instances, then the other starts to take the load until the problem is solved and the one which failed gets up again.
       - For database: //Yo hago esto
  2. Performance:
  3. Security: 