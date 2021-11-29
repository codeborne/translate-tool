#!/bin/bash
set -e

[ "$#" -eq 1 ] || (echo "Env name required" && exit 1)
cd $(dirname "$0")
set -o allexport

[ ! "$GITHUB_SHA" ] && GITHUB_SHA=latest
echo "Redeploying $GITHUB_SHA version"

CLUSTER=paywerk-$1
source $1.env

gcloud container clusters get-credentials $CLUSTER --region $REGION
envsubst < app.yml | kubectl apply -f-
