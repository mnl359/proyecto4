# TET Project 4 - Scalable Systems

## Team members

* Wendy Arango - warango4@eafit.edu.co
* Manuela Carrasco - mcarras1@eafit.edu.co
* Juan Manuel Ciro - jcirore@eafit.edu.co
* Juan José Suárez - jsuare32@eafit.edu.co

The site is available at http://st0263.tk/

## Members roles and responsabilities
 * Wendy Arango **-->** Database deployment.
   - Deploying MongoDB in Google Cloud with Google Kubernetes Engine (GKE).
 * Manuela Carrasco **-->** Load balancer deployment.
   - Deploying Load Balancer and NGINX Server in Google Cloud with Google Kubernetes Engine (GKE).
 * Juan Manuel Ciro **-->** Front end deployment.
   - Organizing application so it can be understandable for any user.
 * Juan José Suárez **-->** Back end deployment.
   - Developing application functionalities.

## Non functional requirements
  1. Availability:
    There is a guarantee the application is going to be up 99.99% of the time. (High availability).
    In this project, **availability** is reflected in:
       - For application: There are two instances of NGINX server that store a Docker container which has the application and all its dependencies. There is a load balancer which sends users requests to both instances. Each processes the requests depending on the actual number of users. If there is a failover of one of the instances, then the other starts to take the load until the problem is solved and the one which failed gets up again.
       - For database: there is a cluster in GKE with three pods containing MongoDB. One is a Primary node, in which all writing requests are performed. The other one is a Secondary node, which is a replica of the Primary. There is also an Arbiter node, that ensures Secondary it's going to get up if Primary fails. 
        The database was created by using StatefulSets that, according to [Kubernetes Docs](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/), help to create pods from the same specification, "(...)but are not interchangeable: each has a persistent identifier that it maintains across any rescheduling".

  2. Performance:
     Refers to low Response Time, Throughput, etc.

     In this project, **performance** is reflected in:
     While having various instances of the project in different machines, there is not only guarantee the app is going to be available, but also more requests can be processed. This means the app can handle more users and it's going to be answer faster to users petitions.

  3. Security: 
      Under any unsafe environment or conditions application should work, and it should not break by sudden attacks from internal or external source.

      In this project, **security** is reflected in:
      - For application: The application uses https as the protocol and also the comunication between the front end and the data base is through Jason Web Token.
      - For database: writing to database is only possible by accessing with user and password. Besides, database is no exposed through internet. Instead, it can be accessed only from inside the cluster to communicate with the pods that need it. 

## Architecture

In the first project, the application was just a docker container with a local database.

<p align="center">
  <img width="300" height="400" src="https://github.com/mnl359/proyecto4/blob/master/images/project1.png">
</p>

For this project, we redisign the application in different ways:
* We use Google Cloud with Google Kubernetes Engine (GKE) that allow us to deploy and manage with more efficiency the different services and application for this project.
* The frontend and the backend are separate with the objective that the application is stateless so it allow us to have different intances of the application.
* We made a load balancer, this increase the availability and the performance of the application.
* The database has two instaces of it (primary and secondary), the secondary is a replica of the primary and they are manage by "referee" that if the primary goes down it will set the secondary as a primary until the primary could be up again.

<p align="center">
  <img width="300" height="460" src="https://github.com/mnl359/proyecto4/blob/master/images/project4.png">
</p>

### Technologies
* **FrontEnd:** 
   - Nodejs 
   - Vue
* **BackEnd:**
   - Ruby on Rails
* **Cloud:**
   - Google Cloud with Google Kubernetes Engine (GKE)
* **Database:**
   - MongoDB

<p align="center">
  <img width="100" height="100" src="https://www.shareicon.net/data/256x256/2015/09/11/99371_javascript_512x512.png">
  <img width="100" height="100" src="https://cdn-images-1.medium.com/max/672/1*GrnZQhGidCAjnfE7CUyzcA.png">
  <img width="100" height="100" src="https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/ruby-on-rails-128.png">
  <img width="100" height="100" src="https://dashboard.snapcraft.io/site_media/appmedia/2018/04/cloud_icon_256.png">
  <img width="100" height="100" src="https://cdn-images-1.medium.com/max/1600/1*7zB3cmxgYiu1J-KqLC5gPw.png">
  <img width="100" height="100" src="https://nzdotnetpioneer.files.wordpress.com/2015/08/mongodb.png?w=256&h=256&crop=1">
</p>
