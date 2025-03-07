#!/bin/bash
num=$(i3-msg -t get_workspaces | jq -r '.[] | select(.focused==true).num')
name=$(i3-input -P "New name (empty for number only): " | grep 'command' | cut -d' ' -f3-)

if [ -z "$name" ]; then
    i3-msg "rename workspace to \"$num\""
else
    i3-msg "rename workspace to \"$num: $name\""
fi
