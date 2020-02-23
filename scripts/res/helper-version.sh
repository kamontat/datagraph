#!/usr/bin/env bash

version() {
  cat "${__ROOT_DIR}/_VERSION.txt" || exit 2
}
