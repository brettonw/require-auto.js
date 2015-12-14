#! /usr/local/bin/bash

rm -rf node_modules
pushd test
echo first run should install "namespace-include"
./main.js
echo second run should just work
./main.js
popd
