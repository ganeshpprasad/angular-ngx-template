# gcloud should be configured to local docker
# gcloud auth configure-docker

if [ -z "$1" ]; then
    echo "docker image tag not supplied"
    exit
fi

echo "*******listing current docker images on GCR*****"
gcloud container images list


echo "starting deployment of image $1 to GCP cloud run ..."
#
gcloud run deploy --image "$1" --platform managed \
--set-env-vars "PROXYPASS=https://billing-engine-app-xwatwudzxq-ew.a.run.app/"