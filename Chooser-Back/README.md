# Chooser - Interactive Random Player Selector

## Introduction
Chooser is a digital solution for random player selection in group activities. This backend service provides a RESTful API for selecting random players and assigning fun tasks of varying difficulty levels. It offers a modern, fair, and engaging alternative to traditional selection methods like drawing straws or rolling dice.

## Problem Statement
Group decision-making often involves random selection to ensure fairness, but traditional methods like drawing straws or rolling dice are cumbersome. Chooser provides an intuitive, digital solution that works on any touchscreen device, allowing for instant random selection with additional features like task assignment and elimination modes, making group activities more engaging and efficient.

## Objectives
- Provide a fair and unbiased random selection mechanism
- Offer task assignment capabilities with varying difficulty levels
- Enable custom task creation through AI prompting
- Deliver a responsive and reliable API for frontend integration
- Support integration with touch-enabled devices for interactive selection

## Technology Stack
- **Backend**: Java 21, Spring Boot 3.4.5
- **Database**: PostgreSQL
- **Build Tool**: Maven
- **Deployment**: Docker, Docker Compose
- **API Documentation**: Swagger/OpenAPI
- **AI Integration**: Cohere API for custom task generation
- **Testing**: JUnit, Spring Test

## Installation Instructions
### Prerequisites
- Java 21 or higher
- Maven 3.6+
- Docker and Docker Compose (optional, for containerized deployment)
- PostgreSQL (if running without Docker)

### Local Setup
```bash
# 1. Clone the repository
git clone https://github.com/yourusername/Chooser-Back.git

# 2. Navigate to the project directory
cd Chooser-Back

# 3. Set up environment variables
# Create a .env file with the following variables:
# POSTGRES_URL=jdbc:postgresql://localhost:5432/chooser
# POSTGRES_USER=postgres
# POSTGRES_PASSWORD=postgres
# token=your_cohere_api_token

# 4. Build the application
./mvnw clean package -DskipTests

# 5. Run the application
./mvnw spring-boot:run
```

### Docker Setup
```bash
# 1. Clone the repository
git clone https://github.com/yourusername/Chooser-Back.git

# 2. Navigate to the project directory
cd Chooser-Back

# 3. Set up environment variables
# Create a .env file with the necessary variables

# 4. Start the application using Docker Compose
docker-compose up -d
```

## Usage Guide
### API Endpoints

#### Start a Game Session
```
POST /api/v1/start
```

**Random Mode Example:**
```json
{
    "playerIds": [1, 2, 3, 4],
    "gameOption": {
        "mode": "RANDOM"
    }
}
```

**Response:**
```json
{
    "sessionId": null,
    "choosenPlayerId": 3,
    "task": null
}
```

**Task Mode Example:**
```json
{
    "playerIds": [1, 2, 3, 4],
    "gameOption": {
        "mode": "TASK",
        "taskLevel": "EASY"
    }
}
```

**Response:**
```json
{
    "sessionId": "some-session-id",
    "choosenPlayerId": 2,
    "task": {
        "text": "Спой куплет детской песни",
        "level": "EASY"
    }
}
```

**Custom AI Task Example:**
```json
{
    "playerIds": [1, 2, 3, 4],
    "gameOption": {
        "mode": "TASK",
        "taskLevel": "MEDIUM",
        "prompt": "что-то связанное с танцами"
    }
}
```

## Testing
To run the tests:
```bash
./mvnw test
```

Integration tests can be run with:
```bash
./mvnw verify
```

## Known Issues / Limitations
- Sessions are stored in memory, so they are lost when the application restarts
- Task caching may cause new tasks added to the database to not be immediately available
- For AI-generated tasks, you need a valid Cohere API token
- Currently, the application only supports PostgreSQL database

## References
- [Spring Boot Documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [Cohere API Documentation](https://docs.cohere.com/)

## Team Members
- Askar Alisher, 220103194, 17-P
- Bekkalieva Ainara, 220103093, 17-P
- Zhalgas Daniyar, 220103080, 17-P
- Sairambay Nurbol, 220103096, 17-P
- Toibayev Nursultan, 220103044, 17-P
- Sabit Ulan, 220103244, 17-P