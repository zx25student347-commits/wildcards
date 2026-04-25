FROM maven:4.0.0-rc-5-eclipse-temurin-21-alpine AS build
WORKDIR /app
COPY pom.xml mvnw .mvn/ ./
COPY src ./src
RUN mvn -B -DskipTests package

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Install netcat for the wait-for script (Alpine)
RUN apk add --no-cache netcat-openbsd

COPY --from=build /app/target/*.jar app.jar
COPY wait-for.sh /wait-for.sh
RUN chmod +x /wait-for.sh

EXPOSE 8080
ENTRYPOINT ["/wait-for.sh", "db", "3306", "java", "-jar", "/app/app.jar"]
