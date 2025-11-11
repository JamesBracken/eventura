FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY springboot-mysql-eventura /app
WORKDIR /app
RUN ./mvnw clean package -DskipTests
CMD ["java", "-Dserver.port=${PORT}", "-jar", "target/*.jar"]web: cd springboot-mysql-eventura && ./mvnw clean install && java -Dserver.port=$PORT -jar target/*.jar
