#!/bin/bash

aws s3 sync --acl public-read --region eu-west-1 ./www/output s3://testkit-www/
aws cloudfront create-invalidation --distribution-id E12DE9MGRZXN76 --paths '/*'

