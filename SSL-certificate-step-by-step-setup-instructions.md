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
