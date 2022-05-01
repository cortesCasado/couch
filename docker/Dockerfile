FROM couchdb:latest

# Install Clouseau for CouchDB (Indexing and searching plugin)

# Install dependencies (Java 8, unzip, wget)
COPY ./clouseau/jre8.deb /tmp/jre8.deb
RUN apt update && apt install -y wget unzip && apt install -y /tmp/jre8.deb 

# Download clouseau and unzip it
RUN wget https://github.com/cloudant-labs/clouseau/releases/download/2.21.0/clouseau-2.21.0-dist.zip -P /tmp
RUN unzip /tmp/clouseau-2.21.0-dist.zip -d /opt
COPY ./clouseau/slf4j-simple-1.7.32.jar /opt/clouseau-2.21.0/slf4j-simple-1.7.32.jar

# Copy configuration files and service file

COPY ./clouseau/clouseau /opt/clouseau-2.21.0/bin/clouseau
RUN chmod +x /opt/clouseau-2.21.0/bin/clouseau
COPY ./clouseau/clouseau.ini /opt/clouseau-2.21.0/clouseau.ini
COPY ./clouseau/log4j.properties /opt/clouseau-2.21.0/log4j.properties
COPY ./clouseau/clouseau.service /lib/systemd/system/clouseau.service
RUN export CLASSPATH=/opt/clouseau-2.21.0/*

RUN apt install -y systemctl
# RUN systemctl daemon-reload
# RUN systemctl enable clouseau.service
# RUN systemctl start clouseau.service

# CMD [ "systemctl", "start", "clouseau.service" ]