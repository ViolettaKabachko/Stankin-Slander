# University project for comfort homework managment
## Stack
### React.js, FastAPI, PostgreSQL
## Implements:
1. JWT-based login (tokens are stored in localStorage)
2. Roles division (Student, Monitor of study group and Admin)

# Functional presentation
## Login/Sign Up Page:
![image](https://github.com/user-attachments/assets/03c02f95-a015-4c6d-aa3f-d013dc0edee1)

## If some group want to have it's own page, where monitor could write a actual homework, monitor have to sign up and send a request to the admin:
![image](https://github.com/user-attachments/assets/1a287b4c-4fb2-403e-9822-b4034b85593b)
## Admin panel
View of admin's panel, there is a active requests on the right side. If request is getting approved by admin, user gets the rights to add and delete homeworks of his group and this group is getting registered in application's data base.
## Homework pages
![image](https://github.com/user-attachments/assets/e5616a8a-ebe2-4c12-9b8e-1a775734efa8)

![image](https://github.com/user-attachments/assets/73e62be1-bffd-41db-a4f7-109df25c44cd)

Homework page contains the main table with columns ("Subject", "Homework", "Special notes", "Term")
This page have different view in dependance of user's role:
1. If user's role is "Student" the only thing he can do is take a look for actual homework,
2. If user's role is "Monitor" he can add and delete homeworks for his own group,
3. If user's role is "Admin" he can add and delete homeworks for every registered group.
