---
layout: post
title: Product Requirement Document - Service Layer Handler for Multi-Realm
author: Scott T. Hardin
category: developer
description: This PRD covers the Service Layer Handler
---

# Overview #

The Service Layer Handler is the controller for incoming client sessions. 
It manages authentication and authorizations. Currently, the default handler
manages the login and session ID and there is a second handler for non-authenticated 
SCEP requests.

This new handler will support the concept of a single session for the user
that gives access to all realms that the user has been granted rights to.

# Requirement Items #

SL0001
: A user must have all roles and realms associated with a single user account

SL0002
: A user could be able to switch between roles and realms without re-authenticating.
[DISCUSS: perhaps re-authenticating would be desirable when switching to a
higher-privileged role]

