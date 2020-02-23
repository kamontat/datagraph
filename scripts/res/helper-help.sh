#!/usr/bin/env bash

help() {
  cat "${__ROOT_DIR}/_README.txt" || exit 2
}
