#!/bin/sh

# Comment4

if [ ! -z "$1" ];then 
	STRING=${1}
else 
	echo "What is to base64 decode"
	read STRING
fi


BASE64_STRING=`echo -n "${STRING}" | base64`


rm -f k8s_secret_alb_ssl.yml
cat << EOF > k8s_secret_alb_ssl.yml
---
apiVersion: v1
kind: Secret
metadata:
  name: aws-alb-ssl
type: Opaque
data:
  arn: ${BASE64_STRING}
EOF
