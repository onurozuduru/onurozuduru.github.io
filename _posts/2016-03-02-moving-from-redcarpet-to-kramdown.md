---
layout:     post
title:      Moving from Redcarpet to Kramdown
summary:    My experiences and solutions while changing markdown processor of blog
thumbnail:  github-square
tags:
 - redcarpet
 - kramdown
 - jekyll
 - github
 - gfm
 - sed
 - shell
---

As some of you know, Github updated its Jekyll version to 3.0 for Github-Pages
and they are also updating markdown renderer to kramdown. Github's already started
to send a warning e-mail which simply says that:

> Starting May 1st, 2016, GitHub Pages will only support kramdown.

There is a support page that shows how to update to kramdown, [here][github-update-page],
however it is not talking about problems which might be occurred, because of kramdown has slightly different syntax.

In this post, I will talk about my experiences (aka. problems) that I faced
while I was updating my blog page to kramdown.

# Changing to Kramdown

It is simple changing your markdown renderer from redcarpet to kramdown. It will
be done when you replaced lines that related to redcarpet with kramdown in the config
file (*_config.yml*.) In my case, I removed below lines,

~~~
markdown: redcarpet
redcarpet:
  extensions: ["no_intra_emphasis", "fenced_code_blocks", "autolink", "strikethrough", "superscript"]
~~~

Then I placed the following ones:

~~~
markdown: kramdown
kramdown:
    input: GFM
~~~

This was easy, but everything didn't work fine with that configurations since
my code blocks in older posts looked very bad. So I began to search and learned that
there is a different syntax for kramdown. Large code blocks should be between
*tildes (~~~)*, instead of *back-ticks (\`\`\`)*.

I could manually change every post by removing backstitch and adding tildes, but I thought
one line of sed command would be nicer.

**A Warning Before Continue:** These are my solutions, but it might not work for you or
it might give different results, so be careful.

## Updating Old Posts

If you have a lot of old posts that includes triple back-ticks for code blocks, you can easily
update them with one `sed`{: .wikibox rel="Sed"} command which replaces triple back-ticks (\`\`\`) with triple tildes (~~~).

Below line worked for me, it only does changes in lines that include triple back-ticks (\`\`\`) and does
not touch others (i.e. single back-ticks (\`) which are rendered without problem by kramdown.)

Open a terminal and first go to your posts' directory:

~~~ bash
$ cd _posts/
~~~

Then while you are in *_posts* directory write the following command:

~~~ bash
$ sed -i '/```/  s/`/~/g' *.md
~~~

__Explanation of above line:__

* *-i*: edit files in place.
* *back-ticks before space /\`\`\`/*: work only if there is a line includes these word, \`\`\` in our case.
* *the part after space s/\`/~/g*: replace all back-ticks (\`) with tildes (~).
* *\*.md_*: asterisk (\*) is a regular expression that takes anything and *\*.md* means take all files that ends with *.md* characters.

If you apply the command to specific files write file name instead of \*.md.

### Did Something Go Wrong?

If some or all posts are ruined because of `sed` command don't worry it can be reversible
simply like that:

~~~ bash
$ sed -i '/~~~/  s/~/`/g' *.md
~~~

## A Note for People Who Use Pygments

The above method worked for me, but if you use Pygments it is better to check [this post][1].

[github-update-page]: https://help.github.com/articles/updating-your-markdown-processor-to-kramdown/
[1]: http://idratherbewriting.com/2016/02/21/bug-with-kramdown-and-rouge-with-github-pages/
