#FROM maven:3.3-jdk-8 AS build
#LABEL name=petclinic
#LABEL version=0.0.1

#COPY src /usr/src/app/src
#COPY pom.xml /usr/src/app
#COPY docker-compose.yml /usr/src/app

#FROM openjdk:8
# copy any jar files into the image
#COPY --from=build /usr/src/app/target/*.jar /usr/app/petclinic.jar

#EXPOSE 8080
#ENTRYPOINT ["java", "-jar", "/app/target/*.jar"]


FROM openjdk:8
FROM maven:3.5-jdk-8 as build
# Set the working directory to /app
WORKDIR /app
# Copy all the application code into the image
COPY . /app
RUN mvn -Dmaven.test.skip=true clean package
EXPOSE 8080
CMD java -jar /app/target/*.jar
