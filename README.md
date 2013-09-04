# iptell.io - hello

ipTelligence is a service for finding out info about a domain.  It is a web service written in node.js.

The first application is to give an IP or hostname and return the hosting providers and favicon for the OpsPanel backends section.

We bootstrapped this very quickly and will make it open to add hostnames (through github).  Thanks JD.

## Usage

### v1

The URL: http://api.iptell.io

### Location

```
GET /v1/location?host=hostname
GET /v1/location?ip=8.8.8.8
```

If the request is successful, you should receive something like this:

```json
{
  "location": "some location",
  "favicon": "some url"
}
```

`favicon` is optional and may not be available.

#### IP

```
GET /v1/ip
```

If the request is successful, you should receive something like this:

```json
{
  "ip": "127.0.0.1"
}
```

#### RBL Blacklists

```
GET /v1/blacklisted/{ip}
```

If the request is successful, you should receive something like this:

```json
[
  {
    "name": "SpamCop",
    "dns": "bl.spamcop.net"
  }
]
```

Of course it is more likely that you will simply receive an empty list.

#### User Agent

```
GET /v1/ua/{ua}
```

Remember to escape your user agent before passing it to the query!

In case the request is successful, you should receive something like this:

```json
{ full: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.62 Safari/537.36',
  name: 'chrome',
  version: '29.0.1547.62',
  fullName: 'chrome 29.0.1547.62',
  os: 'OS X 10.8',
  device_type: 'desktop' }
```

If the query fails, you will get a 400.

## Hosting

The service is hosted on Heroku. Refer to their [documentation](https://devcenter.heroku.com/articles/nodejs).

Basically you'll need to perform the following steps:

1. `heroku login`
2. Add a git remote using `git add remote heroku repourl`. You can get that repourl through Heroku's user interface
3. Whenever you wish to deploy, execute `git push heroku master`. This will trigger the init sequence.

The project depends on a couple of environment variables. See `/config/index.js` for exact names. You can set these using `heroku config:set FOO=bar`. In order to enable production mode (more caching etc.), use `heroku config:set NODE_ENV=production`

## Configuration

In case you need to adjust the project configuration (port etc.), you can do this in two ways. You may either copy `config/config.template.js` as `config/config.js` and then tweak that. Alternatively you may set the configuration variables at ENV. You see possible variables when you run the server. It follows a certain configuration based convention. Possible environment variables set override your `config/config.js`.

### Testing

1. `npm start`
2. `npm test`

The tests won't run unless the server is running so remember to that before executing the tests! The tests use Jasmine as a test runner. If you don't have that installed yet, execute `npm install -g jasmine-node`.

## Service AKA:

* iptelligence.io
* iptell.io
* iptel.io

(all registered with: iwantmyname.com)
