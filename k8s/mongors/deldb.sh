#!/bin/sh

kubectl delete pvc mongors-pv-claim-mongod-0
kubectl delete pvc mongors-pv-claim-mongod-1
kubectl delete pvc mongors-pv-claim-mongod-2

ssh root@node1cka "rm -fr /mnt/data/mongors/.*; rm -fr /mnt/data/mongors2/.*; rm -fr /mnt/data/mongors3/.*"
ssh root@node2cka "rm -fr /mnt/data/mongors/.*; rm -fr /mnt/data/mongors2/.*; rm -fr /mnt/data/mongors3/.*"
ssh root@node3cka "rm -fr /mnt/data/mongors/.*; rm -fr /mnt/data/mongors2/.*; rm -fr /mnt/data/mongors3/.*"
