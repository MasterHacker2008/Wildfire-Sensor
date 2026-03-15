# Wildfire Risk Monitoring – Report Website

This folder contains the report of my Wildfire Risk Monitoring project.

The website includes the written report sections, a live dashboard for sensor data, and a simulator that allows users to test the wildfire risk model.

---
The report website is hosted in a netlify server so that you can test the simulator without having to run a server locally:
https://wildfire-detection.netlify.app/

Running predictions and content appearing in the dashboard may take some time as the server goes to sleep with inactivity. reloading thepage after a minute should fix this.

Fastapi server is hosted on render.com so you can view and test the project uing the interactive docs without having to run the server locally: https://wildfire-server.onrender.com/docs

## Important

To test the **simulator locally**, opening `index.html` directly in the browser **will not work correctly** due to browser security restrictions with local files.

You must run the website using a **local server**.

### Option 1 — VS Code Live Server (Recommended)

1. Open the project folder in **VS Code**
2. Install the **Live Server** extension
3. Open folder in VS Code
4. Click **Go Live** in the bottom right corner

---

### Option 2 — Python Local Server

1. Open **Command Prompt** in the project folder
2. Run the following command:

```bash
python3 -m http.server
```

Open your browser and go to:
http://localhost:8000




# Website Structure

The website is divided into **four main sections/pages**.

## 1. Home Page (`index.html`)

This page contains the **main report content**.

Sections included:

- **Meeting the Brief**
- **Investigation**
- **Plan and Design**
- **Create**

These sections explain the project background, research, system design, and development process.

---

## 2. Dashboard (`/dashboard`)

This section contains the **live monitoring dashboard**.

Features:

- Graphs showing temperature and humidity data
- Real-time updates from the server
- Visualization of collected sensor data

All dashboard-related files are located in the `/dashboard` directory.

---

## 3. Simulator (`/simulator`)

The simulator allows users to **test the wildfire risk prediction model**.

Features:

- Adjustable sliders for:
  - Temperature
  - Humidity
- Displays the predicted wildfire risk based on the selected values.

Also includes What-if simulation. I considered this section as part of the "Meeting the brief" section in terms of word count.

All simulator files are stored in the `/simulator` directory.

---

## 4. Conclusion (`/conclusion`)

This section contains the **final report components**.

Includes:

- **Evaluation**
- **References**
- **Word Count Table**

---


# Project File Structure

## Styling

- `style.css` contains the **global styles** used across the entire website.
- Additional stylesheets are stored in the `/css` folder.




## Assets

The `/assets` folder contains:

- Images used in the report
- Diagrams
- The project demonstration video

---

