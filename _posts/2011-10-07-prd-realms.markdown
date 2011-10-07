---
layout: post
title: Product Requirement Document - Realms
author: Scott T. Hardin
category: developer
description: This PRD covers the PKI Realms
---

# Overview #

A PKI Realm is a logical unit that isolates a collection of Issuing 
Certification Authorities according to their usage and namespace.

For examle, a company may manage realms for their namespace (e.g.: example.com)
to use for servers, user authentication and devices since each use has
different, often conflicting profile requirements.

# Requirement Items #

RLM0001
: Creating a new realm must not require service interruption of service.

RLM0002
: Creating a new realm should be a simple, dynamic operation.
[DISCUSS: perhaps the first proof-of-concept would use Config::Versioned rather
than a database table, but still require no down-time]
