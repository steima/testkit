#!/bin/bash

case "${CODEBUILD_WEBHOOK_HEAD_REF}" in
  refs/heads/master)
    aws s3 sync --acl public-read --region eu-west-1 ./app/output s3://testkit-dev/
    aws cloudfront create-invalidation --distribution-id E290JYE4UNMWOH --paths '/*'
    ;;
  refs/heads/test)
    aws s3 sync --acl public-read --region eu-west-1 ./app/output s3://testkit-test/
    aws cloudfront create-invalidation --distribution-id E21NGS1VA4M8WP --paths '/*'
    ;;
  refs/heads/app)
    aws s3 sync --acl public-read --region eu-west-1 ./app/output s3://testkit-app/
    aws cloudfront create-invalidation --distribution-id EEE2Q4UPHL1BW --paths '/*'
    ;;
  *)
    echo "Cannot execute deploy.sh, the environment variable CODEBUILD_WEBHOOK_HEAD_REF did not contain a configured"
    echo "git ref."
    exit 1
esac
