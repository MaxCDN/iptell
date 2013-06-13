# iptell.io - hello

ipTelligence is a service for finding out info about a domain.  It is a web service written in node.js.

The first application is to give an IP or hostname and return the hosting providers and favicon for the OpsPanel backends section.

We bootstrapped this very quickly and will make it open to add hostnames (through github).  Thanks JD.

## Usage

### v1

The API has uses the following schema:

```
GET /v1/location?host=hostname
GET /v1/location?ip=8.8.8.8
```

If the request is successful, you should receive something like this:

```
{
  "location": "some location",
  "favicon": "some url"
}
```

`favicon` is optional and may not be available.

## Hosting

The service is hosted on Heroku. Refer to their [documentation](https://devcenter.heroku.com/articles/nodejs).

Basically you'll need to perform the following steps:

1. `heroku login`
2. Add a git remote using `git add remote heroku repourl`. You can get that repourl through Heroku's user interface
3. Whenever you wish to deploy, execute `git push heroku master`. This will trigger the init sequence.

The project depends on a couple of environment variables. See `/config/index.js` for exact names. You can set these using `heroku config:set FOO=bar`. In order to enable production mode (more caching etc.), use `heroku config:set NODE\_ENV=production`

## Service AKA:

* iptelligence.io
* iptell.io
* iptel.io

(all registered with: iwantmyname.com)
