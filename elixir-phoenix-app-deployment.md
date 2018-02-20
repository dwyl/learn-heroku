# Deploying an Elixir/Phoenix App to Heroku

![heroku-phoenix-logo](https://user-images.githubusercontent.com/194400/36444274-ecc44e10-1672-11e8-818d-e638e9ff459e.png)


## Why?

You want to deploy your Web Application with Database.


## What?

A _step-by-step_ guide to deploying a (Phoenix) Web App on Heroku.

> _**Note**: most of this is applicable to **any** App_
(_Node.js, Python, Ruby, etc._) <br />
> Even if you are deploying a totally different Language/Framework,
it's still worth "_skimming_".

## Who?

_Anyone_ who wants a _quick, easy and "**free**"_
way to _deploy_ a demo app!


## How?

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
erlang_version=20.1
elixir_version=1.5.0
always_rebuild=false
runtime_path=/app
```

### 6. Create a `Procfile` File

Also in the root directory of your App,
create a file called `Procfile`

_Paste_ this line in the file:

```sh
web: MIX_ENV=prod POOL_SIZE=2 mix ecto.migrate && mix.phoneix.server
```

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
