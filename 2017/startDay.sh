#!/bin/bash

if [ $# -eq 0 ]; then
    echo "No arguments supplied. Exiting..."
    exit 1
fi

COOKIE=`< cookie.txt`
if [ -z "$COOKIE" ]; then
    echo "No session value found in cookie.txt. Exiting..."
    exit 2
fi

SIMPLEDAY=$1
if [ $SIMPLEDAY -lt 10 ]; then
    DAY="0$SIMPLEDAY"
else
    DAY=$SIMPLEDAY
fi

if [ -d "$DAY" ]; then
    echo "Day $DAY already created. Exiting..."
    exit 3
fi

cp -r "boilerplate" "$DAY"
mv "$DAY/code.js" "$DAY/$DAY.js"
echo "Copied project boilerplate to $DAY."

echo -n "Requesting input for day $DAY... "
curl --cookie "session=$COOKIE" "https://adventofcode.com/2017/day/$SIMPLEDAY/input" -o "$DAY/input.txt"


if [ -f "$DAY/input.txt" ]; then
    echo "Input file created."
else
    echo "Error requesting input for day $DAY."
    exit 4
fi

exit 0