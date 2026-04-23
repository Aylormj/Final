# React Game Lobby & Rock Paper Scissors

A React application that combines a game lobby for player settings with a Rock Paper Scissors game. This project demonstrates React state management, localStorage integration, and component-based architecture.

## Assignment Overview

You need to implement a two-page application:
1. **Lobby Page**: A settings form where players can configure their name, avatar, difficulty, and theme
2. **Game Page**: A Rock Paper Scissors game that uses the settings from the lobby

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

This will start the development server at `http://localhost:5173`

## Assignment Requirements

### What's Already Implemented
- ✅ Project setup with Vite, React, and testing frameworks
- ✅ Basic component structure (`Lobby.jsx`, `Game.jsx`, `App.jsx`)
- ✅ Game logic functions (`src/logic/game.js`, `src/logic/settings.js`)
- ✅ Avatar assets and configuration
- ✅ Unit tests that should pass by default
- ✅ Playwright end-to-end tests (these are what you need to make pass)

### What You Need to Implement

#### 1. Lobby Component (`src/components/Lobby.jsx`)
The lobby should include:
- **Player Name Input**: Text input with id `#player-name`
- **Avatar Selection**: Radio buttons for each avatar with labels having class `avatar-option`
- **Difficulty Selection**: Dropdown with id `#difficulty` (options: easy, normal, hard)
- **Theme Toggle**: Checkbox with id `#theme-toggle` for dark/light mode
- **Save Settings Button**: Button with id `#save-settings`
- **Start Game Button**: Button with id `#start-game` (initially disabled)
- **Greeting Display**: Element with `data-testid="greeting"` showing player name

#### 2. Game Component (`src/components/Game.jsx`)
The game should include:
- **Greeting Display**: Element with `data-testid="greeting"` showing player name
- **Difficulty Display**: Element with id `#current-difficulty` showing selected difficulty
- **Move Buttons**: Buttons with `data-move` attributes for "rock", "paper", "scissors"
- **Score Display**: Elements with ids `#score-player`, `#score-cpu`, `#score-ties`
- **Game History**: Unordered list with id `#history` containing game results
- **Reset Button**: Button with id `#reset-game`

#### 3. App Component (`src/App.jsx`)
- Implement navigation between lobby and game pages
- Apply theme classes (`theme-light`, `theme-dark`) to the main element
- Handle localStorage integration for settings persistence

### Key Features to Implement

1. **Settings Persistence**: Use the provided `saveSettings()` and `loadSettings()` functions
2. **Form Validation**: Enable "Start Game" button only when settings are saved
3. **Theme Switching**: Apply dark/light theme classes based on user selection
4. **Game Logic**: Use the provided game logic functions for RPS gameplay
5. **Score Tracking**: Track and display player, CPU, and tie scores
6. **Game History**: Display each round's result in a list
7. **Reset Functionality**: Clear scores and history while preserving settings

### Component Architecture Best Practices

**Break Down Your Components!** Don't put everything in one large component. Consider creating smaller, focused components:

> **Note**: The component structure below is just a suggestion! You have flexibility in how you organize your components. The key is to break things down into logical, manageable pieces rather than having everything in one large component.

#### Suggested Component Structure (Optional):
```
src/components/
├── Lobby.jsx                 # Main lobby container
├── Game.jsx                  # Main game container
├── SettingsForm.jsx          # The settings form itself
├── AvatarSelector.jsx        # Avatar selection component
├── GameBoard.jsx             # The RPS game interface
├── Scoreboard.jsx            # Score display component
├── GameHistory.jsx           # History list component
└── MoveButtons.jsx           # Rock/Paper/Scissors buttons
```

#### Prop Passing Examples:
```jsx
// Parent component manages state, passes down props
function LobbyView() {
  const [settings, setSettings] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  return (
    <div>
      <SettingsForm 
        onSave={setSettings}
        isDarkMode={isDarkMode}
        onThemeToggle={setIsDarkMode}
      />
      <StartGameButton 
        isEnabled={!!settings}
        onStart={() => navigateToGame()}
      />
    </div>
  );
}

// Child component receives props and calls callbacks
function SettingsForm({ onSave, isDarkMode, onThemeToggle }) {
  const handleSubmit = (formData) => {
    onSave(formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  );
}
```

#### Benefits of This Approach:
- **Easier to Test**: Smaller components are easier to unit test
- **Better Reusability**: Components can be reused in different contexts
- **Clearer Responsibilities**: Each component has a single, clear purpose
- **Easier Debugging**: Issues are easier to isolate and fix
- **Better Code Organization**: Related functionality is grouped together

### Testing

#### Unit Tests (Should Pass by Default)
```bash
npm run test:unit
```
These test the logic functions and should already be passing.

#### End-to-End Tests (Your Goal)
```bash
npm run test:e2e
```
These Playwright tests verify the complete user flow and are what you need to make pass.

#### Full Test Suite
```bash
npm test
```
Runs both unit and e2e tests, plus builds the project.

### File Structure
```
src/
├── components/
│   ├── Lobby.jsx          # Settings form component
│   └── Game.jsx           # RPS game component
├── logic/
│   ├── game.js            # Game logic functions
│   ├── settings.js        # localStorage helpers
│   └── avatars.js         # Avatar configuration
├── assets/avatars/        # Avatar images
└── App.jsx               # Main app with routing
```

### Tips for Success

1. **Start with the Lobby**: Get the settings form working first
2. **Break It Down**: Create smaller components instead of putting everything in one large component (but organize them however makes sense to you!)
3. **Use Props Effectively**: Pass data down from parent components and use callback functions to communicate back up
4. **Use the Provided Logic**: The game logic functions are already implemented
5. **Follow the Test Specs**: The Playwright tests show exactly what elements and IDs are expected
6. **Test Incrementally**: Run `npm run test:e2e` frequently to see your progress
7. **Check localStorage**: Use browser dev tools to verify settings are being saved correctly
8. **Think About State Management**: Decide which component should own each piece of state

### Submission

Your assignment is complete when:
- ✅ `npm run test:unit` passes (should already pass)
- ✅ `npm run test:e2e` passes (your main goal)
- ✅ The application runs without errors in development mode

Good luck! 🎮
