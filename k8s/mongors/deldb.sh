#!/bin/sh

kubectl delete pvc mongors-pv-claim-mongod-0
kubectl delete pvc mongors-pv-claim-mongod-1
kubectl delete pvc mongors-pv-claim-mongod-2

ssh root@node1cka "rm -fr /mnt/data/mongors*;  mkdir /mnt/data/mongors{,2,3}"
ssh root@node2cka "rm -fr /mnt/data/mongors*;  mkdir /mnt/data/mongors{,2,3}"
ssh root@node3cka "rm -fr /mnt/data/mongors*;  mkdir /mnt/data/mongors{,2,3}"
