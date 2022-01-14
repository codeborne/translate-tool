#!/bin/sh

cd `dirname $0`

npm ci

cp -r i18n ../build
cd ../build
mv projects.json projects.json.bak 2>/dev/null
npx -y http-server -p 9874 &
SERVER_PID=$!

cd -
TEST_URL='http://localhost:9874' npm test
RESULT=$?
kill $SERVER_PID

cd ../build
mv projects.json.bak projects.json 2>/dev/null
exit $RESULT
