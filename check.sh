#!/bin/bash

MAVEN_VER="apache-maven-3.0.4"

workingDir="`pwd`"

needRoot()
{
    if [ "`id -u`" != "0" ]; then
        echo "Needs to be run as root."
        exit
    fi
}

needNonRoot()
{
    if [ "`id -u`" == "0" ]; then
        echo "Now run as non-root."
        exit
    fi
}

require()
{
    echo -n "Checking for $1...  "
    if [ "`which $1`" == "" ]; then
        echo "not found."
        echo "Installing $1";
        needRoot
        apt-get install $2
    else
        echo -e "found."
    fi
}

require java default-jdk
require git git
require wget wget
require unzip unzip

needNonRoot

cd $workingDir
if [ ! -e "${MAVEN_VER}" ]; then
    closestMaven="`\
        wget -qO - http://www.apache.org/dyn/closer.cgi/maven/binaries/${MAVEN_VER}-bin.tar.gz \
        | grep ${MAVEN_VER}-bin.tar.gz | head -n 1 | sed 's/.*"\([^"]*\)".*/\1/' \
    `"

    echo "downloading: $closestMaven"
    wget $closestMaven
    tar xf "${MAVEN_VER}-bin.tar.gz"
fi
export PATH="$PATH:$workingDir/${MAVEN_VER}/bin"

downloadAndBuild()
{
    cd $workingDir
    if [ ! -e "$1" ]; then
        git clone $2 $1 || exit 1
        cd $1
        git checkout $3 || exit 1
        cd $4
        mvn clean install
    else
        cd $1
        git pull || exit 1
        git checkout $3 || exit 1
        cd $4
        mvn clean install
    fi
}

downloadAndBuild Datanucleus-Cassandra-Plugin git://github.com/xwiki-contrib/Datanucleus-Cassandra-Plugin.git master .
downloadAndBuild xwiki-platform git://github.com/xwiki/xwiki-platform.git feature-store-attachments-newstore xwiki-platform-core/xwiki-platform-store
downloadAndBuild xwiki-store-datanucleus git://github.com/xwiki-contrib/xwiki-store-datanucleus.git master .
downloadAndBuild xwiki-enterprise git://github.com/cjdelisle/xwiki-enterprise.git wiki-nodes .

mkdir $workingDir/node
mv `find ./ -name 'xwiki-enterprise-jetty-datanucleus-?.?-SNAPSHOT.zip'` $workingDir/node/xwiki-cassandra.zip
cd $workingDir/node
unzip xwiki-cassandra.zip

