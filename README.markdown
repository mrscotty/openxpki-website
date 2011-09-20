Currently, this is just a suggestion for replacing the current
website at www.openxpki.org. 

To see the current design, either visit

    http://mrscotty.github.com/openxpki-website/website-design-ideas/ 

or you can fork the repository on github at

    https://github.com/mrscotty/openxpki-website

You'll need Jekyll (https://github.com/mojombo/jekyll) to parse the files.
To start Jekyll with the built-in server, run:

    jekyll --server --auto

This will start an http server that you can reach at [http://localhost:4000](http://localhost:4000) and will be updated automatically as you edit pages.

***NOTE:*** *The current proof-of-concept design is a blatant copy from http://help.github.com,
so we need to either provide them with due credit (they release their site with 
an open source license) or we need to come up with a good design of our own.*

To add a new article, just create a file in the \_posts/ directory. In the
YAML metadata, you can assign one or more of the following categories:

**frontpage**

Cause the article to show up on the main index page in
the "Welcome to OpenXPKI" list box.

**admin, developer, advanced, troubleshooting, third\_party, resources**

These categories show up in the sidebar as navigation items. The list is defined
in \_layouts/default.html.
