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

YEAR=$2
if [ -z "$YEAR" ]; then
    YEAR=2020
fi

if [ -d "$YEAR/$DAY" ]; then
    echo "Day $DAY already created. Exiting..."
    exit 3
fi

cp -r "boilerplate" "$YEAR/$DAY"
echo "Copied project boilerplate to $YEAR/$DAY."

echo -n "Requesting input for day $DAY... "
curl --cookie "session=$COOKIE" "https://adventofcode.com/$YEAR/day/$SIMPLEDAY/input" -o "$YEAR/$DAY/input.txt"


if [ -f "$YEAR/$DAY/input.txt" ]; then
    echo "Input file created."
else
    echo "Error requesting input for day $DAY."
    rm -rf $YEAR/$DAY
    echo "Removed $YEAR/$DAY folder..."
    exit 4
fi

exit 0