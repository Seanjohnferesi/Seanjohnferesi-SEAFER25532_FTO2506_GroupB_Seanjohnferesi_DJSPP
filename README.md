# Podcast App

## Overview

This project is a **Podcast Web Application** that allows users to browse shows, listen to episodes, and manage favourites. Users can:

- Browse podcasts and seasons
- Play episodes with a full-featured audio player
- Favourite episodes and persist them across sessions
- Navigate between shows and maintain playback state

---

## Features Implemented

### 1. Favourites

- Users can **favourite/unfavourite episodes** by clicking a heart icon.  
- Favourites are **stored in localStorage**, so they persist across sessions.  
- The favourites page shows:
  - Podcast title
  - Season title
  - Episode title and description
  - Date added
  - Heart icon reflecting favourite status

### 2. Audio Player

- Added a full-featured **audio player component**:  
  - Play/pause toggle  
  - Next/previous episode  
  - Progress bar with dragging capability  
  - Current time display  
  - Auto-play next episode when current ends  
- **Current playback time** is saved to localStorage and restored on refresh.  
- The player references the **selected season and episode** from context.

### 4. Favourites Page

- Has a refresh issues whereby the episodes unmounts from the page
- Mark/unmark episodes as favourites with a heart icon
- Show episode details: title, description, added date
- Play episodes directly from the favourites page  

### UI/UX
- Clean card layout for episodes
- Heart icon fills/unfills based on favourite status
- Dark mode toggle persists across sessions 

---

## Technologies Used

- **React** – Component-based UI development
- **React Context API** – Global state management
- **React Router** – Navigation between pages
- **CSS / Flexbox** – Styling and responsive layouts
- **FontAwesome** – Icons for playback and favourites
- **Fetch API** – Fetching podcast and season data
- **JavaScript** – Array methods, destructuring, async/await

---

### 6. Issues & Fixes

1. **Favourites disappearing on refresh:**  
   - Cause: Component relied on `seasons` or `podcasts` which weren’t loaded yet.  

---

### 8. How to Use

1. **Favouriting an episode:**  
   Click the heart icon on any episode. The heart will fill and the episode will be saved to favourites.  

2. **Unfavouriting an episode:**  
   Click the filled heart icon again to remove from favourites.  

3. **Viewing favourites:**  
   Navigate to the favourites page. Episodes will be grouped by podcast and season.  

4. **Playing episodes:**  
   Click on any episode in favourites or main show pages. Audio player will load and play the selected episode.  

---

## Installation & Setup

### Prerequisites
- **Node.js** (v16 or later recommended)
- **npm** (comes with Node.js) or **yarn**

---

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/Seanjohnferesi/Seanjohnferesi-SEAFER25532_FTO2506_GroupB_Seanjohnferesi_DJSPP.git
cd podcast-app

