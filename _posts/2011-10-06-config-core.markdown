---
layout: post
title: OpenXPKI Configuration Details - Core
author: Scott T. Hardin
category: admin
description: The "Core" configuration parameters are for essential components of the OpenXPKI system like database connections, logging, etc.
---

# Overview #

The Core section of the configuration contains parameters that are essential to
the OpenXPKI system like database connections, logging, etc.

This document applies to OpenXPKI Version 1.0.

> *Note: Starting with commit 83a39b33 from 8/23/2011, the new configuration
> subsystem is available, but the initial deployment is still done via the
> old XML configuration files.*

The YAML configuration files used during configuration import are located in 
/etc/openxpki/config.d/core/.

## database.yaml ##

The connection to the database for storing application content is defined
in this section. Each supported database has its own requirements on the
parameters needed to locate and access the database instance. The table
“Generic Attributes” describes those attributes common to all vendors.

### Generic Attributes ###

| Attribute | Description                                   |
|:---------:|:----------------------------------------------|
| server\_id | Unique numeric identifier for this server (usually ‘0’) |
| server\_shift | Number of bits to shift to allow for additional server\_ids (usually 8) |
| type      | Server type (e.g.: “MySQL”, “Oracle”) (mandatory, see vendor-specific details below for additional attributes |
| env      | Named-parameter list of environment variables (optional, see vendor-specific details below for list of suggested values |

*Note: in the old XML config, there was also a "vendor" attribute, which
was used to access additional vendor options. Since the only option that
seemed to be used was for environment variables, this is probably deprecated.*

### MySQL ###

| Attribute | Description                                       |
|:---------:|:--------------------------------------------------|
| name      | Name of database                                  |
| host      | Host name or IP address for destination server    |
| port      | Port number for listener                          |
| user      | Name of user for authentication                   |
| passwd    | Password of user for authentication               |

*TODO: is the environment/vendor/type/ mysql ... needed?*

### Oracle ###

| Attribute | Description                                       |
|:---------:|:--------------------------------------------------|
| name      | Name of database (TODO: is this needed?)          |
| namespace | Namespace in database (e.g.: “L2OPENXPKI”)        |
| user      | Name of user for authentication (e.g.: “/”)       |
| passwd    | Password of user for authentication               |

For the *env* list, the following are suggested default values:

| Attribute    | Description                                    |
|:------------:|:-----------------------------------------------|
| ORACLE\_HOME | /opt/oracle/OraHome                            |
| ORACLE\_SID  | OPENXPKI01                                     |

### DB2 ###

***Note:*** *This section is incomplete and should be filled in by
someone familiar with DB2*

For the *env* list, the following are suggested default values:

| Attribute   | Description                                         |
|:-----------:|:----------------------------------------------------|
| CLASSPATH   |    /home/db2inst1/sqllib/java/sqlj.zip:/home/db2inst1/sqllib/function:/home/db2inst1/sqllib/java/db2java.zip:/home/db2inst1/sqllib/java/runtime.zip |
| DB2INSTANCE |  db2inst1                                           |
| DB2DIR      |       /usr/IBMdb2/V7.1                              |
| INSTHOME    |     /home/db2inst1                                  |

## l18n.yaml ##

The section *l18n* defines the parameters regarding localization.

| Attribute | Description                                       |
|:---------:|:--------------------------------------------------|
| locale\_directory | Path to locale files                      |
| default\_language | Default L18N language (e.g.: “C”)         |

## server.yaml ##

The section *server* contains parameters regarding the server process, itself. 

| Attribute | Description                                       |
|:---------:|:--------------------------------------------------|
| user      | User to run OpenXPKI daemon                       |
| group     | Group to run OpenXPKI daemon                      |
| socket\_file | Name of socket file (e.g.: /var/openxpki.socket) |
| socket\_owner | Owner of socket file                          |
| pid\_file | Name of file containing OpenXPKI daemon PID       |
| session\_dir | Name of directory for temporary session files  |
| connection\_timeout | Timeout for incoming network connections |
| session\_lifetime | Maximum lifetime for session files        |
| stderr    | File for logging STDERR                           |
| tmpdir    | Directory for temporary files                     |
| transport | (e.g.: Simple)                                    |
| service   | (e.g.: Default, SCEP) *TODO: this should be an array* |

## log.yaml ##

Logging is the key to troubleshooting, auditing and sometimes just trying to figure out how a system works. This document explains how to use and customize logging in OpenXPKI.

Log4Perl is the recommended method for logging messages and has been integrated
into OpenXPKI for convenient use. 
See the Log4Perl documentation for more details on the configuration
file format.

Note: in the past, inline smart comments were used for logging messages and
most of this code still remains, but should not be used for new efforts.

| Attribute | Description                                       |
|:---------:|:--------------------------------------------------|
| config    | Path of log4perl configuration file               |



