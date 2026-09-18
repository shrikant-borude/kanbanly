# Kanbanly

Kanbanly is a simple Kanban board application built with **Django** and **React**.

The project provides a easy way to organize projects/tasks using boards, lists, and cards. Kanbanly mainly focuses on the core Kanban workflow:

- Create a board
- Add lists to a board
- Add cards to a list
  
## Features

- Create and manage Kanban boards
- Add lists to a board
- Add cards to lists
- React-based frontend
- Django REST API backend
- Simple and minimal Kanban workflow

## Technologies used:

### Backend

- Python
- Django
- Django REST Framework

### Frontend

- React
- JavaScript
- CSS

## Project Structure

```text
kanbanly/
├── api/                
├── frontend/           
├── kanbanly/           
├── .gitignore
├── manage.py
├── requirements.txt    
└── package-lock.json

# Getting Started

Follow the steps below to run Kanbanly locally.

## 1. Clone the repository

```bash
git clone https://github.com/shrikant-borude/kanbanly.git
```

Move into the project directory:

```bash
cd kanbanly
```

---

## 2. Create a Python virtual environment

Create a virtual environment:

### Windows

```bash
python -m venv env
```

Activate it:

```bash
env\Scripts\activate
```

### macOS / Linux

```bash
python3 -m venv env
```

Activate it:

```bash
source env/bin/activate
```

---

## 3. Install Python requirements

Install the backend dependencies from `requirements.txt`:

```bash
pip install -r requirements.txt
```

---

## 4. Create the `.env` file

Kanbanly requires a Django secret key.

Create a file named `.env` in the root directory of the project:

```text
kanbanly/
├── api/
├── frontend/
├── kanbanly/
├── .env
├── manage.py
├── requirements.txt
└── ...
```

Add the following to the `.env` file:

```env
DJANGO_SECRET_KEY=your-secret-key-here
```

### Generate a Django Secret Key

You can generate a secure Django secret key using Python.

Run:

```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

The command will output a secret key similar to:

```text
django-insecure-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Copy the generated key and add it to your `.env` file:

```env
DJANGO_SECRET_KEY=django-insecure-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 5. Apply database migrations

From the project root, run:

```bash
python manage.py makemigrations
python manage.py migrate
```

This will create and update the local SQLite database.

---

## 6. Start the Django backend

Start the Django development server:

```bash
python manage.py runserver
```

The backend will normally be available at:

```text
http://127.0.0.1:8000/
```

Keep this terminal running.

---

## 7. Install frontend dependencies

Open a **new terminal** and navigate to the frontend directory:

```bash
cd frontend
```

Install the frontend dependencies:

```bash
npm install
```

---

## 8. Start the React frontend

Kanbanly uses React with Vite.

Start the Vite development server:

```bash
npm run dev
```

Vite will normally start the frontend at:

```text
http://localhost:5173/
```

Open that address in your browser.
---

# Usage

Once both the Django backend and React frontend are running, open:

```text
http://localhost:5173/
```

Kanbanly provides a simple Kanban workflow consisting of **boards, lists, and cards**.

## 1. Create a Board

Create a board to represent a project or area of work.

For example:

```text
My Website
```

## 2. Add Lists

Add lists to organize different stages or categories of work.

For example:

```text
My Website

├── To Do
├── In Progress
└── Done
```

## 3. Add Cards

Add cards inside a list to represent individual tasks.

For example:

```text
To Do
├── Create homepage
├── Design login page
└── Add contact form
```

At this point you are good to go ahead and add more Boards for different work tasks or projects. 
Will be adding more features soon and a better UI with login authentication, drag and drop cards, and many more.
