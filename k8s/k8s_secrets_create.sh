#!/bin/sh

# Comment4

if [ ! -z "$1" ];then 
	STRING=${1}
else 
	echo "What is to base64 decode"
	read STRING
fi


BASE64_STRING=`echo -n "${STRING}" | base64`


rm -f k8s_secret.yml
cat << EOF > k8s_secret.yml
---
apiVersion: v1
kind: Secret
metadata:
  name: secretdata
type: Opaque
data:
  secret: ${BASE64_STRING}

EOF
