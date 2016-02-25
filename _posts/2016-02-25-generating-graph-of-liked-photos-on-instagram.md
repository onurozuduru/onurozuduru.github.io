---
layout:     post
title:      Generating Graph of Liked Photos on Instagram
summary:    A graph of your likes with HTML output.
thumbnail:  file-code-o
tags:
 - graph
 - pattern
 - python
 - html
 - api
 - script
 - lxml
---

![Example Output]({{ site.baseurl }}/assets/images/graphoflikes0.png){:width="40%" align="left"} I really
like graphs and graph theory but in that post I will only show a way to visualize graphs by writing a
python script, so no theoretical side today.

[*Here is a link for full script, if you want to see codes first.*][1]

I used the following libraries:

* [python-instagram][3]
* [pattern][4]
* [lxml][5]

So beginning of my script looks like that

~~~ python
from instagram.client import InstagramAPI
from pattern.graph import Graph
import lxml.html as L
~~~

# Using Your Instagram Account as Data Source

Before you visualize a graph, you need a data source. I used my Instagram account
and it worked for me, also it look nice too. You can register on Instagram's
developer platform, from [here][2], to get your photos and information (id, like
counter, who liked your photo, etc.) about them.

You will get an access token and a client secret after you registered your application.
They are needed for our script also it is needed to install [python client for Instagram][3]
to easily access api. I am not going to explain how to install it, but don't worry
it is very simple and it explained [here][3].

## Getting Likes

![Example Output]({{ site.baseurl }}/assets/images/graphoflikes0.png)

In our concept, there is only small images and likes of that images. So we just need
`user_recent_media(user_id, count)` and `media_likes(id)` functions of the api.
First lets create an api:

~~~ python
api = InstagramAPI(access_token="YOUR ACCESS TOKEN", client_secret="YOUR CLIENT SECRET")
~~~

`user_recent_media(user_id, count)` function returns list of `Media` objects and
we can get list of users who liked that image with `media_likes(id)`. Actually
every `Media` object has a field as `like` however it only keeps last 4 likes not
all of the likes.

{% highlight python linenos %}
def recent_media_likes(userid, count):
    if not userid or not count:
        return []
    media_list, _ = api.user_recent_media(user_id=userid, count=count)
    ret = []
    for media in media_list:
        media_dict = {"url":"", "liked_usernames":[]}
        media_dict["url"] = media.images["thumbnail"].url.split('?')[0]
        media_dict["liked_usernames"] = [u.username for u in api.media_likes(media.id)]
        ret.append(media_dict)
    return ret
{% endhighlight %}

By the way it returns a `dict` like `{"url": URLofIMAGE, "liked_usernames":[ListofUsernames]}`

# Generating a Graph

We got a dataset, now here is the fun part: Graph.

## What is Pattern?

> Pattern is a web mining module for Python. It has tools for:
> 
> * Data Mining: web services (Google, Twitter, Wikipedia), web crawler, HTML DOM parser
> * Natural Language Processing: part-of-speech taggers, n-gram search, sentiment analysis, WordNet
> * Machine Learning: vector space model, clustering, classification (KNN, SVM, Perceptron)
> * Network Analysis: graph centrality and visualization.
> 
> -- [*source*][4]

I used that module to export my graph. It is actually a web mining module but has
lots of tools, *Network Analysis (pattern.graph)* is one of them. For see how to
install Pattern, visit [here][4] and [here][6] for documentations. Even I used
only its graph tool for this script, it is very powerful and easy for 
*data mining*{: .wikibox rel="Data mining"}, *NPL*{: .wikibox rel="Natural language processing"}
and *ML*{: .wikibox rel="Machine learning"}.

## Using Pattern Graphs

In our graph images and user names will be nodes and there will be two types of edges
one is between images and owner of the images, the other one is between images and users who
liked them.

Firstly, we will create a graph, add nodes and edges to it. Secondly, we will export
it as HTML and modify HTML code by JavaScript code to get a nice look.

For the first part lets create a graph,

~~~ python
graph = Graph(distance=distance)
~~~

And lets add nodes and edges,

{% highlight python linenos %}
def create_nodes(username, media_list):
    css = {username: "owner"}
    graph.add_node(username, fill=(0,0,0,1))
    for media in media_list:
        image = media["url"]
        likes = media["liked_usernames"]
        graph.add_node(image)
        graph.add_edge(username, image, weight=0.0, type='shared-it')
        css[image] = css_image
        for liked_by in likes:
            graph.add_node(liked_by)
            graph.add_edge(image, liked_by, weight=0.0, type='is-liked-by')
            css[liked_by] = css_user
    return graph, css
{% endhighlight %}

Pattern's graph has capable to add css classes while generating an output, thanks to it,
images, users and owner can get different class names for css.

For the second part, I will generate a standard output with `graph.export()` function
but to get images and prettify the graph a little bit, I will open .html file and
add below JavaScript code by using `lxml` module's HTML functions.

{% highlight html linenos %}
<script type="text/javascript">
    window.onload = function() {
        nodeList = document.getElementsByClassName("%(image)s");
        for(var i = 0; i < nodeList.length; i++) {
            var url = (nodeList[i].innerText || nodeList[i].textContent);
            nodeList[i].innerHTML = '<img src="'+url+'" width="75px" height="75px" style="position:absolute; left:-37px; top:-37px; z-index:-1;" />';
        }
        userList = document.getElementsByClassName("%(user)s");
        for(var i = 0; i < userList.length; i++) {
            var username = userList[i].innerHTML;
            userList[i].innerHTML = '<img src="https://openclipart.org/image/36px/svg_to_png/145537/Simple-Red-Heart.png" style="position:absolute; left:-18px; top:-18px; z-index:-1;" />' + username;
        }
        images = document.getElementsByTagName('img');
        for(var i = 0; i < images.length; i++) {
            images[i].ondragstart = function() { return false; };
        }
};
</script>
{% endhighlight %}

The below code snippet will [do the thing](http://arvaus.deviantart.com/art/DO-THE-THING-519652657){: target="_blank"}
(Yes, a reference for *The Legend of Korra*{: .wikibox rel="The Legend of Korra"}.)

{% highlight python linenos %}
def create_output(css):
    graph.export(path=output_path, directed=False, width=width, height=height, css=css, k=k, repulsion=repulsion)
    with open(output_path+"/index.html", "r") as f:
        html_data = f.read()
    page = L.fromstring(html_data)
    page.body.insert(page.body.index(page.body.find(".//div[@id='graph']"))+1, L.fragment_fromstring(js))
    with open(output_path+"/index.html", "w") as f:
        f.write(L.tostring(page))
{% endhighlight %}

# Final Result

![Example Graph]({{ site.baseurl }}/assets/images/graphoflikes1.png)

At the end we get a graph like the above one. Of course you can fun with it by adding
new functions for example I sorted user nodes by weight to see who liked the most photos.

[Click here to see codes on github.][1]

*__PS:__ The purpose of this script is showing a graph of your personal account. Please DO NOT share output of this script anywhere, be aware of Instagram's developer and user policies. Remember that it is your own risk and responsibility how to use this script! Instagram API has its own license and user terms, for more information please visit [their repo](https://github.com/Instagram/python-instagram). Please note that, you have to comply with Platform Policy of Instagram while using its API, for more information please visit [here](https://www.instagram.com/about/legal/terms/api/).*{: style="font-size: 80%"}


[1]: https://github.com/onurozuduru/graph-of-likes
[2]: https://www.instagram.com/developer/
[3]: https://github.com/Instagram/python-instagram
[4]: https://github.com/clips/pattern
[5]: https://github.com/lxml/lxml
[6]: http://www.clips.ua.ac.be/pages/pattern
