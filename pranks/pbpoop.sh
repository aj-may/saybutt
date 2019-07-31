# name: Pasteboard Pooper
# author: A.J. May (https://github.com/aj-may/)
# description: Copies 'poop' into the clipboard every 5 seconds

(while true; do echo "poop" | pbcopy; sleep 5; done) &
