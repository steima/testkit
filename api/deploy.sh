#!/bin/bash

die() {
	echo >&2 "$@"
	exit 1
}

[ "$#" -eq 1 ] || die "usage: ${0} <stage>"

STAGE="${1}"

[ "${STAGE}" == "dev" ] || [ "${STAGE}" == "test" ] || [ "${STAGE}" == "app" ] || die "Valid stages are dev, test and app"

REGION="eu-west-1"

cd services

cd resources
serverless deploy --stage "${STAGE}" --region "${REGION}" || die "Deployment of resources failed"
cd ..

cd testkit-api
serverless deploy --stage "${STAGE}" --region "${REGION}" || die "Deployment of testkit-api failed"
cd ..
