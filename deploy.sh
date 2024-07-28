#!/usr/bin/env sh

set -e

npm run build

cd dist


git init
git add -A
git commit -m 'deploy'

# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

git push -f git@github.com:https://vadymkuntso1.github.io/test_repo.git master:gh-pages

cd -