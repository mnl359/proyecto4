### Deploying MongoDB on Google Kubernetes Engine

All credits to [Paul Done's Github](https://github.com/pkdone/gke-mongodb-demo)

Assuming you already have a Google account and you already have registered in Google Cloud and have a project:

Go to your terminal, if you rather it that GCloud Shell, and type:
```
$ sudo apt install kubectl
$ gcloud init
$ gcloud auth application-default login
$ gcloud config set compute/zone europe-west1-b 
```

Note: you can set the zone you want your pods to be in. Just check ```$ gcloud compute zones list```

First of all, you must have a cluster. 
To create one, if you dont have one yet, you can type 
```
$ gcloud container clusters create "mongodb-cluster"
```
And to make sure your connected to your cluster, you can type:
```
$ gcloud container clusters get-credentials <yourclustername> --zone <thezoneofyourcluster> --project <yourprojectname>
```

When you're sure your cluster is OK and you are connected to it, you can create a StorageClass. 
```
$ kubectl apply -f storageclass.yaml
```
This tells GCloud the way you want to save your data is in SSD (Solid-State Drive). The name of your StorageClass is ```mongodb-vm```. You can change it and give to it whatever name you want and give some other specifications. 

The next step is to create a secret key to force MongoDB authentication for external and internal communication. 

```
$ TMPFILE=$(mktemp)
$ /usr/bin/openssl rand -base64 741 > $TMPFILE
$ kubectl create secret generic shared-data --from-file=internal-auth-mongodb-keyfile=$TMPFILE
$ rm $TMPFILE
```

Finally, the last step is to create Service and StatefulSet so you can deploy the pods with the replicas. 

Service is used to tell Kubernetes your exposing a service for the pods. Later, you'll notice the Service endpoints are related to all the replicas IPs. The service for mongo is "Headless" because IP is set to <None>. This is useful to give the pods their own DNS to access thorough them. This way, your application can connect to each pod individually. 

On the other hand, the StatefulSet helps you out to create pods with exactly the same specification but gives to each their own PersistentVolumen and also configures a different PersistentVolumeClaim for each. For more info, click [here](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/).

```
$ kubectl apply -f statefulset.yaml
```

With this file, your specifying your replicas must authenticate before granting access. It also contains the key you generate before and exposes it to your replicas. 

After a while, if you run ```$ kubectl get all``` you'll notice your pods are ```Running```. 

If you want to make sure your service has your pods IP adresses, you can check it by running 
```
$ kubectl get po -o wide
```
You'll see your pods IPs and you can compare it with your service endpoints.
```
$ kubectl describe svc mongo-service | grep Endpoints
```

Now, you have to configure your replica set. 
Now, here it differs a little bit from other tutorials. You'll configure one primary node, one secondary node and an arbiter that reschedules the secondary node if something happens to the primary one.

```
$ kubectl exec mongod-0 -c mongod-container -- mongo --eval 'rs.initiate({_id: "MainRepSet", version: 1, members: [ {_id: 0, host: "mongod-0.mongodb-service.default.svc.cluster.local:27017"}, {_id: 1, host: "mongod-1.mongodb-service.default.svc.cluster.local:27017"} ]});'

$ kubectl exec mongod-0 -c mongod-container -- mongo --eval 'while (rs.status().hasOwnProperty("myState") && rs.status().myState != 1) { print("."); sleep(1000); };'

$ kubectl exec mongod-0 -c mongod-container -- mongo --eval 'db.getSiblingDB("admin").createUser({user:"main_admin",pwd:"abc123",roles:[{role:"root",db:"admin"}]});'
```

Now you have two nodes, one primary (```mongod-0```) and one secondary (```mongod-1```).

Next step is to get into primary pod shell.

```
$ kubectl exec -it mongod-0 -c mongod-container bash
$ mongo
> db.getSiblingDB('admin').auth("main_admin", "abc123");
```
And you have to add the arbiter node.
```
> rs.addArb("mongod-2.mongo-service.default.svc.cluster.local:27017");
> rs.config()
> rs.status().members
```
You should see something like this. (In our case, we made ```mongod-1``` the arbiter node).
<p align="center">
  <img width="300" height="400" src="https://github.com/mnl359/proyecto4/blob/master/images/rsMembers.png">
</p>

You already have the whole configuration. 

Some fast testing:
```
$ kubectl exec -it mongod-0 -c mongod-container bash
$# mongo
> db.getSiblingDB('admin').auth("main_admin", "abc123");
> use test;
> db.testcoll.insert({a:1});
> db.testcoll.insert({b:2});
> db.testcoll.find();
> exit;
$# exit
$ kubectl exec -it mongod-1 -c mongod-container bash
$# mongo
> db.getSiblingDB('admin').auth("main_admin", "abc123");
> use test;
> db.setSlaveOk(1);  // THIS IS A REALLY IMPORTANT STEP.
> db.testcoll.find();
```

If you do the same in Arbiter node, you'll get an error, because it has no persitence. It's there only to improve order among replicas. For more info, refer to [Replica Set Arbiter](https://docs.mongodb.com/manual/core/replica-set-arbiter/).

With all this done, your pods have stable DNS. The template it follows is:
```
mongod-0.mongo-service
mongod-1.mongo-service
mongod-2.mongo-service
```

With this clear, the URI String you'd get is something like 
```
mongodb://mongod-0.mongo-service,mongod-1.mongo-service:27017/?replSet=MainRepSet
```

You can check connection between nodes by running:
```
$ kubectl exec -it mongod-0 -c mongod-container bash
$# mongo mongodb://mongod-1.mongo-service:27017/?replSet=MainRepSet
```
After this, the prompt you should get is something like 
```
MongoDB shell version v4.0.10
connecting to: mongodb://mongod-1.mongo-service:27017/?gssapiServiceName=mongodb&replSet=MainRepSet
Implicit session: session { "id" : UUID("e8cf8296-02f5-43d0-89d5-91d4aa5227a0") }
MongoDB server version: 4.0.10
MainRepSet:SECONDARY>
```

This proves you can access to Secondary node from Primary one and viceversa. The same way, you can access any of them from Arbiter. 

For more info about URI String, refer to [Connection String URI Format](https://docs.mongodb.com/manual/reference/connection-string/)

With this URI you can connect your application. 