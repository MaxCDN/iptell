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
