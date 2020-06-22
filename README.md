# Learn <small>(How to Deploy a Web Application on)</small> Heroku

![heroku logo](https://cdn.worldvectorlogo.com/logos/heroku-1.svg)

## Why?

You know how to _create_ a web application,
but that knowledge is only _useful_
if you know how to _show_ the app to people!

## What?

Easily deploy your node.js web application to Heroku
so you can start testing it with end-users as soon as possible!

You'll have a _public_ URL for your app in 5 minutes which you can share
with real people and get feedback/validation for your idea!

### "Top 7" Key Benefits:

+ Basic apps are ***Free***!! (_e.g. Demo, Hackathon or "Low Traffic"
Personal "Blog" or Portfolio site_)

+ _***Quick and Easy Deployment***_ from your development machine or GitHub!
A couple of clicks or a single command is all it takes!

+ Excellent **knowledge base** / documentation for
both simple and advanced topics!
(_if you get stuck,
  [**ask a question**](https://github.com/dwyl/learn-heroku/issues)
  we can/will help!_)

+ ***Continuous Deployment*** is easy from a GitHub repository using "Hooks".
(_see step-by-step tutorial below!_)

+ Great Range of "**Addon Services**" you can use with your app
in a couple of clicks (_e.g: PostgreSQL, ElasticSearch, Monitoring etc._) <br />
and most have a "free tier"
so you can get started without spending a penny!
See: https://elements.heroku.com/addons

+ "_Industry Standard_" ***Service Quality*** is _really_ good
(_under the hood Heroku uses Amazon Web Services
  but they do all the "plumbing" so you don't have to waste time on "DevOps"
  until you're ready to scale, at which point just pay for a pro!_)

+ **Cost-effective** for your ***first 10k users***
(_don't waste your time on "DevOps" till you have validated your App Idea
with real people!_)


## Who?

_Anyone_ building for the web who values their _time_ and wants/needs
a _painless_ way to ***deploy, monitor and automatically scale***
an app!


## How?

### Beginner: Basic Heroku Deployment of Node.JS App in 5 Minutes

#### Pre-requisites:
+ **Computer** with a ***Web Browser***
+ **Internet Connection**
+ ***GitHub Account*** ... if you don't have one see:
[github.com/dwyl/github-reference#how-to-**sign-up**](https://github.com/dwyl/github-reference#how-to-sign-up)
+ Heroku account ... if you don't have one, sign up now: https://signup.heroku.com (_it's free! and **no credit card required**!_)

#### No Experience/Knoweldge Required
+ No Node.js or other knowledge required
+ All web-based (_no command line, we can learn that "CLI" later!_)

#### 1. Fork this repository on GitHub!

In your web browser navigate to:
[github.com/dwyl/**learn-heroku**](https://github.com/dwyl/learn-heroku)
(_if you aren't already on the page_)

After you have starred the repository,
click the "fork" button: <br />
![learn-heroku-fork-button](https://cloud.githubusercontent.com/assets/194400/23248016/267e77b2-f995-11e6-9748-0ef7dc69c22a.png)

You should now see something similar to this:
![image](https://cloud.githubusercontent.com/assets/194400/23248074/6e0b7404-f995-11e6-9261-7b8a21f44ab5.png)
<br />(_with your GitHub username in place of mine_)


#### 2. Log into your Heroku Account and Create a New App

> **Note**: if you don't already have a Heroku account set one up now!

Visit: https://dashboard.heroku.com/new and create your new app. <br />
_example_: <br />
![create-new-app](https://cloud.githubusercontent.com/assets/194400/23212611/6881bd72-f8ff-11e6-8c00-6ddf4c97c3ef.png) <br />
(_you will need to give your app a **different name**;
  all heroku apps are **unique**._)


#### 3. Use Heroku (Web) UI to Deploy the Application

Once you create your app in Heroku you will be shown the "***Deploy***" screen:

![learn-heroku-deployment](https://cloud.githubusercontent.com/assets/194400/23248304/97afbf26-f996-11e6-9858-a7c5aea594ef.png)

Connect your Heroku app to the GitHub Repository you created (_by forking_)
in step 1 (_above_).

##### Steps:

+ Click on the "Connect to GitHub" button
+ Search for the repository `learn-heroku` in our case
+ Click on "Connect" button.

Now click "**Enable Automatic Deploys**" to ensure that
any changes made on GitHub are automatically deployed on Heroku:

![enable-automatic-deploys](https://cloud.githubusercontent.com/assets/194400/23248376/fcb091ac-f996-11e6-8b84-8433d6915d4d.png)

#### 4. Test The Deployment Works by Updating a File in the Forked Repo

Back in GitHub, use the Web user interface (UI) to edit one of the files
in your fork of `learn-heroku`.

My suggestion is update (_increment_) the version number
in the `package.json` file:

Click the edit icon: <br />
![edit-package-json-button](https://cloud.githubusercontent.com/assets/194400/23248743/e4e94cd8-f998-11e6-98ba-eb6d78ec634f.png)

In the edit view, increment the version number:
![edit-version-number](https://cloud.githubusercontent.com/assets/194400/23248804/3f63f76c-f999-11e6-92bc-02ea7c2863ad.png)

Now scroll down to the **Commit changes** section of the edit view:

![learn-heroku-commit-changes](https://cloud.githubusercontent.com/assets/194400/23248896/9afcfdee-f999-11e6-96ad-9a53aa0d8e2d.png)

write a descriptive commit message and click the "**Commit changes**" button.

> Note: we typically don't encourage people to `commit` directly to `master`
but given that this is your personal fork you can do it this one time.

You should see something like this:
![learn-heroku-changes-committed](https://cloud.githubusercontent.com/assets/194400/23248968/e9788bd2-f999-11e6-9c14-205c9ad00ee7.png)

That will trigger the Heroku deployment of the Hello World Application!

#### 5. Visit the Heroku App in your Web Browser

> In my case the URL for my app is: https://hello-world-heroku-node.herokuapp.com

You should expect to see: <br />
![learn-heroku-hello-world](https://cloud.githubusercontent.com/assets/194400/23319783/edd7954c-facf-11e6-9059-0862a69e1fd3.png)

### Congratulations! You just _deployed_ your first app on Heroku!


<br /><br /><br />

### Intermediate: Detailed Step-by-Step Instructions a "Real" App

See: [elixir-phoenix-app-deployment.md](https://github.com/dwyl/learn-heroku/blob/master/elixir-phoenix-app-deployment.md)

### Intermediate: Environment Variables on Heroku

See: [github.com/dwyl/learn-environment-variables#**environment-variables-on-heroku**](https://github.com/dwyl/learn-environment-variables#environment-variables-on-heroku)

### Intermediate: Using a Custom Domain Name on Heroku

To use a custom domain name on your heroku app, the first thing to do is to purchase your domain name. There are a number of services you can use for this (we like [iwantmyname.com](https://iwantmyname.com)).

The next step is to add this domain to your heroku app. You can do this using the command line interface, or the settings dashboard on heroku.com.

<img width="500" alt="heroku dashboard - domains and certificates" src="https://user-images.githubusercontent.com/8939909/49329458-08104f00-f577-11e8-989e-2d3ebf9c5d7b.png">

Once you've added your domain, you should see a DNS target:

<img width="400" alt="heroku - dns target" src="https://user-images.githubusercontent.com/8939909/49329486-9684d080-f577-11e8-9c11-ad1fdba34a2d.png">

This is what you need to give to your DNS provider (which is most likely the site you purchased your domain from).

If your domain starts with `www.`, you will need to add the DNS target as a `CNAME` record with a name of `www`

If your domain just consists of the domain name and the top level domain (eg. `github.com` instead of `www.github.com`; This is known as the root domain), you might be able to add it as a `CNAME`, but will most likely need to add it as an `ANAME` or an `ALIAS` record. In this case, either leave the name blank, or use `@`

Some services will not allow you to add the root domain as a `CNAME`, and will not have `ANAME` or `ALIAS` as an option, instead requiring you to give an IP address as the `A` record. This is not possible with heroku, as they use dynamic IP addresses, meaning they will change regularly and your DNS record will no longer be correct.

However, if you still want people to be able to access your site using the root domain, there are still a few things you can do.

Some services (iwantmyname.com included) have a feature where they will automatically configure DNS records for popular web services (tumblr, squarespace, heroku etc.).

Another alternative is to just add the `www` DNS record, and to add a redirect (it may also be known as forwarding) from your root domain to that. This does mean that the `www` will show in the browser address bar, but both addresses will lead to your site.

See the [heroku docs](https://devcenter.heroku.com/articles/custom-domains) or your DNS providers help page for specific instructions.

<!--
### Advanced: Continuous Integration

A Version of your App for Each Pull Request!

> First ensure that you _understand_ what Continuous Integration is...
see: https://github.com/dwyl/learn-travis

### Advanced: Docker Containers

> as suggested by @gabrielperales in
https://github.com/dwyl/learn-heroku/issues/2

-->

## Background Reading

- https://devcenter.heroku.com/articles/getting-started-with-nodejs
- http://build-podcast.com/heroku

## Frequently Asked/Ansered Questions (FAQ)

### Isn't Heroku "_Expensive_" for the CPU/RAM You're Getting?

Heroku costs more per unit of computing resource than the equivalent
_infrastructure_ provider
(_e.g: AWS / DigitalOcean / GoogleCloud / Azure / etc._)
but it's _cheap_ if you factor ***developer's time***
as your **biggest cost/constraint**! <br />
Setting up deployment to AWS with all the benefits/features Heroku has
out-of-the-box will take _hours_. So unless your developer's time is _free_
_or_ you _are_ the developer and want to spend a day on deployment
instead of building features to solve the end-user's problem,
use Heroku and focus on _building_ the product! <br />
See: https://github.com/dwyl/learn-heroku/issues/3
