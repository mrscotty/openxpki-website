---
layout: post
title: Product Requirement Document - Overview
author: Scott T. Hardin
category: developer
description: Product requirements describes what OpenXPKI should do and how it should work. This overview defines terms and layout of the PRDs for individual components.
---

# Overview #

The Product Requirement Document (PRD) defines the problems that OpenXPKI must solve.
It shall be referred to by developers and testers to ensure the quality of the 
software.

# Terms Used #

Must have
: Describes a requirement that must be satisfied in the solution
Should have
: Describes a high-priority item that should be inclued in the solution, if possible
Could have
: Describes a requirement which is considered desirable, but not necessary
Won't have (but Would like)
: Describes a requirement that will not be implemented in a given release, but may be considered for the future

# List of Documents #

PRDs are (or will be) available for the following components:

+ [New Web UI](/prd-web-ui)
+ [Realms](/prd-realms) (dynamically configurable)
+ [Service Layer Handler for muli-realm access](/prd-service-layer-handler)
+ [Configuration](/prd-configuration) (based on Config::Versioned)

# Item Numbering #

To be able to uniquely identify requirement items when writing test cases
and other documents, each item will have a unique designation. The format
is a two-part string, where the prefix is a 2-3 character upper-case acronym
for the PRD sub-document and the suffix is a 4-digit integer that is 
simply incremented for each item.

