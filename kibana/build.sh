#!/bin/bash

cd "$(dirname "${0}")" || exit 1

docker build --tag gcr.io/the-tokenizer-268111/kibana "$PWD"

docker push gcr.io/the-tokenizer-268111/kibana