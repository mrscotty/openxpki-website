---
layout: post
title: Product Requirement Document - Configuration
author: Scott T. Hardin
category: developer
description: This PRD covers the configuration subsystem based on Config::Versioned
---

# Overview #

The Config::Versioned module offers a new way of importing and accessing
configuration parameters for OpenXPKI.

# Requirement Items #

CFG0001
: Workflow actions must be able to access the configuration that was valid when the 
workflow instance was first initialized

CFG0002
: It should be easy to override single configuration parameter values for test purposes
