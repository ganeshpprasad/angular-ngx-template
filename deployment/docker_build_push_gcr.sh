#!/bin/bash

# gcloud should be configured to local docker
# gcloud auth configure-docker

echo "checking sub directories 'src' 'deployment' .."
echo "verify src subdirectory.."
if [ ! -d "./src" ]; then
  echo "src subdirectory not found, exiting .."
  exit
fi

echo "verify deployment subdirectory.."
if [ ! -d "./deployment" ]; then
  echo "deployment subdirectory not found, exiting .."
  exit
fi

echo "building docker image...."
echo "with tag -----------> $1"
docker build -f Dockerfile --tag "$1" .

echo "Tagging docker image..."
docker tag "$1" gcr.io/infinity-dev-proj/"$1"

echo "Pushing image to GCR repo.."
docker push gcr.io/infinity-dev-proj/"$1"

echo "*******listing current docker images on GCR*****"
gcloud container images list

