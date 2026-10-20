UPDATE: adds phone, age, address, course dropdown, search, Clear Form, Total Students

1. Stop the server (Ctrl + C in the terminal).
2. Copy the "students" folder from this zip into your project folder
   (D:\Django Project Files\student_crud\student_crud) and choose "Replace the files".
   Do NOT delete your students\migrations folder. settings.py is not touched.
3. In the terminal run:
       python manage.py makemigrations students
       python manage.py migrate
       python manage.py runserver
4. Open http://127.0.0.1:8000/  (press Ctrl + F5 to refresh the CSS/JS)
