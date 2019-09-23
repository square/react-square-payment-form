#!/bin/bash

UPDATE_TYPES=("major\tminor\tpatch")
USAGE="USAGE: sh publishNewVersion.sh [${UPDATE_TYPES}]"
BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)
UPDATE=$1
DRYRUN=false

# if [[ $(git diff --stat) != '' ]]; then
#   echo 'Git is dirty'
#   exit 1
# elif [[ ! "\t${UPDATE_TYPES[@]}\t" =~ "\t${UPDATE}\t"  ]]; then
#   echo $USAGE
#   exit 1
# fi

# if [[ "$BRANCH_NAME" != "master" ]]; then
#   git checkout master
# fi
# git pull

CURRENT_PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

NEW_PACKAGE_VERSION=$(npm version --no-git-tag-version $UPDATE)

echo "Updated package from ${CURRENT_PACKAGE_VERSION} to ${NEW_PACKAGE_VERSION}"

sed -i '' "s/${CURRENT_PACKAGE_VERSION}/${NEW_PACKAGE_VERSION//v/}/g" src/components/SquarePaymentForm.tsx
sed -i '' "s/${CURRENT_PACKAGE_VERSION}/${NEW_PACKAGE_VERSION//v/}/g" demo/package.json

echo "Updating component documentation..."
node generateComponentDocs.sh

git add .
git commit -m "Update ${NEW_PACKAGE_VERSION}" --no-edit

git tag -a ${NEW_PACKAGE_VERSION} -m "${NEW_PACKAGE_VERSION}"

echo "Publishing package..."
if [[ $DRYRUN = true ]]; then
  npm run lint && npm run test && npm run build
else
  git push
  npm publish --registry=https://registry.npmjs.org/
fi

echo "Publishing website..."
cd website
if [[ $DRYRUN = false ]]; then
  CURRENT_BRANCH=master USE_SSH=true npm run publish-gh-pages
fi

echo "Version ${NEW_PACKAGE_VERSION} succesfully updated"
