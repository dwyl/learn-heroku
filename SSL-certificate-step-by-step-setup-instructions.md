![letsencrypt-760x320](https://cloud.githubusercontent.com/assets/194400/23311312/8c4cc85a-faad-11e6-912c-9cc96ec21da6.png)

# Step-by-Step Setup Instructions for Let's Encrypt _Free_ SSL

> _Note: These instructions are only applicable to web apps
with a **custom domain** name_.


## Why?

You have a custom domain for your Heroku app
and now you want an SSL Certificate
to Secure/Encrypt all communications between users and your app.

## What?

Let's Encrypt offers a ***Free*** _Automated_ SSL Certificate Service
brought to you by the **_non-profit_
Internet Security Research Group** (ISRG).
see: https://letsencrypt.org/about/

### Instructions Valid for Apps Written in _Any_ Language/Framework!

The instructions in this tutorial/guide are applicable
to an app written in ***any language or framework***.
You will _temporarily_ deploy a Node.js `http-server` to your Heroku app
which will allow Let's Encrypt to _verify_ that you "_own_" the app/domain.

> _**Note**: No Node.js knowledge is assumed or required. You won't be
writing a single line of JS code._

Once you have set up SSL you can deploy what ever kind of app you like.
(_in our case the app is written in [Elixir/Phoenix!](https://github.com/dwyl/technology-stack/#the-pete-stack) ...
node.js is just an easy way to get this working in a **generic** way._)

## How?

"**certbot**" is the script that _automates_ the certificate creation process.

### Step 1: Clone this Repository to get the Setup Code

```
git clone https://github.com/dwyl/learn-heroku.git
cd learn-heroku
```

### Step 2: Set Git Remote

Check what your _current_ `origin` remote is:
```sh
git remote -v
```
![git-remote](https://cloud.githubusercontent.com/assets/194400/23321003/400c1fa4-fad5-11e6-8e9b-0caf85963dd1.png)

Set it to what ever the git url is for the app you are setting up SSL for. e.g:
```sh
git remote set-url origin git@github.com:healthlocker/healthlocker.git
```

Push your current branch to the GitHub repo:
```sh
git push --set-upstream origin letsencrypt-temporary-server
```

### Step 3: _Temporarily_ Change the Branch Heroku Deploys from

![ssl1](https://cloud.githubusercontent.com/assets/194400/23256626/22f87da4-f9b8-11e6-96d1-72e50ebeffa4.png)

Change it to the name of your branch e.g:

![ssl2](https://cloud.githubusercontent.com/assets/194400/23256625/22f75cee-f9b8-11e6-896f-296e353429be.png)

It should look something like this:

![ssl-deploy-from-diff-branch-disable-ci-check](https://cloud.githubusercontent.com/assets/194400/23256955/7e62225c-f9b9-11e6-9ba0-74e5d2644f8a.png)
remember to (_temporarily_) _dissable_ the checkbox `Wait for CI to
pass before deploy` <br />
(_we have no tests for this temporary server!_).


### Step 4: Install `certbot`

> `certbot` installation instructions for various platforms:
https://letsencrypt.org/getting-started

```sh
brew install certbot
```
![bew-install-certbot](https://cloud.githubusercontent.com/assets/194400/23254553/59f014a0-f9b0-11e6-9667-4e5e9b8014bc.png)

(_it might take a few minutes to install on a slower internet connection...
  be patient..._)

### Step 4: Run `certbot` Command (_Manual Setup_)

Once you've installed `certbot` run the following command:
```sh
sudo certbot certonly --manual
```

Remember to use both the domain a `www` subdomain. (_separated by a space_) e.g:

```
example.com www.example.com
```

Our app was:
```
healthlocker.uk www.healthlocker.uk
```

Follow the steps and **pay _close_ attention**!

When you reach the screen that looks like this:

![certbot-instructions](https://cloud.githubusercontent.com/assets/194400/23255249/c7d2b250-f9b2-11e6-9d45-d2cdb965defa.png)

_**DON'T** `continue` until you have completed **Step 5**_.

Instructions printed by `certbot`:
(_for reference ONLY see below for sub-set of instructions_)
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

You _wont_ be _able_ to run shell commands on a Heroku instance
so we need to use a _temporary_ node.js server to achieve our objective.

In your `current working directory` (_on your localhost_)
run the following command to create the `.well-known/acme-challenge` directory:

#### Step 4.1 Create the `.well-known/acme-challenge` Directory (_if it doesn't exist_)

```
mkdir -p .well-known/acme-challenge
```

#### Step 4.2 Create a File for the Token Verification

Now ***copy-paste*** the `printf` command from the `certbot` instructions:
they should look _something_ like this:

```
printf "%s" WgFpodyij_PDzkU0MZ3CzKCI05hjLOcq2tP-1rs6ko0.kURQ5HbILtRXEwJA2QI4W5TdBkjnZNqH2_RHORvmN6w > .well-known/acme-challenge/WgFpodyij_PDzkU0MZ3CzKCI05hjLOcq2tP-1rs6ko0
```
The tokens will be _specific_ to you so make sure you get the correct tokens.
(_there is one token per domain_)

#### Step 4.3: Commit Your Changes (_the token file_) and Push to GitHub

Make a commit on your local branch so you can push to github
(_and trigger the heroku build_)

```
git add .
git commit -m 'add letsencrypt verification file'
git push
```
That will deploy the file you created in Step 4.2 to Heroku.

### Step 5: Visit the Endpoint in your Browser to _Confirm_ it _Worked_:

Visit your app in a web browser to confirm the deploy worked.
e.g: http://example.com/.well-known/acme-challenge

The url for _our_ app was: http://healthlocker.uk/.well-known/acme-challenge

![click-on-filename-to-test](https://cloud.githubusercontent.com/assets/194400/23293421/eda79e68-fa5d-11e6-95d4-a8c57fe4a8fd.png)

It should _download_ a text file to your computer
when you visit the endpoint in the browser.

### Step 6: Continue with the Certbot process

Hit the enter key in the terminal window to `continue` the `certbot` process:

![certificate-success](https://cloud.githubusercontent.com/assets/194400/23293159/81c0b6d6-fa5c-11e6-96bb-68b5c18f0098.png)

If if it worked, you should see something like that output in your terminal.
If not scroll down to Trouble-Shooting section below

### Step 7: Conclude the process on Heroku

You're _amost_ there, this is the _easy_ part!

#### Step 7.1: `GOTO` Heroku "Settings" Tab and Click "***Configure SSL***"

Navigate to the settings section of _your_ app on Heroku Dashboard e.g:

![navigate-to-the-settings-on-heroku](https://cloud.githubusercontent.com/assets/194400/23293535/880d2b1c-fa5e-11e6-8c56-106336bd899c.png)

Scroll down to the "**Domains and certificates**" section
and click on "***Configure SSL***" button:

![scroll-down-to-domains-and-certificates-section](https://cloud.githubusercontent.com/assets/194400/23293564/bcf94b94-fa5e-11e6-84a1-ad756cf46c62.png)

#### Step 7.2: Click the link to _Paste_ the File Contntes

Click on the link to paste the certificate: <br />
![click-to-paste-the-contens](https://cloud.githubusercontent.com/assets/194400/23293840/6771a142-fa60-11e6-96b4-fded45e79550.png)

#### Step 7.3: Copy the _Pulbic_ Certificate from your Machine

Recall from above that the certificate generated by `certbot`
was saved to `/etc/letsencrypt/live/healthlocker.uk/` (_your domain will be different_)

You can _copy_ the contents of the file (_without "leaking" it_)
by running the following command in your terminal:

```
sudo cat /etc/letsencrypt/live/healthlocker.uk/fullchain.pem | pbcopy
```
> Note: `sudo` is required because the `certbot` runs as admin <br />
for explanation of the `pbcopy` command see: <br /> http://superuser.com/questions/113529/how-can-i-load-a-files-contents-into-the-clipboard

#### Step 7.4: _Paste_ the _Pulbic_ Certificate

Paste the `Public` Key (`cert.pem` _you copied above_)
into the `<textarea>` on Heroku:

![paste-contens-of-cert pem-in-browser](https://cloud.githubusercontent.com/assets/194400/23294131/d30607c6-fa61-11e6-84b5-e713179fd70c.png)

Click on the "***Continue***" button.

#### Step 7.5: _Copy-Paste_ the _Private_ Certificate

Repeat steps 7.2 to 7.4 for the ***Private*** Certificate:

```
sudo cat /etc/letsencrypt/live/healthlocker.uk/privkey.pem | pbcopy
```

![paste-contents-of-private-key](https://cloud.githubusercontent.com/assets/194400/23294361/e43131c8-fa62-11e6-8e92-219c96e085b7.png)

#### Step 7.6 Complete the "Configure SLL" Process

You should have already _previously_ set up the DNS settings
(_`else` step 5 would not have worked!_)

![update-dns-settings](https://cloud.githubusercontent.com/assets/194400/23294389/11acabdc-fa63-11e6-9000-f7bd8aa909bf.png)

Make sure you `delete` the Heroku SSL Addon (_if you had it enabled..._)

![delete-heroku-SSL-addon](https://cloud.githubusercontent.com/assets/194400/23294447/6c831a1e-fa63-11e6-83c8-f7e3ef9ea3c3.png)

#### Step 7.7 Confirm the Certificate was Added

Confirm that the certificate was _successfully_ added to the app on Heroku:

![confirm-certificate-accepted-by-heroku](https://cloud.githubusercontent.com/assets/194400/23294783/1393caaa-fa65-11e6-9239-2dedd21f21a7.png)

#### Step 7.8 Visit your Custom Domain in your Browser over HTTPS

e.g: https://www.healthlocker.uk

![boom-ssl-enabled](https://cloud.githubusercontent.com/assets/194400/23307463/8ffdb602-fa9f-11e6-92c5-806e3393386e.png)


### Step 8: Clean up (Restore the Default Deployment Branch and Build Pack)

Restore the `default` branch for deployment on Heroku:

![heroku-deploy-from-master-branch](https://cloud.githubusercontent.com/assets/194400/23308283/a28df9e6-faa2-11e6-8edd-ceeb82a52cfa.png)


## Certificate Renewal

Following the instructions in `this` guide:
https://certbot.eff.org/docs/using.html#renewing-certificates

### 1. _Temporarily_ Disable Any "Buildpacks"

Visit the `Settings` tab for your App in Heroku. <br />
Scroll down to the `Buildpacks` section. <br />
Make a note of any buildpacks you
In the case of our Elixir/Phoenix app these were:

![image](https://cloud.githubusercontent.com/assets/194400/26498450/00137566-4227-11e7-81d3-179b8c6e7608.png)

We copy-paste these into some sort of notepad (_so that we can **restore** them later_)

+ https://github.com/HashNuke/heroku-buildpack-elixir.git
+ https://github.com/gjaldon/heroku-buildpack-phoenix-static.git

### 2. Repeat Steps 1 - 7 Above to Renew the Certificate.

Here's a quick summary of the steps:

1. Re-run the `certbot` CLI tool.
2. Copy-paste the `printf` command (_step 4.2 above_)
3. `git add . && git commit -m 'adds letsencrypt verification token'`
4. `git push` the `letsencrypt-temporary-server` branch of `learn-heroku`
(_to your project's github repo_)
2. Push the

### 3. Copy the Cert into Clipboard

sudo cat /etc/letsencrypt/keys/0002_key-certbot.pem | pbcopy

sudo cat /etc/letsencrypt/live/healthlocker.uk/fullchain.pem | pbcopy




<br /> <br /><br /> <br />


# Trouble-Shooting (_if it doesn't work!_)

The _first_ time I tried to run the `certbot` command, _nothing_ worked!
E.g: the Build failed on Heroku, the cert process failed (_see below_).
This is a catalog of the Trouble-Shooting we did.

> _As always, if you get stuck,
  [**ask a question**](https://github.com/dwyl/learn-heroku/issues)
  we will try our best to help!_

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

Re-trace your steps and make sure you followed the instructions _exactly_.
Also, timing matters. if you take a break between steps
you will get a "Time Out Error"...
We initially got it wrong,
but after re-running the command it works as expected.


#### If you get a _Certificate Warning_ in Step 7.8

If you visit your domain e.g: https://www.healthlocker.uk
and takes _ages_ to load and then displays a Certificate warning:

![chrome-security-warning-details](https://cloud.githubusercontent.com/assets/194400/23295425/7e08fdf8-fa68-11e6-818d-b8acfb8aca89.png)

If we _inspect_ the details of the warning we see that the browser
is getting an incorrect cert.

![firefox-ssl-warning](https://cloud.githubusercontent.com/assets/194400/23307628/17988c9a-faa0-11e6-8418-8d5828993751.png)

I updated the DNS Settings to:

![healthlocker-dns-settings](https://cloud.githubusercontent.com/assets/194400/23307670/3fccde14-faa0-11e6-9d36-4034598d03cb.png)

And then we got this error:
![heroku-cert-wrong-domain](https://cloud.githubusercontent.com/assets/194400/23307746/8a44b69c-faa0-11e6-9fde-f27fc68118a5.png)

So I re-ran `certbot` command for _both_ domains `healthlocker.uk www.healthlocker.uk`:
![get-certificate-for-multiple-domains](https://cloud.githubusercontent.com/assets/194400/23307789/bb81ddf2-faa0-11e6-9c21-d6db8ab2dfb5.png)

After running `certbot` _another_ time, it worked. :rocket:


## Background Reading

+ An introduction to SSL certificates:
https://woocommerce.com/2015/12/ssl-certificates-for-ecommerce
+ Public Key Certificate: https://en.wikipedia.org/wiki/Public_key_certificate
+ Transport Layer Security: https://en.wikipedia.org/wiki/Transport_Layer_Security
+ Certbot Manual mode: https://certbot.eff.org/docs/using.html#manual
+ Inspiration tutorial (_Ruby-on-Rails focussed_):
https://collectiveidea.com/blog/archives/2016/01/12/lets-encrypt-with-a-rails-app-on-heroku
