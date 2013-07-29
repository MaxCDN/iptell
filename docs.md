---
layout: docs_layout
permalink: docs/
---

## Basic API

### v1

The API is located at [http://api.iptell.io](http://api.iptell.io).

#### Location

* GET /v1/location?host=hostname
* GET /v1/location?ip=8.8.8.8

If the request is successful, you should receive something like this:

{% highlight json %}
{
  "location": "some location",
  "favicon": "some url"
}
{% endhighlight %}

`favicon` is optional and may not be available.

#### IP

* GET /v1/ip

If the request is successful, you should receive something like this:

{% highlight json %}
{
  "ip": "127.0.0.1"
}
{% endhighlight %}

#### RBL Blacklists

* GET /v1/blacklisted/{ip}

In case the given ip has been blacklisted by some RBL, you should receive a list such as the one below:

{% highlight json %}
[
  {
    "name": "SpamCop",
    "dns": "bl.spamcop.net"
  }
]
{% endhighlight %}

If the ip has not been blacklisted, you should receive a message instead:

{% highlight json %}
{
  "message": "No blacklist entries were found"
}
{% endhighlight %}

#### SSL

* GET /v1/ssl?host=host

In case the request is successful, you should receive something like this (host=google.com):

{% highlight json %}
{
  "server": "gws",
  "chain": [
    "/C=US/ST=California/L=Mountain View/O=Google Inc/CN=*.google.com",
    "/C=US/O=Google Inc/CN=Google Internet Authority",
    "/C=US/O=Equifax/OU=Equifax Secure Certificate Authority"
  ],
  "certificate": {
    "subject": {
      "countryName": "US",
      "stateOrProvinceName": "California",
      "localityName": "Mountain View",
      "organizationName": "Google Inc",
      "commonName": "*.google.com"
    },
    "issuer": {
      "countryName": "US",
      "organizationName": "Google Inc",
      "commonName": "Google Internet Authority"
    },
    "notBefore": "07/12/2013 09:00:30 GMT",
    "notAfter": "10/31/2013 23:59:59 GMT",
    "altNames": [...],
  },
  "info": {
    "type": "TLSv1/SSLv3",
    "key": "1024 bit",
    "compression": "NONE",
    "expansion": "NONE"
  }
}
{% endhighlight %}

* GET /v1/ssl?name=provider

In case the request is successful, you should receive something like this (name=Equifax%20Secure%20Certificate%20Authority):

{% highlight json %}
{
  "subject": {
    "countryName": "US",
    "organizationName": "Equifax",
    "organizationalUnitName": "Equifax Secure Certificate Authority"
  },
  "issuer": {
    "countryName": "US",
    "organizationName": "Equifax",
    "organizationalUnitName": "Equifax Secure Certificate Authority"
  },
  "notBefore": "08/22/2098 16:41:51 GMT",
  "notAfter": "08/22/2018 16:41:51 GMT",
  "altNames": []
}
{% endhighlight %}
