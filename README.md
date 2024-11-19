# University project for comfort homework managment
## Stack
### React.js, FastAPI, PostgreSQL
## Implements:
1. JWT-based login (tokens are stored in localStorage)
2. Roles division (Student, Monitor of study group and Admin)

# Functional presentation
## Login/Sign Up Page:
![IMG_0375](https://github.com/user-attachments/assets/a2493544-7e10-41a9-bbe8-b20a6c90a0f4)


## If some group want to have it's own page, where monitor could write a actual homework, monitor have to sign up and send a request to the admin:
## Admin panel
View of admin's panel, there is a active requests on the right side. If request is getting approved by admin, user gets the rights to add and delete homeworks of his group and this group is getting registered in application's data base.
![IMG_0377](https://github.com/user-attachments/assets/8920d991-4839-4128-9b60-eec65d005b98)

## Homework pages
![IMG_0378](https://github.com/user-attachments/assets/51e15982-513f-467b-a6e3-a69d483686b1)

![IMG_0380](https://github.com/user-attachments/assets/0f71c3c8-65e5-4e62-90cf-5b3797dc9f53)

Homework page contains the main table with columns ("Subject", "Homework", "Special notes", "Term")
This page have different view in dependance of user's role:
1. If user's role is "Student" the only thing he can do is take a look for actual homework,
2. If user's role is "Monitor" he can add and delete homeworks for his own group,
3. If user's role is "Admin" he can add and delete homeworks for every registered group.
