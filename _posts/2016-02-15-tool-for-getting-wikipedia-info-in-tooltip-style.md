---
layout:     post
title:      Tool for Getting Wikipedia Info in Tool-tip Style
summary:    Shows summary of Wikipedia explanation in a little box when click on it.
thumbnail:  wikipedia-w
tags:
 - wikipedia
 - javascript
 - css
 - html
 - tooltip
 - jquery
---

![jQery Wikibox]({{ site.baseurl }}/assets/images/wikibox0.png){:width="50%" align="left"} Most of the time it is nice
to click a link that directs you to information about a term that is placed in a web page
to understand the text you read. But, sometimes I just want to see couple paragraphs
that explains terms without leaving the web page, specially for simple terms.

I thought it would be nice if I add such a feature to my blog and began to search. Then I
found [this page][5] and its [repo][6]. It is close to what I wanted to add my blog but, it was not
exactly what I want. Therefore I've forked it and I changed a little bit of it (according to git about 75% of the code,)
at the end I got what I want and here is a example for <span class="wikibox" rel="jekyll (software)">Jekyll</span>, click on it
and see.

In this post, I will explain source code and show how to use it on your own web pages.

# Source Code & Download

You can see the source code on [github][1] or you can directly download it from [this link][2].

# How It Works?

I used [Wikipedia api][3] to get informations since it is easy to use and there is a [sandbox][4] for testing and 
generating requests.
However, in our case one feature is life saver for us: `extracts`. Wikipedia's API has a feature which is called `extracts`
that returns a summary of the given term. It is very useful if you don't want to summarize the all wiki page.
In addition, it returns page ids, thanks to that it is possible to add a page link for more to read at the end
of information.

The below block shows an example request and response for it.

~~~
https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&exsectionformat=plain&titles=jekyll_%28software%29
~~~

~~~
{
  "batchcomplete":"",
  "query":{
    "normalized":[
      {
        "from":"jekyll_(software)",
        "to":"Jekyll (software)"
      }
    ],
    "pages":{
      "41988942":{
        "pageid":41988942,
        "ns":0,
        "title":"Jekyll (software)",
        "extract":"<p><b>Jekyll</b> is a simple, blog-aware, static site generator for personal, project, or organization sites. Written in Ruby by Tom Preston-Werner, GitHub's co-founder, it is distributed under an open source license.</p>\n<p></p>"
      }
    }
  }
}
~~~

## How to Use page ids?

Getting pages with using page ids is very easy, simply replace the PAGEID with real id on the following line:

~~~
http://en.wikipedia.org/?curid=PAGEID
~~~

## Getting JSON

Let's get json via javascript, `ajax` will make it for us. The important point is that
`dataType` value has to be `jsonp` (aka. *JSON with Padding*{: .wikibox rel="JSONP"}.)
Otherwise cross-domain restrictions will cause problems.

~~~ html
...
x = $.ajax({
    url: 'http://'+settings.wiki_lang+'.wikipedia.org/w/api.php',
    data: {
        action:'query',
        prop:'extracts',
        format:'json',
        exintro:'',
        exsectionformat:'plain',
        titles:title
    },
    dataType:'jsonp',
    success: function(data) {
        // Do something.
    }
});
...
~~~

Okay, we got all thing for getting info from Wikipedia but we need to put them into a box and that box must be opened
when user click on it. Simply adding on-click method for `wikibox` objects and creating a container are enough to do that.
After we add a title and a close button on our wikibox, there is only one thing left styling in other words adding
a css file.

# Usage & Demo

## Usage

You must add `jQery`, `jquery-wikibox.js` and `jquery-wikibox.css` between `<head></head>` tags in your page.
Like that:

~~~ html
<script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js'></script>

<script type='text/javascript' src='jquery-wikibox.js'></script>

<link rel="stylesheet" type="text/css" media="all" href="jquery-wikibox.css" />
~~~

Also it is needed to put a js code to add `wikibox()` function to elements.

~~~ html
<script type="text/javascript">
    $(document).ready(function(){
        $('.wikibox').wikibox(); 
    });
</script>
~~~

## Demo

Here is a little demo and demo code.

Please click on <span class="wikibox" rel="jekyll (software)">Jekyll</span> to see information about it.

~~~ html
<head>
    <!-- jQuery -->
    <script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js'></script>

    <!-- jQuery-Wikibox -->
    <script type='text/javascript' src='jquery-wikibox.js'></script>
    <link rel="stylesheet" type="text/css" media="all" href="jquery-wikibox.css" />
    <script type="text/javascript">
      $(document).ready(function(){
        $('.wikibox').wikibox(); 
      });
    </script>
</head>
<body>
    <p>
        Please click on <span class="wikibox" rel="jekyll (software)">Jekyll</span> to see information about it.<br>
    </p>
</body>
~~~

[1]: https://github.com/onurozuduru/jquery-wikibox
[2]: https://github.com/onurozuduru/jquery-wikibox/archive/master.zip
[3]: https://www.mediawiki.org/wiki/API:Main_page
[4]: https://www.mediawiki.org/wiki/Special:ApiSandbox
[5]: http://finndorby.com/184/wikipedia-tooltip-for-jquery/
[6]: https://github.com/fido-hh/jquery-wikipedia-tooltip
