---
layout: post
title: OpenXPKI Configuration - Introduction
author: Scott T. Hardin
category: admin
description: For OpenXPKI v1.0, we have created a new configuration subsystem.  OpenXPKI can be a complex system with infinite configuration possibilities.  This new configuration subsystem helps tackle this task with clear, consise and reliable methods and tools.
---

# Introduction #

Designing a Public Key Infrastructure (PKI) involves adapting software and configuration to meet the needs of an organization. Internal policies may dictate the workflow of certain processes as well as certificate attributes such as duration of validity, while the network infrastructure will dictate the location and layout of directory services (e.g.: LDAP) and the names used in certificates.

OpenXPKI can be installed using a default configuration for test purposes, but the ability to customize almost all aspects of the software is what makes it a unique PKI server. This document illustrates the various configurable components and in many cases, provides examples that have proven useful in a production environment.

The section “The Basics” describes what the parameters are and how they are named. It also explains the configuration directory and file layout.

This document applies to OpenXPKI Version 1.0.

> *Note: Starting with commit 83a39b33 from 8/23/2011, the new configuration
> subsystem is available, but the initial deployment is still done via the
> old XML configuration files.*

# The Basics #

Starting with version OpenXPKI Version 1.0, most of the parameters are configured using YAML files. Separate from this configuration subsystem are the Workflow definitions (in XML) and the Log4Perl configuration. 

## The Parameters ##

The API allows the programmer to access an individual parameter by specifying its unique key. If, for example, the password used to access the database account is needed, the programmer could specify the key “core.database.passwd” and would receive the string “To1eq1BR6jYyALlmhfvYEm3ZUjQmQDE”. The key consists of a series of nodes, separated by a dot (.) to represent a tree hierarchy, similar to the OID used in the ASN.1 standard.

## Configuration Directory Layout ##

The configuration files are read in using the CPAN module Config::Merge. While this module supports various file formats, the examples here will use YAML for clarity. These files are stored in /etc/openxpki/config.d and organized in subdirectories corresponding to the various components of OpenXPKI.

Table: Component Subdirectories

| Directory	| Description of Component                                      |
|:----------|---------------------------------------------------------------|
| acl       | Access control lists defining roles of the OpenXPKI service   |
| auth      | Authentication stacks that control how users are authenticated with the OpenXPKI service |
| core      | OpenXPKI server process attributes (e.g.: runtime uid/gid, socket uid/gid, pid file, environment variables, etc.), i18n directory and default language, path prefixes, data exchange (import/export directories) and database connection attributes |
| issuing\_ca | Issuing CA definitions                                      |
| ldap      | URIs, credentials and options for remote LDAP servers         |
| log\_database	| Database location and authentication credentials for event logging |
| notification | Hooks to external systems (e.g.: RT, e-mail) for sending notifications |
| pki\_realm | ee *pki\_realm* in config.xml and realms in openxpki.conf.in |
| profile   | Profiles for CRL, End entity (user, TLS Server, etc.)         |
| scep      | SCEP server                                                   |
| token     | Hardware and Software Crypto backends                         |

## Configuration File Format ##

When loading the configuration data, the subdirectory names in /etc/openxpki/config.d are used as the first level in the parameter key. The following examples show the contents of a configuration file and the resulting key-value parameters.

Example: Contents of directory and file

    core/
        database.yaml:
            type:   MySQL
            host:   db.example.com
            port:   3306
            user:   openxpki
            passwd: To1eq1BR6jYyALlmhfvYEm3ZUjQmQDE

Example: Resulting parameter data

    “core.database.type” 		=> “MySQL”
    “core.database.db” 		=> “db.example.com”
    “core.database.port” 		=> “3306”
    “core.database.user” 		=> “openxpki”
    “core.database.passwd”		=> “To1eq1BR6jYyALlmhfvYEm3ZUjQmQDE”

## Additional Configurable Components ##

In addition to the core OpenXPKI configuration, there are other locations for configuring supplemental components. These will be covered in a separate chapter.

| Component | Location                              |
|:---------:|:--------------------------------------|
| Log4perl  | /etc/openxpki/log.conf                |
| workflow  | /etc/openxpki/.../workflow.xml, etc.  |

# The Components of OpenXPKI #

As mentioned in the chapter “The Basics”, the configuration is divided into subdirectories and files, who’s names make up the first two levels of the parameter key names. This chapter describes the contents and layout of these directories.

# Tips and Tricks #

## Viewing Configuration Values ##

To view the configuration parameter values stored internally by OpenXPKI, 
the command "cfgver" from the Config::Versioned module is used.

# Accessing Parameter Values #

The OpenXPKI Configuration API is designed with ease-of-use for the programmer in mind. Thus, a simple named-value scheme is used that uniquely identifies each parameter in a straight-forward manner.

## Examples ##

To isolate the underlying implementation details, an API abstraction layer is utilized, creating a single consistent interface for the programmer to access configuration details. The following examples are based on a subset of the configuration, shown here in YAML format in the file *core/database.yaml*:

    type: 	MySQL
    host:	db.example.com
    port:	3306
    user: 	openxpki
    passwd:	To1eq1BR6jYyALlmhfvYEm3ZUjQmQDE

### Initialization ###

The following line loads the modules needed for the configuration subsystem:

    use OpenXPKI::Config;

The import supports the following named-parameters:

| name      | value                                             |
|:---------:|:--------------------------------------------------|
| filename  | specifies the name of the configuration file to be found in the given path |
| path      | specifies an anonymous array containing the names of the directories to search for configuration files |

With the parameters, the “use” statement looks something like this:

{% highlight perl %}
    use OpenXPKI::Config(
        {
     		filename => '00_instantiate.conf',
      		path => [ qw( 12_config ) ],
        }
    );
{% endhighlight %}

Later in the code, to fetch the current configuration:

    my $cfg = OpenXPKI::Config->new();

The constructor supports the following named-parameters:

| name      | value                                             |
|:---------:|:--------------------------------------------------|
| prefix    | prefix to be used for all subsequent get() requests (see “Access to Multiple Values”) |
| version   | specific configuration version to be used for all subsequent get() requests |

The parameters are passed to the call to new() as an array:

    my $dbcfg = OpenXPKI::Config->new( { prefix => ’core.database’ } );

### Locating a Set of Parameters ###

The parameters are referenced in a tree structure, addressed using a dotted-list similar to Internet domain names, but in reverse order.

For example, the parameters for the database server look like the following:

To access the server host name, the key would be “core.database.host” and the value would be “db.example.com”.

### Listing Available Parameters ###

Using the example database record above, a list of the parameter names can be obtained with the following:

    my @keys = $cfg->listattr( ’core.database’ );

This would return the list:

    ( ’type’, ’host’, ’port’, ’user’, ’passwd’ )

### Fetching a Parameter Value ###

Fetching the value for a given parameter is as follows:

    my $dbhost = $cfg->get( ’core.database.host’ );

### Access to Multiple Values ###

To simplify accessing multiple values for a parameter set, the instance may be cloned at a lower node in the path.

    my $dbcfg = OpenXPKI::Config->new( { prefix => ’core.database’ } );
    my $user = $ldap->get( ’user’ );
    my $pass = $ldap->get( ’passwd’ );

### References ###

When the value of a configuration parameter references another, the value is merely a string containing the absolute path to the other node. No automatic resolving is done.

### Versions ###

When accessing configuration parameters, an optional version number may be specified. This is useful for longer-running workflows that need the parameter values to be static for the life cycle of the task. 

    my $cert_duration =
      	$cfg->get( ’workflow.myjob.cert_duration’, $workflow->{cfg_version} );

# Import/Export Configuration #

The import and export of configuration data is the method for the system administrator to set and check the values for configuration parameters.

*TODO: document and write import/export tools*

