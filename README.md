# Student Management System

A full-stack CRUD web application to add, view, search, update and delete students.
Built with **Django**, **MySQL**, and vanilla **JavaScript**, with the frontend talking to the backend through a **REST API** that exchanges **JSON**.

![Student list and form](docs/screenshot-1.png)

![Add and edit students](docs/screenshot-2.png)

## Features

- Add, view, update and delete students (full CRUD)
- Live search by student name
- Total student counter
- Course dropdown and form validation
- REST API with JSON responses
- Data stored in MySQL through the Django ORM

## Tech Stack

| Layer    | Technology                        |
| -------- | --------------------------------- |
| Frontend | HTML, CSS, JavaScript (Fetch API) |
| Backend  | Python, Django                    |
| API      | REST + JSON                       |
| Database | MySQL 8                           |
| Tools    | VS Code, MySQL Workbench, Git     |

## How It Works

```
Browser (HTML + CSS + JS)
        |  fetch() - JSON over HTTP
        v
Django (urls.py -> views.py)
        |  Django ORM
        v
MySQL (students_student table)
```

## API Endpoints

| Operation      | Method | URL                   |
| -------------- | ------ | --------------------- |
| List students  | GET    | `/api/students/`      |
| Create student | POST   | `/api/students/`      |
| Update student | PUT    | `/api/students/<id>/` |
| Delete student | DELETE | `/api/students/<id>/` |

Example request body (POST / PUT):

```json
{
  "name": "Arun",
  "email": "arun@gmail.com",
  "phone": "9876543210",
  "age": 21,
  "address": "Pudukkottai",
  "course": "Python"
}
```

## Project Structure

```
student_crud/
├── manage.py
├── requirements.txt
├── .env.example
├── student_crud/        # project settings and root URLs
└── students/            # app: models, views, urls
    ├── templates/index.html
    └── static/ (css, js)
```

## Getting Started

### Prerequisites

- Python 3.12 or newer
- MySQL Server 8.0 or newer

### Setup

1. Clone the repository
   ```
   git clone https://github.com/<your-username>/student-management-system.git
   cd student-management-system
   ```
2. Create the database (in MySQL Workbench or the mysql shell)
   ```sql
   CREATE DATABASE studentdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
3. Install the dependencies
   ```
   pip install -r requirements.txt
   ```
4. Create your environment file: copy `.env.example` to `.env` and set `DB_PASSWORD` to your MySQL password.
5. Create the tables and start the server
   ```
   python manage.py migrate
   python manage.py runserver
   ```
6. Open http://127.0.0.1:8000/

## Future Improvements

- User login and roles
- Pagination and server-side search
- Django REST Framework serializers and validation
- Docker setup and deployment

## Author

**Suresh Kumar** - Python Full Stack Developer

- GitHub: [Sureshkumar2k03](https://github.com/Sureshkumar2k03)

## License

Released under the [MIT License](LICENSE).
