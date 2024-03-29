#!/bin/bash

# Exit with nonzero exit code if anything fails.
set -e

echo "Pull request: ${TRAVIS_PULL_REQUEST}"
echo "Parameter: ${1}"

if [[ "${TRAVIS_PULL_REQUEST}" == "false" ]]
then
  echo "Not PR"
  if [[ "${1}" == "master" ]] || [[ "${1}" == "develop" ]]
  then
    echo "Correct branch"
    # Define repository relative GitHub address.
    repositoryRelativeGitHubAddress="Werkax/school-ivs"

    # Clone project into 'repository' subdirectory && move to it.
    echo "Prepare for deploy to gh-pages."
    echo $PWD
    echo "Clone ${repositoryRelativeGitHubAddress} repository & checkout latest version of gh-pages branch."
    git clone --recursive "https://github.com/${repositoryRelativeGitHubAddress}.git" repo
    cd repo
    echo $PWD

    # Checkout gh-pages branch & pull it's latest version.
    git checkout gh-pages
    git pull

    # Remove results of previous deploy (for current branch) & recreate directory.
    echo "Remove results of previous deploy (for ${TRAVIS_BRANCH} branch)."
    rm -rf "${TRAVIS_BRANCH}"
    mkdir "${TRAVIS_BRANCH}"

    # Copy builded ember application from 'dist' directory into 'repository/${TRAVIS_BRANCH}'.
    echo "Copy application (for ${TRAVIS_BRANCH} branch)."
    cp -r ../src/* "${TRAVIS_BRANCH}"
    cd "${TRAVIS_BRANCH}"
    ls -l
    cd ..

    # Prevent "empty" commit and build failure.
    if [ -f "geetkip.html" ]
    then
      rm -rf geetkip.html
    else
      touch geetkip.html
    fi

    # Configure git.
    git config user.name "werkax"
    git config user.email "werkax@rambler.ru"

    echo "Commit & push changes."
    git add --all
    git commit -m "Update gh-pages for ${TRAVIS_BRANCH} branch"

    # Redirect any output to /dev/null to hide any sensitive credential data that might otherwise be exposed.
    git push --force --quiet "https://${GH_TOKEN}@github.com/${repositoryRelativeGitHubAddress}.git" > /dev/null 2>&1
  fi
fi

echo "Deploy to gh-pages finished."