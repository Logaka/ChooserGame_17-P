# Chooser - Interactive Random Player Selector

## Introduction
Chooser is an interactive web application designed to randomly select a participant from a group of people. When multiple users place their fingers on the screen, the application chooses one person and can assign tasks of varying difficulty levels.

## Problem Statement
Group decision-making often involves random selection to ensure fairness, but traditional methods like drawing straws or rolling dice are cumbersome. Chooser provides an intuitive, digital solution that works on any touchscreen device, allowing for instant random selection with additional features like task assignment and elimination modes, making group activities more engaging and efficient.

## Objectives
The goal of the project is to create an interactive and entertaining game for groups of people.
Chooser is an application for groups of friends, in which participants perform a variety of tasks, 
randomly selected. Users can also formulate individual requests to generate tasks using artificial intelligence.

- To provide a fair and unbiased way to randomly select individuals from a group
- To enhance group activities with customizable tasks and game modes
- To create an intuitive and accessible interface that works across multiple devices
- To facilitate interactive group experiences through touch-based interaction

## Technology Stack
- Frontend: Vanilla JavaScript, HTML5 Canvas, Bootstrap 5
- Backend Integration: REST API with JSON
- Storage: LocalStorage for user settings
- Deployment: Web-based with Service Worker support
- Additional: Pointer Events API, Web Audio API

## Installation Instructions
1. Clone the repository
```
git clone https://github.com/yourusername/Chooser-Front.git
```

2. Navigate to the project directory
```
cd Chooser-Front
```

3. If using npm for local development:
```
npm install
npm start
```
   
4. Or simply open index.html in a web browser if not using a build process

## Usage Guide
1. Open the application on a touchscreen device
2. Configure settings through the menu button (top-left corner)
   - Select mode: Random or Task
   - Choose task difficulty: Easy, Medium, Hard
   - Set timer duration
   - Toggle background music
3. For custom AI-generated tasks, click the robot icon (top-right) and enter a prompt
4. Have participants place their fingers on the screen (minimum 2 players)
5. The application will randomly select one participant after a short delay
6. In Task mode, the selected participant will receive a task to complete

## Testing
- This application primarily relies on manual testing with multiple users
- To test with fewer participants, you can use multiple pointing devices or simulate touch events
- For proper testing, use devices that support multi-touch functionality

## Known Issues / Limitations
- Limited to the number of simultaneous touch points your device supports
- May work inconsistently on older browsers with limited Pointer Events API support
- Requires a backend server for full task functionality
- Performance may vary on low-end devices when running animations

## References
- [HTML5 Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Pointer Events API](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

## Team Members
- Askar Alisher, 220103194, 17-P
- Bekkalieva Ainara, 220103093, 17-P
- Zhalgas Daniyar, 220103080, 17-P
- Sairambay Nurbol, 220103096, 17-P
- Toibayev Nursultan, 220103044, 17-P
- Sabit Ulan 220103244, 17-P