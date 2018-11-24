#!/bin/sh
# Example taken from https://kubernetes.io/docs/concepts/configuration/secret/

if [ ! -z "$1" ];then 
	USER=${1}
else 
	echo "What user to base64 decode"
	read USER
fi

if [ ! -z "$2" ];then
	PASS=${2}
else
        echo "What passwd to base64 decode"
        read PASS
fi



BASE64_USER=`echo -n "${USER}" | base64`
BASE64_PASS=`echo -n "${PASS}" | base64`


rm -f mongo_user_pass.yml
cat << EOF > mongo_user_pass.yml
---
apiVersion: v1
kind: Secret
metadata:
  name: mongo-user-pass
type: Opaque
data:
  mongo_user: ${BASE64_USER}
  mongo_passwd: ${BASE64_PASS}

EOF
