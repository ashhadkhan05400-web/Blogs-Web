
# Blog Web

A full-stack blogging platform built with React and Firebase.  
Users can sign up, log in (email/password or Google), create blog posts with optional cover images, and view a public feed of all blogs.

---

## Features

- **Authentication**
  - Email & Password signup / login
  - Google Sign-In
  - Profile picture upload (Cloudinary)

- **Dashboard**
  - Public blog feed (newest first)
  - Profile dropdown with Create Post & Logout
  - Loading skeletons for better UX

- **Create Post**
  - Title, content, and optional cover image
  - Cover image uploaded to Cloudinary
  - Posts saved to Firestore

- **UI**
  - Clean, minimal design
  - Warm beige + burgundy color palette
  - Fully responsive

---

## Tech Stack

| Technology       | Purpose                        |
|------------------|--------------------------------|
| React + Vite     | Frontend                       |
| React Router     | Routing                        |
| Firebase Auth    | Authentication                 |
| Cloud Firestore  | Database                       |
| Cloudinary       | Image hosting                  |
| Axios            | Cloudinary uploads             |
| Custom CSS       | Styling                        |
