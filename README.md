# Learn <small>(How to Deploy a Web Application on)</small> Heroku

![heroku logo](https://cdn.worldvectorlogo.com/logos/heroku-1.svg)

## Why?

You know how to _create_ a web application,
but that knowledge is only _useful_
if you how to _show_ the app to people!

### "Top 7" Key Benefits:

+ Basic apps e.g. Demo, Hackathon or "Low Traffic" are ***Free***!!
+ Service quality is _really_ good (_under the hood Heroku uses Amazon Web Services_)
+ Excellent **knowledge base** / documentation for both simple and advanced topics!
+ Easily setup ***continuous deployment*** from a GitHub repository.
+ Vast array of "Addons" you can use with your app in a couple of clicks:
https://elements.heroku.com/addons
+ **Cost-effective** for your ***first 10k users***!

## What?

Easily deploy your node.js web application to Heroku
so you can start testing it with end-users as soon as possible! (5 mins!)


## Who?

_Anyone_ who values their _time_ and wants/needs
a _painless_ way to deploy a web application.


## How?

### Beginner: Basic Heroku Deployment of Node.JS App in 5 Minutes

#### Pre-requisites
+ **Computer** with a ***Web Browser***
+ **Internet Connection**
+ ***GitHub Account*** ... if you don't have one see:
[github.com/dwyl/github-reference#how-to-**sign-up**](https://github.com/dwyl/github-reference#how-to-sign-up)
+ Heroku account ... if you don't have one, sign up now: https://signup.heroku.com

#### No Experience/Knoweldge Required
+ No Node.js or other knowledge required
+ All web-based (_no command line, we can learn that later!_)

#### 1. Fork this repository on GitHub!

In your web browser navigate to: [github.com/dwyl/**learn-heroku**](https://github.com/dwyl/learn-heroku)
<br />
(_if you aren't already on the page_)

Click the "fork" button
![learn-heroku-fork-button](https://cloud.githubusercontent.com/assets/194400/23248016/267e77b2-f995-11e6-9748-0ef7dc69c22a.png)

You should now see something similar to this:
![image](https://cloud.githubusercontent.com/assets/194400/23248074/6e0b7404-f995-11e6-9261-7b8a21f44ab5.png)
<br />(_whith your GitHub username in place of mine_)


#### 2. Log into your Heroku Account and Create a New App

> Note if you don't already have a Heroku account set one up now!

Visit: https://dashboard.heroku.com/new and create your new app. <br />
_example_: <br />
![create-new-app](https://cloud.githubusercontent.com/assets/194400/23212611/6881bd72-f8ff-11e6-8c00-6ddf4c97c3ef.png) <br />
(_you will ned to give your app a different name_)


#### 3. Use Heroku (Web) UI to Deploy the Application

Once you create your app in Heroku you will be shown the "Deploy" screen:

![learn-heroku-deployment](https://cloud.githubusercontent.com/assets/194400/23248304/97afbf26-f996-11e6-9858-a7c5aea594ef.png)

Connect your Heroku app to the GitHub Repository you created (_by forking_)
in step 1 (_above_).

Now **Enable Automatic Deploys** to ensure that any changes made on GitHub
are automatically deploye on Heroku:

![enable-automatic-deploys](https://cloud.githubusercontent.com/assets/194400/23248376/fcb091ac-f996-11e6-8b84-8433d6915d4d.png)

#### 4. Test The Deployment Works by Updating a File in the Forked Repo

Back in GitHub, use the Web user interface (UI) to edit one of the files
in your fork of `learn-heroku`.

My suggestion is update the version number in the `package.json` file:

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
![learn-heroku-result](https://cloud.githubusercontent.com/assets/194400/23249056/5490f418-f99a-11e6-9833-1e3b905d9c80.png)

#### Congratulations! You just set up your first Heroku App Deployment!


<br /><br /><br />

### Intermediate: Detailed Step-by-Step Instructions for _Your_ App

> To be added soon!

### Intermediate: Environment Variables on Heroku

see: [github.com/dwyl/learn-environment-variables#**environment-variables-on-heroku**](https://github.com/dwyl/learn-environment-variables#environment-variables-on-heroku)


### Advanced: Continuous Integration

A Version of your App for Each Pull Request!

> Help wanted!

### Advanced: Docker Containers

> as suggested by @gabrielperales in https://github.com/dwyl/learn-heroku/issues/2

## Background Reading

- https://devcenter.heroku.com/articles/getting-started-with-nodejs
- http://build-podcast.com/heroku

## Frequently Asked/Ansered Questions (FAQ)

### Isn't Heroku "_Expensive_" for CPU/RAM You're Getting?

Heroku costs more per unit of computing resource than the equivalent
_infrastructure_ provider (_e.g: AWS/GoogleCloud/Azure/etc_)
but it's cheap if you factor developer's time as your biggest cost!
Setting up deployment to AWS with all the benefits/features Heroku has
out-of-the-box will take hours. So unless your developer's time is _free_
_or_ you _are_ the developer and want to spend a day on deployment
instead of building features to solve the end-user's problem,
use Heroku and focus on _building_ the product! <br />
See: https://github.com/dwyl/learn-heroku/issues/3
