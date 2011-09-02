---
layout: default
title: Website Design Ideas
description: There are some ideas on how to redesign the OpenXPKI website that have been floating around.
---

A couple of developments have made us rethink our website design. The move from SVN to Git breaks the current distribtion and there are efforts to work over the design. 

Some of the key requirements for the new website are:

- offline reading and editing (use git as backend)
- no html markup for articles (index doc still has some html, but it is rather static)
- modernize layout
    - current design is reminiscent of university pages served up in the days of Netscape
    - emphasis on clarity and ease of use
- add a blog
- site is mainly for marketing and user information; developers should refer to docs in code repository

This initial proof-of-concept just shows how the layout could look, what types of
articles could be expected and serves as a starting point for the upcoming
discussions regarding design and functionality.

To try it out yourself, just install [Jekyll](https://github.com/mojombo/jekyll/wiki)
on your computer. Then, clone this repo:

    git clone git://github.com/mrscotty/oxi-docs.git oxi-docs
    cd oxi-docs

Then, start Jekyll with the built-in server:

    jekyll --server --auto

This will start an http server that you can reach at [http://localhost:4000](http://localhost:4000) and will be updated automatically as you edit pages.

***NOTE:*** *The current proof-of-concept design is a blatant copy from http://help.github.com,
so we need to either provide them with due credit (they release their site with 
an open source license) or we need to come up with a good design of our own.*



