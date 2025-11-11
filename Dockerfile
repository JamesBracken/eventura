FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY springboot-mysql-eventura /app
RUN chmod +x ./mvnw && ./mvnw clean package -DskipTests
CMD java -Dserver.port=$PORT -jar target/*.jar