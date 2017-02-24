# Step-by-Step Setup Instructions for Let's Encrypt

## Why?

You have a custom domain for your Heroku app
and now you want an SSL Certificate
to Secure/Encrypt all communications between users and your app.

## What?

Let's Encrypt offers a ***Free*** Automated SLL Certificate Service

see: https://letsencrypt.org/about/

## How?

### Step 1: Install `certbot`

> `certbot` installation instructions for various platforms:
https://letsencrypt.org/getting-started

```sh
brew install certbot
```
![bew-install-certbot](https://cloud.githubusercontent.com/assets/194400/23254553/59f014a0-f9b0-11e6-9667-4e5e9b8014bc.png)

(_might take a few minutes to install on a slower internet connection...
  be patient..._)

### Step 2: Run `certbot` Command (_Manual Setup_)

Once you've installed `certbot` run the following command:
```sh
sudo certbot certonly --manual
```

Follow the steps and **pay _close_ attention**!

Enter the

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

You _wont_ be _able_ to run shell commands on the Heroku instance
so we need to use a _temporary_ node.js server to achieve our objective.

In your `current working directory` (_on your localhost_)
run the following command to create the `.well-known/acme-challenge` directory:

```
mkdir -p .well-known/acme-challenge
```

Now ***copy-paste*** the `printf` command from the `certbot` instructions:
they should look _something_ like this:

```
printf "%s" WgFpodyij_PDzkU0MZ3CzKCI05hjLOcq2tP-1rs6ko0.kURQ5HbILtRXEwJA2QI4W5TdBkjnZNqH2_RHORvmN6w > .well-known/acme-challenge/WgFpodyij_PDzkU0MZ3CzKCI05hjLOcq2tP-1rs6ko0
```
The tokens will be _specific_ to you so make sure you get the correct tokens.

### Step 3: Set Git Remote

Check what your _current_ `origin` remote is:
```sh
git remote -v
```
![git-remote](https://cloud.githubusercontent.com/assets/194400/23256452/7318d01e-f9b7-11e6-94cb-d5450d1addea.png)

Set it to what ever the git url is for the app you are setting up SSL for. e.g:
```sh
git remote set-url origin git@github.com:healthlocker/healthlocker.git
```

Push your current branch to the GitHub repo:
```sh
git push --set-upstream origin letsencrypt-temporary-server
```

### Step 4: _Temporarily_ Change the Branch Heroku Deploys from

![ssl1](https://cloud.githubusercontent.com/assets/194400/23256626/22f87da4-f9b8-11e6-96d1-72e50ebeffa4.png)

Change it to the name of your branch e.g:

![ssl2](https://cloud.githubusercontent.com/assets/194400/23256625/22f75cee-f9b8-11e6-896f-296e353429be.png)

It should look something like this:

![ssl-deploy-from-diff-branch-disable-ci-check](https://cloud.githubusercontent.com/assets/194400/23256955/7e62225c-f9b9-11e6-9ba0-74e5d2644f8a.png)
remember to (_temporarily_) _dissable_ the checkbox `Wait for CI to
pass before deploy` (_we have no tests for this temporary server!_).

make a commit on your local branch so you can push to github (_and trigger the heroku build_)


### Step 5: Visit the Endpoint in your Browser to confirm it worked:

our is: http://www.healthlocker.uk/.well-known/acme-challenge/WgFpodyij_PDzkU0MZ3CzKCI05hjLOcq2tP-1rs6ko0

![confirm endpoint working](https://cloud.githubusercontent.com/assets/194400/23257100/36807910-f9ba-11e6-942d-d548d2b99ed9.png)

### Step 6:  Continue with the Certbot process


<br /> <br /><br /> <br />


## Trouble-Shooting

The _first_ time I tried this the build ***failed***:

![heroku-activity-log-fail](https://cloud.githubusercontent.com/assets/194400/23256822/026ec3a8-f9b9-11e6-9c4b-c26af4276426.png)


because we are using an Elixir "Build Pack" for the app (_so deploying a node app won't work!_):

![elixir-build-pack](https://cloud.githubusercontent.com/assets/194400/23256717/a1e89c98-f9b8-11e6-8cf4-a85c704a73dd.png)

So I made a note of the buildpack urls:
+ https://github.com/HashNuke/heroku-buildpack-elixir.git
+ https://github.com/gjaldon/heroku-buildpack-phoenix-static.git
And then `delete` them (_temporarily_):

![heroku-no-buildpack](https://cloud.githubusercontent.com/assets/194400/23256791/e5e9700c-f9b8-11e6-9b65-71e8e34a3f00.png)

After I `delete` the build pack and push another commit, it passes:

![build success](https://cloud.githubusercontent.com/assets/194400/23257017/bed113de-f9b9-11e6-87de-85572bff35ef.png)

### Failed to `continue` with `certbot` process ...

When I _attempted_ to `continue` it failed:

![certbot failed](https://cloud.githubusercontent.com/assets/194400/23257173/92a8eb78-f9ba-11e6-9a5e-53ad99a584f3.png)

Output
```
Waiting for verification...
An unexpected error occurred:
ConnectionError: ('Connection aborted.', error("(60, 'ETIMEDOUT')",))
Please see the logfiles in /var/log/letsencrypt for more details.

IMPORTANT NOTES:
 - If you lose your account credentials, you can recover through
   e-mails sent to contact.nelsonic@gmail.com.
 - Your account credentials have been saved in your Certbot
   configuration directory at /etc/letsencrypt. You should make a
   secure backup of this folder now. This configuration directory will
   also contain certificates and private keys obtained by Certbot so
   making regular backups of this folder is ideal.
```

I deleted all the files created in the process and started from scratch ...

Failed again: <br />
![fail again](https://cloud.githubusercontent.com/assets/194400/23263831/4c5070d4-f9d7-11e6-8559-57b2aa714b26.png)

Just keep trying ...

## Background Reading

+ Certbot Manual mode: https://certbot.eff.org/docs/using.html#manual
+ Inspiration tutorial (_Ruby-on-Rails focussed_):
https://collectiveidea.com/blog/archives/2016/01/12/lets-encrypt-with-a-rails-app-on-heroku
