# Deploying an Elixir/Phoenix App to Heroku

![heroku-phoenix-logo](https://user-images.githubusercontent.com/194400/36444274-ecc44e10-1672-11e8-818d-e638e9ff459e.png)


## Why?

You want to deploy your Web Application with Database to Heroku
as _fast_ as possible while still _understanding_ all the steps!


## What?

A _step-by-step_ guide to deploying a (Phoenix) Web App on Heroku.

We _created_ this walkthrough/tutorial while _deploying_ our
"beginner phoenix example":
https://github.com/dwyl/phoenix-chat-example <br />
So we _know_ it works! Try it: https://phxchat.herokuapp.com

> _**Note**: most of this is applicable to **any** App_
(_Node.js, Python, Ruby, etc._) <br />
> Even if you are deploying a totally different Language/Framework,
it's still worth "_skimming_".

## Who?

_Anyone_ who wants a _quick, easy and "**free**"_
way to _deploy_ a demo app!


## _How_?

_First_, let's do the setup on Heroku:

### 1. _Create_ a New App

Once you have logged into your Heroku account
and are viewing your "dashboard": https://dashboard.heroku.com

1.1 Click on the `New` button, then <br />
1.2 Click on `Create new app`:

![heroku-create-app](https://user-images.githubusercontent.com/194400/36428249-575cf816-1647-11e8-9005-0ea5219a039c.png)

### 2. Give Your New App a _Name_

Input your desired name
(_if it's available; otherwise get **creative**!_): <br />
![heroku-new-app-name-defaults](https://user-images.githubusercontent.com/194400/36433381-44f30258-1654-11e8-8af8-a3e262a28573.png) </br >
In this case we are creating an App called `phxchat`.
(_short for `Phoenix Chat`,
  because **obviously** `phoenixchat` is "taken"..._)

Leave the rest of the options to the "default" options
(_unless you have specific needs_).

> _**Note**: don't worry about the "Add to pipeline" option for now,
we will come back to it later_.

Click on the `Create app` button.

You will be directed to the "Deploy" tab for your app: <br />
![heroku-phx-chat-dwploy-tab](https://user-images.githubusercontent.com/194400/36435297-31653eb8-1659-11e8-9ce7-2c47ad38471c.png)

### 3. Create "Deployment Pipeline"

On the "Deploy" tab of your app, scroll down
till you see the "Deployment Method" section:

![heroku-deploy-connect-to-github-connect](https://user-images.githubusercontent.com/194400/36437399-c76b9664-165e-11e8-99a6-4e72756705ae.png)

1. Click on "GitHub"
2. Select the "Owner" of the App you want to deploy
(_usually your own GitHub username_)
3. Type (_or copy-paste_) the name of your App.
4. Click `Search` to find the repo.
5. Click "Connect" button.

You should see: <br />
![heroku-app-connected](https://user-images.githubusercontent.com/194400/36438050-97d7c132-1660-11e8-979b-0846fcacc9bc.png)


### 4. Add the PostgreSQL Database "Add-on"

Given that our Phoenix App uses a Postgres database to store it's data,
let's add it as an "Add-on".

Scroll to the top of the dashboard and click on the "Resources" tab:

![click-on-resources-tab](https://user-images.githubusercontent.com/194400/36438338-83dc0b06-1661-11e8-89a0-3268638a4c34.png)

On the "Resources" page, scroll down till you See "Add-ons"

![heroku-addons-select-postgres](https://user-images.githubusercontent.com/194400/36438438-d6bcd350-1661-11e8-89fe-b0b5889c8f93.png)

1. Type: "post" (_in the add-on search input box_)
2. Select "Heroku Postgres" from the list.

This will open a "Modal" for you to _confirm_: <br />
![heroku-postgres-select-default](https://user-images.githubusercontent.com/194400/36438710-9ae7b2ea-1662-11e8-829b-c1ee854b54d5.png)

Leave the _default_ "Hobby Dev - Free"
and _click_ the "**Provision**" button.

You should now see (_something similar to_) the following: <br />
![heroku-addon-installed](https://user-images.githubusercontent.com/194400/36438893-21945f00-1663-11e8-87a4-62baa1f56e95.png)


### 5. Create a `elixir_buildpack.config` File

In the root directory of the App you are trying to deploy,
create a file called `elixir_buildpack.config`

_Paste_ the following lines into the file:

```yml
# Latest version of Erlang/OTP see: https://git.io/Je5k6
erlang_version=22.2

# Latest Elixir Version see: https://github.com/elixir-lang/elixir/releases
elixir_version=1.9.4

# Always rebuild from scratch on every deploy?
always_rebuild=false

# Set the path the app is run from
runtime_path=/app
```

This file overrides the default options defined 
by adding the buildpack in **Step 9** (_below_).
For more detail on the configuration options 
for your `elixir_buildpack.config` file 
see: 
https://github.com/HashNuke/heroku-buildpack-elixir#configuration


### 6. Create a `Procfile` File

Also in the root directory of your App,
create a file called `Procfile`

_Paste_ this line in the file:

```sh
web: MIX_ENV=prod mix ecto.migrate && mix phx.server
```
That will ensure that your database tables/schema is up-to-date
_before_ trying to launch the app.


### 7. Update Your `prod.exs` File

This section "_borrows liberally_" from:
https://hexdocs.pm/phoenix/heroku.html#making-our-project-ready-for-heroku

#### 7.1 Configure the `Endpoint` Section

The default looks something like this:
```elixir
config :chat, ChatWeb.Endpoint,
  load_from_system_env: true,
  url: [host: "example.com", port: 80],
  cache_static_manifest: "priv/static/cache_manifest.json"
```

Update the following params: `url`, `force_ssl` and `secret_key_base`:
```elixir
config :chat, ChatWeb.Endpoint,
  load_from_system_env: true,
  url: [scheme: "https", host: "phxchat.herokuapp.com", port: 443],
  force_ssl: [rewrite_on: [:x_forwarded_proto]],
  cache_static_manifest: "priv/static/cache_manifest.json",
  secret_key_base: Map.fetch!(System.get_env(), "SECRET_KEY_BASE")
```
Where:
+ The first line remains the same (_dependent on the name of your app_)
+ The `url` should be your heroku app name (_in our case `phxchat`_)


#### 7.2 Create a `Repo` Section

By default `prod.exs` does _not_ have a `Repo` section,
so we need to _create_ one. Here's a "template"

```elixir
# Configure your database
config :hello, Hello.Repo,
  adapter: Ecto.Adapters.Postgres,
  url: System.get_env("DATABASE_URL"),
  pool_size: String.to_integer(System.get_env("POOL_SIZE") || "10"),
  ssl: true
```

The one for our "chat" application is: <br />
```elixir
# Configure your database
config :chat, Chat.Repo,
  adapter: Ecto.Adapters.Postgres,
  url: System.get_env("DATABASE_URL"),
  pool_size: String.to_integer(System.get_env("POOL_SIZE") || "10"),
  ssl: true
```
All that changes is the _first_ line which is the name of your app.


#### 7.3 Comment out Last Line in `prod.exs`

Given that we are storing our "secrets" as Environment Variables on Heroku.
We can _safely_ comment out the line in `prod.exs`:

```elixir
import_config "prod.secret.exs"
```
becomes:

```elixir
# import_config "prod.secret.exs"
```

### 8. Generate the `SECRET_KEY_BASE` String

The `SECRET_KEY_BASE` is the key that your app will use to
digitally sign request tokens. It's vital to keep it a _secret_
to avoid "_compromising_" your app.
Therefore we will store it in an Environment Variable on Heroku.

#### 8.1 Run the `mix phx.gen.secret` Command

On your `localhost` (_terminal_), run the following command:
```sh
mix phx.gen.secret
```
That will output a **64 character** String such as:
```
khaO4IJvSa+AFJHGFzlsgVlOuNNLgrUg9D4PCD943tKqersy3YNtABh/zmqd/v7y
```
_Copy_ that string to your clipboard.
(_we will use it in the next step_)

#### 8.2 Define the `SECRET_KEY_BASE` Environment Variable on Heroku

> _**Note**: if you are `new` to Environment Variables,
we recommend you read our "**complete beginner**" **tutorial**_:
[github.com/dwyl/**learn-environment-variables**](https://github.com/dwyl/learn-environment-variables)

Open the "Settings" Tab of your App's Heroku Dashboard:
![heroku-settings-tab](https://user-images.githubusercontent.com/194400/36446677-fe75289e-1679-11e8-9ec0-d5fe28cca26a.png)

Now _scroll_ down to the "Config Variables"
and click on the "***Reveal Config Vars***" button:

![heroku-reveal-config-variables](https://user-images.githubusercontent.com/194400/36446776-48e847bc-167a-11e8-9118-43c06b65dde8.png)

This will display your _existing_ variable `DATABASE_URL`
and allow the creation of new Environment Variables.

![heroku-add-secret_key_base-config-var](https://user-images.githubusercontent.com/194400/36446972-dfc41e4a-167a-11e8-82cf-509f9fc53632.png)

1. **Set** the "key" for the variable: `SECRET_KEY_BASE`
2. **Paste** the value generated in step 8.1 (_above_)
3. **Click** the "Add" button


### 9. Add the Elixir "Buildpack"

Still in the "Settings" Tab of the Heroku Dashboard for the App,
Scroll down to the "**Buildpacks**" section:

![heroku-add-buildpacks](https://user-images.githubusercontent.com/194400/36447145-63574cc8-167b-11e8-8671-db1b6f208669.png)

Click on the "Add buildpack" button.

> A "Buildpack" tells Heroku _how_ to run your app.
> In the case of an elixir app it defines how to get the dependencies
and what the app expects/requires. <br />
For more detail, see: https://devcenter.heroku.com/articles/buildpacks

When the "Modal" opens:

![heroku-add-elixir-buildpack](https://user-images.githubusercontent.com/194400/36447345-098f6fb2-167c-11e8-8413-61c7b1164fc5.png)

1. Paste the value:
https://github.com/HashNuke/heroku-buildpack-elixir.git
into the field.
2. Click on "Save change" button

You should now see the following:

![heroku-buildpack-added](https://user-images.githubusercontent.com/194400/36447410-41416f78-167c-11e8-86c3-57f7f7c86195.png)

#### 9.1 _Repeat_

In order to compile any "_static assets_" (JS/etc.)
we need to add a _second_ buildpack:
https://github.com/gjaldon/heroku-buildpack-phoenix-static.git

Repeat the process you just went through but this time
add the `heroku-buildpack-phoenix-static` buildpack.

Great! Now onto the _final_ step!

### 10. (_Manually_) Deploy

> _Don't worry_, you only have to do this _once_. <br />
All _subsequent_ deploys are automatic!

Back on the "Deploy" tap of your App's Dashboard,
Scroll down to the "Manual deploy" section:

![heroku-manual-deploy](https://user-images.githubusercontent.com/194400/36447781-5229282a-167d-11e8-956b-aed5acc9c15f.png)

Click on the "**Deploy Branch**" button.

This will _start_ the build process.
Heroku will show you the "build log":

![heroku-build-log](https://user-images.githubusercontent.com/194400/36447871-9b051252-167d-11e8-8c18-c04e6deac7d4.png)

Once the build is complete,
click on the "Open App" button in the top-right of your Heroku dashboard:
![open-app](https://user-images.githubusercontent.com/194400/36480033-bb4bbff4-1702-11e8-8b78-76c97518702a.png)

You should see _your_ app running in the browser!

In _our_ case the app is: https://phxchat.herokuapp.com
![phxchat](https://user-images.githubusercontent.com/194400/36480000-9c6fe768-1702-11e8-86d6-c8703883096c.png)

`done()`

<br /> <br />


### Why _Not_ use the "Official" Deployment Guide?

We are **aware** of (and have read) the
"Deploying on Heroku" guide:
https://hexdocs.pm/phoenix/heroku.html <br />
It's a _good_ guide for people with "intermediate" Heroku skills,
however it's **longer** (more steps) than this tutorial,
uses the Heroku "Toolbelt" (Command Line Interface "CLI"),
which _most_ "beginners" _don't have_ installed
and does not setup a "deployment pipeline" so it's a "manual" job
(_running the deploy command each time_).

With that said, it is a _good_ reference, so if you are stuck,
that is a good place to look for "trouble-shooting".


## References & Background Reading

+ "Official" Heroku Deployment guide: https://hexdocs.pm/phoenix/heroku.html
+ Basic deployment: https://medium.com/@yasserhussain1110/how-to-deploy-phoenix-app-to-heroku-95d4bef32322 also uses Heroku CLI and doesn't setup a deployment pipeline. But good section on `config/prod.exs` changes.
+ Migrating a Phoenix App on Heroku: https://blog.learnphoenix.io/strategies-for-migrating-a-phoenix-app-on-heroku-ed0ea3aee4e5 _confirmed_ that `mix ecto.migrate` works in `Procfile`. (_Thanks @SamCorcos_)
