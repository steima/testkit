#!/bin/bash

die() {
	echo >&2 "$@"
	exit 1
}

[ "$#" -eq 1 ] || die "usage: ${0} <branch>"

BRANCH="${1}"
SOURCE="master"

if [ "${BRANCH}" == "app" ] ; then
  SOURCE="test"
fi

echo "Attempting to merge ${SOURCE} into ${BRANCH}"

echo "Switching to ${BRANCH}"
git checkout "${BRANCH}"
echo "Merging to ${SOURCE}"
git merge "${SOURCE}"
echo "Pushing ${BRANCH}"
git push

echo "Switching back to master"
git checkout master