#!/bin/sh
set -e

if [ "$#" -lt 3 ]; then
  echo "Usage: $0 host port command [args...]"
  exit 1
fi

host="$1"
port="$2"
shift 2

echo "Waiting for $host:$port..."
while ! nc -z "$host" "$port"; do
  sleep 1
done

echo "$host:$port is available — starting command"
exec "$@"
