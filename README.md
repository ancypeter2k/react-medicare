# React Machine Test – Secure Authentication &  Dashboard

## Overview

This project is a React application that implements a secure authentication workflow using HTTP-only cookies, protected routing, and a Dashboard interface.

The application demonstrates:

* Secure authentication flow
* Redux Toolkit state management
* Protected routes
* API integration
* Dashboard UI
* Live search suggestions using static data
* Logout and session handling

The authentication mechanism is handled entirely by the backend through HTTP-only cookies. No token storage is implemented on the frontend.

---

# Tech Stack

* React (Functional Components)
* Redux Toolkit
* React Router DOM
* Axios
* Tailwind CSS
* JavaScript (ES6)

---

# Project Features

## 1. Authentication

* Login using email and password
* Backend sets HTTP-only cookie on successful login
* Redux manages authentication state
* Automatically fetches user details after login

### API Endpoints

| Endpoint          | Method | Description                         |
| ----------------- | ------ | ----------------------------------- |
| `/login`          | POST   | Authenticate user                   |
| `/getUserdetails` | GET    | Retrieve authenticated user details |
| `/logout`         | POST   | Logout and clear session            |

Base URL:

```
https://login-x6k3.onrender.com/api/auth
```

---

## 2. Protected Routing

Routes implemented using React Router.

| Route        | Description                       |
| ------------ | --------------------------------- |
| `/login`     | Login page                        |
| `/dashboard` |  Dashboard (Protected Route)      |

Unauthorized users cannot access protected pages.

---

## 3. Dashboard

After successful login the user is redirected to the Dashboard.

Features include:

* Welcome message with user name
* Procedure search with suggestions
* Procedure table
* Location dropdown
* Fee level dropdown
* Net total display
* Add patient button
* Save functionality
* Logout option

---

## 4. Search Functionality

Live suggestions are implemented using static dummy data.

Search field:

```
Procedure Name or Code
```

Filtering occurs dynamically as the user types.

---

# Dummy Data Used

### Procedures

```js
[
{
id: 1,
code: "56220",
name: "CT Cervical Spine without Contrast",
category: "CTC - CT Cervical",
feeLevel: "Medicare",
amount: 250.56,
gap: 0.0
},
{
id: 2,
code: "56221",
name: "CT Cervical Spine with Contrast",
category: "CTC - CT Cervical",
feeLevel: "Private",
amount: 320.75,
gap: 15.0
}
]
```

### Locations

```js
[
{ id: 1, code: "NSW", name: "New South Wales Clinic" },
{ id: 2, code: "QLD", name: "Queensland Diagnostic Center" },
{ id: 3, code: "VIC", name: "Victoria Imaging" },
{ id: 4, code: "WA", name: "Western Australia Radiology" }
]
```

### Fee Levels

```js
[
{ id: 1, label: "Medicare" },
{ id: 2, label: "Private" },
{ id: 3, label: "Bulk Billed" },
{ id: 4, label: "Corporate" }
]
```

---

# Project Folder Structure

```
src
│
├── api
│   └── axiosInstance.js
│
├── app
│   └── store.js
│
├── features
│   └── auth
│       ├── authSlice.js
│       └── authAPI.js
│
├── components
│   ├── ProtectedRoute.jsx
│   └── Navbar.jsx
│
├── pages
│   ├── Login.jsx
│   └── Dashboard.jsx
│
├── data
│   └── dummyData.js
│
├── App.jsx
└── main.jsx
```

---

# Authentication Flow

1. User submits login credentials.
2. Backend validates credentials and sets an HTTP-only cookie.
3. Redux dispatches login success.
4. `/getUserdetails` API is called immediately.
5. User data is stored in Redux.
6. User is redirected to `/dashboard`.

---

# Logout Flow

1. Logout button calls `/logout`.
2. Redux authentication state is cleared.
3. User is redirected to `/login`.
4. Protected routes become inaccessible.

---

# Setup Instructions

Follow the steps below to run the project locally.

## 1. Clone the Repository

```
git clone https://github.com/yourusername/react-medicare.git
```

## 2. Navigate to the Project Directory

```
cd react-medicare
```

## 3. Install Dependencies

```
npm install
```

## 4. Start Development Server

```
npm run dev
```

The application will run at:

```
http://localhost:5173
```

---

# Test Credentials

Use the following credentials for testing:

```
email: ayilin@mrb.com
password: password111
```

---

# Important Notes

* Authentication uses HTTP-only cookies handled by the backend.
* The frontend does not store tokens.
* Axios is configured with:

```
withCredentials: true
```

This ensures cookies are sent with every request.

---

# UI Implementation

The Dashboard UI follows the provided design specifications including:

* Background color: `#111c2d`
* Button highlight color: `#01c0c8`
* Table header background: `#2EACBA17`
* Search suggestion background: `#1F2937`

Spacing, layout, and color guidelines are implemented as specified.

---

# Error Handling

The application includes handling for:

* Invalid login credentials
* API failures
* Unauthorized access to protected routes
* Loading states during API calls

---
