# ❄️ Frosty Window - Interactive Christmas Greeting

> **µWishes Contest Entry**
> *A personalized, interactive web experience where users "wipe" away the frost to reveal a glowing holiday wish.*

## 🌟 The Concept
Moving away from static greeting cards, this project creates a **tactile experience**. It simulates a frozen window pane that the user must physically interact with (using their mouse or finger) to clear the fog and reveal the warm, glowing scene inside.

## ✨ Key Features

### 🎨 Visuals
-   **Pure CSS Art:** The glowing Christmas tree, twinkling ornaments, and snow-covered ground are built entirely with CSS (using Borders, Gradients, and Box-Shadows). **Zero external image files were used for the graphics.**
-   **HTML5 Canvas Frost:** Uses the Canvas API to generate a procedural "fog" layer with realistic noise texture.
-   **Twinkling Bokeh Lights:** CSS Keyframe animations create a cozy, glowing atmosphere behind the ice.

### ⚙️ Mechanics
-   **Interactive Wiping:** Uses `globalCompositeOperation = 'destination-out'` with shadow blurring to simulate a realistic, soft-edged wipe effect.
-   **Smart UX:** Includes an animated "Hand Guide" that teaches users to swipe, then vanishes instantly upon interaction.
-   **Manual Freeze:** Users can re-freeze the window at any time to experience the reveal again.
-   **Cross-Platform:** optimized for both Mouse (Desktop) and Touch (Mobile/Tablet).

### 🔗 Shareability
-   **Serverless Sharing:** Users can generate custom links. Both the **Message** and the **Sender's Name** are encoded in Base64 within the URL (e.g., `?msg=...&from=...`).
-   **Sender Badge:** When opening a shared link, a special "FROM" badge appears, making the page feel like a personalized gift.

## 🚀 How to Run

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/frosty-window.git](https://github.com/YOUR_USERNAME/frosty-window.git)
    ```
2.  **Open the Project**
    Navigate to the folder and open `index.html` in any modern browser (Chrome, Edge, Safari).
3.  **Turn on Sound**
    Click the **"🔇 Music Off"** button in the bottom right corner to play the holiday background music.

## 🛠️ Tech Stack
-   **HTML5** 
-   **CSS3** 
-   **JavaScript** 

## 🎵 Credits
-   **Audio:** "Jingle Bells" (Royalty Free)
-   **Fonts:** 'Great Vibes' & 'Montserrat' (Google Fonts)

---
*Created by Archit Ravikumar*
