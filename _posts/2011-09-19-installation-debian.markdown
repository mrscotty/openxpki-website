---
layout: post
title: Installing OpenXPKI - Debian
author: Scott T. Hardin
category: admin
description: For Debian users new to OpenXPKI, using the installation instructions here is a relatively straight-forward method of getting a basic installation up and running. 
---

For users new to OpenXPKI, using the installation instructions here is a
relatively straight-forward method of getting a basic installation up and
running. In addition to the OpenXPKI-specific packages, additional packages
required from CPAN are also supplied to fill the missing link between the
Debian distributions and the Perl modules required by OpenXPKI.

*Note:* the current packages were build on Ubuntu "lucid", but have also
been tested on Debian "squeeze".

> *Note:* During initial testing, the Debian packages are on build0.cynops.de,
> which is a development host and has no SLAs. After testing, the packages
> will move to a more appropriate location.

#Optional: Installing a Pristine OS in VMware#

For testing, it is handy to use a virtual guest to simplify installation and configuration. For VMWare, follow these simple steps:

1. Download the Debian netinst CD image for i386 from http://cdimage.debian.org/cdimage/squeeze\_di\_beta2/i386/iso-cd/debian-squeeze-di-beta2-i386-netinst.iso
2. Create a VMWare guest with the following attributes
    - 2 GB of disk space (should be sufficient for simple tests)
    - 256MB RAM should be sufficient for very basic usage, but 1024MB is better for testing LDAP and RT
    - Specify the netinst ISO image as the virtual CD drive
    - Specify "en\_US" as the language
3. Boot the guest VM and go through the installation. Most default should be OK. At the package selection, 'Standard' should be enough.
4. Optional: finish customizing (timezone, ssh, sudo, vmware-tools, etc.) and take a snapshot

#Installing OpenXPKI#

*Note: The following steps require root access*

1. Create the OpenXPKI group and user

        addgroup openxpki
        adduser --disabled-password --gecos 'OpenXPKI Admin' \
            --ingroup openxpki openxpki

2. Add the OpenXPKI Debian repository to your APT configuration:

        wget -O /etc/apt/sources.list.d/openxpki.list \
            http://build0.cynops.de/dpkg/openxpki-deb-lucid.list
        aptitude update

3. Confirm your APT configuration (the following command should return multiple OpenXPKI packages):

        aptitude search openxpki

4. Install the OpenXPKI packages (Note: this will automatically install other prerequisites)

        aptitude -y --allow-untrusted install \
            libopenxpki-client-html-mason-perl \
            libopenxpki-client-scep-perl \
            openxpki-i18n \
            openxpki-deployment

#Conclusion#

At this point, you now have a basic OpenXPKI installation for testing or evaluating functionality. If you are new to OpenXPKI, here are some tips on getting started:

##Accessing the Web Interface##

Point your browser to http://YOURHOSTNAME/openxpki/ to sign-on. For test purposes, choose the authentication method "External Dynamic" and press "Send". At the "External Dynamic Role" form, the password specifies the role used for the session. See the following table:

| Login\* |	Password    | Description/Usage                         |
|:-------:|:-----------:|:-----------------------------------------:|
| user    |	User        | Requesting certificates                   |
| ra      | RA Operator | Approving/rejecting certificate requests  |
| ca      | CA Operator | Activating key groups                     |

\* The login name shown here is just an example and may be replaced with any value.

##Enabling the Default Key Group##

This test installation uses OpenSSL for the encryption needed to sign certificates. The private key used by OpenSSL is encrypted using a passphrase that must be manually entered whenever the OpenXPKI daemon is (re-)started. This passphrase is stored in the default key group during runtime and must be available before any certificate operations (i.e.: requests/approvals/rejections) can be performed.

To enable the default key group, login to the OpenXPKI User Interface with the role "CA Operator" (with external dynamic authentication, use the password "CA Operator" as described above). The list of key management groups will show up on the page "My tasks". Click on the action "Login" for the default key group. For the default installation, leave the field "Part of the passphrase" empty and enter the passphrase for the root certificate in the field "Passphrase". This is the CA passphrase you specified during the package installation.

The status of the group will change from "Incomplete" to "Ready".

Remember: this only applies to installations using OpenSSL for the encryption. If you have an HSM for the cryptographic operations, you will need to consult the documentation for enabling the passphrase.

Note: if you enter the wrong passphrase or the group has the status "Incomplete", you will not receive any error messages in the user interface. Any activities requiring encryption (e.g.: approvals, etc.), however, will fail.

