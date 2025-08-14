# Eventura — Events Booking & Admin Portal

Eventura is a straightforward, user-friendly events hub for organising and booking activities.  
Users can sign up, sign in, explore upcoming events, and secure tickets in just a few steps.  

Admins have a dedicated interface to create, edit, and manage events, including the ability to add detailed venue information.  

The project is built with **Vite + TypeScript + SCSS/Bootstrap** on the frontend and **Spring Boot + MySQL** on the backend, ensuring a modern, scalable, and maintainable codebase.

---

## Features

### For Everyone
- Quick sign-up with personal details and address, stored securely
- Simple sign-in using only your email
- Browse an up-to-date list of upcoming events
- Book tickets instantly with a minimal number of clicks
- View all your booked events in one dedicated section

### For Admins
- Create events with complete details *(name, description, organiser, venue address, capacity, cost, and schedule)*
- Update any aspect of an event, from its description to its dates
- Delete events that are outdated or no longer relevant
- Optionally link events to newly created venue addresses

---

## Tech Stack

**Frontend**
- Vite, TypeScript for fast builds and type safety
- SCSS + Bootstrap 5 for a responsive and customisable UI
- Fetch API for communication with the backend

**Backend**
- Spring Boot 3.x (Java 17+)
- MySQL for persistent data storage
- Spring Data JPA / Hibernate for streamlined database interactions

---

## User Flows

### Sign Up
1. User submits address details to `POST /api/addresses`
2. User account is created with `POST /api/users`, linking to the address ID
3. The frontend stores the returned user ID for session management

### Sign In
1. User enters email, which is verified via `GET /api/users/by-email?email=...`
2. The returned user ID is stored for identifying bookings and permissions

### Browse & Book
1. Events are loaded with `GET /api/events`
2. User selects an event and books tickets with `POST /api/bookings`
3. Bookings are displayed using `GET /api/bookings/user/{userId}`

### Admin Manage Events
- **Create:** `POST /api/events` with all event data
- **Edit:** `PUT /api/events/{id}` to update existing events
- **Delete:** `DELETE /api/events/{id}` to remove events from the system

---

## API Overview

**Base URL (local)**
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8080`

### Users
- Create: `POST /api/users`
- Retrieve by ID: `GET /api/users/{id}`
- Retrieve by Email: `GET /api/users/by-email?email=...`

### Addresses
- Create: `POST /api/addresses`
- Retrieve by ID: `GET /api/addresses/{id}`

### Events
- List all: `GET /api/events`
- Retrieve single: `GET /api/events/{id}`
- Create: `POST /api/events`
- Update: `PUT /api/events/{id}`
- Delete: `DELETE /api/events/{id}`

### Bookings
- Create: `POST /api/bookings`
- Retrieve by user: `GET /api/bookings/user/{userId}`

---

## Local Development

**Requirements**
- Node 18+
- Java 17+
- Maven 3.9+
- MySQL 8.x

---

## Backend:
Create a MySQL database named eventura

Update application.properties with your database username and password

Start the server: mvn spring-boot:run

## Frontend:
- Install dependencies: npm install
- Create a .env file containing VITE_API_BASE_URL=http://localhost:8080
- Start the development server: npm run dev

---

## Future Improvements
- Reduce repeated code and improve adherence to DRY principles
- Add images for each event, using placeholder images when not available
- Implement unit tests for both frontend and backend components
- Allow users to delete bookings from the **My Bookings** section
- Add secure payment integration for ticket purchases
- Enable user profile editing
- Introduce password-based authentication for enhanced security
- Improve project file structure, naming conventions, and styling consistency

--- 

Credits

Created by Alex, James, and Purbai.

