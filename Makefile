# Makefile for the OpenXPKI Website
#

#
# Build the pages for copying to a remote server
#

remote:
	jekyll --no-server --no-auto

#
# Build pages and then serve them on port 4000, automatically 
# updating if source files change
#
local:
	jekyll --server --auto
