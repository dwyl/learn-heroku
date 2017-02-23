# Step-by-Step Setup Instructions for Let's Encrypt

## Why?

You have a custom domain for your Heroku app
and now you want an SSL Certificate
to Secure/Encrypt all communications between users and your app.

## What?

Let's Encrypt offers a ***Free*** Automated SLL Certificate Service

see: https://letsencrypt.org/about/


Following the instructions in this tutorial:
https://collectiveidea.com/blog/archives/2016/01/12/lets-encrypt-with-a-rails-app-on-heroku

Install `certbot`
```sh
brew install certbot
```
![bew-install-certbot](https://cloud.githubusercontent.com/assets/194400/23254553/59f014a0-f9b0-11e6-9667-4e5e9b8014bc.png)

(_might take a few minutes to install on a slower internet connection...
  be patient..._)

```sh
sudo certbot certonly --manual
```

Follow the steps and pay _close_ attention!

When you reach the screen that looks like this:
![certbot-instructions](https://cloud.githubusercontent.com/assets/194400/23255249/c7d2b250-f9b2-11e6-9d45-d2cdb965defa.png)

Instructions: (_for reference ONLY see below for modified instructions_)
```
mkdir -p /tmp/certbot/public_html/.well-known/acme-challenge
cd /tmp/certbot/public_html
printf "%s" WgFpodyij_PDzkU0MZ3CzKCI05hjLOcq2tP-1rs6ko0.kURQ5HbILtRXEwJA2QI4W5TdBkjnZNqH2_RHORvmN6w > .well-known/acme-challenge/WgFpodyij_PDzkU0MZ3CzKCI05hjLOcq2tP-1rs6ko0
# run only once per server:
$(command -v python2 || command -v python2.7 || command -v python2.6) -c \
"import BaseHTTPServer, SimpleHTTPServer; \
s = BaseHTTPServer.HTTPServer(('', 80), SimpleHTTPServer.SimpleHTTPRequestHandler); \
s.serve_forever()"
```

You _wont_ have access to the Server on Heroku so we need to use a _temporary_
node.js server to achieve our objective.

Open [`server.js`](https://github.com/dwyl/learn-heroku/blob/master/server.js)
and:
+ update the route that starts with `/.well-known/acme-challenge/`
+ replace the string after `acme-challenge/` with the string you see
in your terminal our case it's: `WgFpodyij_PDzkU0MZ3CzKCI05hjLOcq2tP-1rs6ko0`
+ replace the token (string) in the reply to match what you see in the terminal.
our token is: `WgFpodyij_PDzkU0MZ3CzKCI05hjLOcq2tP-1rs6ko0.kURQ5HbILtRXEwJA2QI4W5TdBkjnZNqH2_RHORvmN6w`

### Set Git Remote

Check what your _current_ `origin` remote is:
```sh
git remote -v
```
![git-remote](https://cloud.githubusercontent.com/assets/194400/23256452/7318d01e-f9b7-11e6-94cb-d5450d1addea.png)

Set it to what ever the git url is for your application:
```sh
git remote set-url origin git@github.com:healthlocker/healthlocker.git
```

Push your current branch to the GitHub repo:
```sh
git push --set-upstream origin letsencrypt-temporary-server
```

### _Temporarily_ Change the Branch Heroku Deploys from

![ssl1](https://cloud.githubusercontent.com/assets/194400/23256626/22f87da4-f9b8-11e6-96d1-72e50ebeffa4.png)

Change it to the name of your branch e.g:

![ssl2](https://cloud.githubusercontent.com/assets/194400/23256625/22f75cee-f9b8-11e6-896f-296e353429be.png)

It should look something like this:

![ssl-deploy-from-diff-branch](https://cloud.githubusercontent.com/assets/194400/23256660/4f30b1de-f9b8-11e6-9b5b-7bc3fab14700.png)

make a commit on your local branch so you can push to github (_and trigger the heroku build_)

in my case the build failed:

![heroku-activity-log-fail](https://cloud.githubusercontent.com/assets/194400/23256822/026ec3a8-f9b9-11e6-9c4b-c26af4276426.png)


because we are using an Elixir "Build Pack" for the app (_so deploying a node app won't work!_):

![elixir-build-pack](https://cloud.githubusercontent.com/assets/194400/23256717/a1e89c98-f9b8-11e6-8cf4-a85c704a73dd.png)

So I made a note of the buildpack urls:
+ https://github.com/HashNuke/heroku-buildpack-elixir.git
+ https://github.com/gjaldon/heroku-buildpack-phoenix-static.git
And then `delete` them (_temporarily_):

![heroku-no-buildpack](https://cloud.githubusercontent.com/assets/194400/23256791/e5e9700c-f9b8-11e6-9b65-71e8e34a3f00.png)



<!--
### Set Heroku Remote

Ensure that you have a Heroku Remote Set to what ever your app is.
ours is: `https://git.heroku.com/healthlocker.git`

so in your terminal write somethign like:

```sh
git remote add heroku https://git.heroku.com/healthlocker.git
```
Or if you already have a heroku remote for this project, update it:
```sh
git remote -v
git remote set-url heroku https://git.heroku.com/healthlocker.git
```
-->

### Push Branch to Heroku (Temporarily) Run a Node.js Server on Heroku

Check the name of your branch:
![image](https://cloud.githubusercontent.com/assets/194400/23256132/1865065c-f9b6-11e6-99cf-636f9b3365d8.png)
