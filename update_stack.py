# update the stack of your heroku apps. github.com/dwyl/learn-heroku/issues/43
import os

os.system("echo Fetching List of Apps from Heroku")
os.system('heroku apps:table --filter="STACK=cedar-14" >> apps.txt')
file = open('apps.txt', 'r')
Lines = file.readlines()

# Strips the newline character
for line in Lines:
    parts = line.split(" ")
    app = parts[0].strip()
    print("updating: " + app)
    os.system("heroku stack:set heroku-18 -a " + app)

import sys
sys.exit()
