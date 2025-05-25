
# Chooser - Interactive Random Player Selector

## Introduction
Chooser is an interactive solution designed for randomly selecting participants in group activities. It provides a digital and fair alternative to traditional methods such as drawing straws or rolling dice. This project offers a responsive web and backend solution for random player selection and task assignments for group activities.

## Problem Statement
Group decision-making often involves random selection to ensure fairness, but traditional methods like drawing straws or rolling dice are cumbersome. Chooser solves this problem by offering a digital, interactive, and fun approach. The solution works on touchscreen devices and integrates additional features like task assignment and elimination modes, which make group activities more engaging and efficient.

## Objectives
- Provide a fair and unbiased mechanism for random selection
- Offer task assignment capabilities with varying difficulty levels
- Enable custom task creation using AI prompts
- Deliver a responsive and reliable API for frontend integration
- Support integration with touch-enabled devices for interactive selection
- Enhance group activities by randomly selecting participants and assigning tasks

## Technology Stack
- **Frontend**: Vanilla JavaScript, HTML5 Canvas, Bootstrap 5
- **Backend**: Java 21, Spring Boot 3.4.5 (for API integration)
- **Database**: PostgreSQL (for persistent storage)
- **Build Tool**: Maven
- **Deployment**: Docker, Docker Compose, AWS EC2
- **API Documentation**: Swagger/OpenAPI
- **Additional**: Pointer Events API, Web Audio API, Cohere API for custom AI tasks
- **Testing**: JUnit, Spring Test (for backend), manual multi-touch testing (for frontend)

## Installation Instructions

### Local Setup (Backend)
```bash
# 1. Clone the repository
git clone https://github.com/Logaka/ChooserGame_17-P/tree/main/Chooser-Back

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

### Docker Setup (Backend)
```bash
# 1. Clone the repository
git clone https://github.com/Logaka/ChooserGame_17-P/tree/main/Chooser-Back

# 2. Navigate to the project directory
cd Chooser-Back

# 3. Set up environment variables
# Create a .env file with the necessary variables

# 4. Start the application using Docker Compose
docker-compose up -d
```

### Local Setup (Frontend)
```bash
# 1. Clone the repository
git clone https://github.com/Logaka/ChooserGame_17-P/tree/main/Chooser-Front
# 2. Navigate into the project directory
cd Chooser-Front

# 3. Install dependencies
npm install -g live-server

# 4. Start the application
live-server --host=0.0.0.0 --port=8000
```

Alternatively, you can simply open `index.html` in a web browser if you're not using a build process.

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

### Frontend Usage
1. Open the application on a touchscreen device.
2. Configure settings:
   - Select mode: Random or Task
   - Choose task difficulty: Easy, Medium, Hard
   - Set timer duration
   - Toggle background music
3. For AI-generated tasks, click the robot icon and enter a prompt.
4. Participants place their fingers on the screen, and the app randomly selects one participant.
5. If in Task mode, the selected participant will receive a task.

## Testing
- Run unit tests using:
  ```bash
  ./mvnw test
  ```

- For integration tests, use:
  ```bash
  ./mvnw verify
  ```

- Frontend testing relies on manual multi-touch testing or simulation of touch events using compatible devices.

## Known Issues / Limitations
- Sessions are lost when the app restarts (for in-memory storage).
- Task caching may cause newly added tasks to not be immediately available.
- Requires backend server integration for task functionality.
- Limited to the number of touch points your device supports (especially on older devices).

## References
- [Spring Boot Documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [Cohere API Documentation](https://docs.cohere.com/)
- [HTML5 Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Pointer Events API](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/getting-started/introduction/)

