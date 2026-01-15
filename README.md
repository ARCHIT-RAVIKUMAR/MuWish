# ❄️ Frosty Window - Interactive Christmas Greeting

> **µWishes Contest Entry** > *A personalized, interactive web experience where users "wipe" away the frost to reveal a glowing holiday wish.*

## 🌟 The Concept
Moving away from static greeting cards, this project creates a **tactile experience**. It simulates a frozen window pane that the user must physically interact with (using their mouse or finger) to clear the fog and reveal the warm, glowing scene inside.

## ✨ Key Features

### 🎨 Visuals
-   **Pure CSS Art:** The glowing Christmas tree, the starry night, and the snow-covered ground are built entirely with CSS (using Borders, Gradients, and Box-Shadows). **Zero external image files were used for the graphics.**
-   **HTML5 Canvas Frost:** Uses the Canvas API to generate a procedural "fog" layer with noise texture.
-   **Infinite Snow:** CSS Keyframe animations creating a parallax snow effect.

### ⚙️ Mechanics
-   **Interactive Wiping:** Uses `globalCompositeOperation = 'destination-out'` to simulate a realistic eraser/wiper effect on the canvas.
-   **Dynamic Re-Freezing:** The window slowly "freezes over" again if the user stops interacting, creating a living environment.
-   **Cross-Platform:** Works with both Mouse (Desktop) and Touch (Mobile/Tablet).

### 🔗 Shareability
-   **Serverless Sharing:** Users can create custom messages. The text is encoded in **Base64** and stored in the URL parameters (e.g., `?msg=...`), allowing for instant sharing without a backend database.

## 🚀 How to Run

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/frosty-window.git](https://github.com/YOUR_USERNAME/frosty-window.git)
    ```
2.  **Open the Project**
    Navigate to the folder and open `index.html` in any modern browser (Chrome, Edge, Safari).
3.  **Turn on Sound**
    Click the **"🔇 Music Off"** button in the bottom right corner to start the experience.

## 🛠️ Tech Stack
-   **HTML5** (Canvas API, Audio Element)
-   **CSS3** (Keyframes, Radial Gradients, Pseudo-elements)
-   **JavaScript** (Event Listeners, Animation Loops, Base64 Encoding)

## 🎵 Credits
-   **Audio:** "Jingle Bells" (Royalty Free via Pixabay)
-   **Fonts:** 'Great Vibes' & 'Montserrat' (Google Fonts)

---
*Created by Archit Ravikumar*
