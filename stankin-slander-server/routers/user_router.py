from fastapi import APIRouter
from database_connection import database
from models.user_login_model import UserLogin
from models.user_register import RegisterUser
import datetime
from werkzeug.security import check_password_hash, generate_password_hash
from config import key
import jwt

user_router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@user_router.get('/user_id')
async def get_user(user_id):
    return database.get_user_by_id(user_id)


@user_router.get('/{token}')
async def get_user(token: str):
    try:
        data = jwt.decode(token, key, algorithms=["HS256"])
        print(data)
        return {
            "status": 200,
            "id": data['id'],
            "full_name": data["full_name"],
            "bilet": data["bilet"],
            "group": data["group"],
            "email": data["email"],
            "is_admin": data["is_admin"],
            "is_monitor": data["is_monitor"]
        }
    except jwt.ExpiredSignatureError:
        return {
            "status": 401,
            "msg": "Token is expired"
        }


@user_router.get('/check_token/{token}')
def check_token(token):
    try:
        jwt.decode(token, key, algorithms=["HS256"])
        return {
            "status": 200
        }
    except (jwt.ExpiredSignatureError, Exception):
        return {
            "status": 401
        }


@user_router.post('/login')
async def login(req: UserLogin):
    email = req.email
    user: dict = database.get_user_by_email(email)
    if not user:
        return {
            "status": 403,
            "msg": "Incorrect email"
        }
    else:
        if check_password_hash(user['password'], req.password):
            del user['password']
            payload = {"status": 200} | dict(user)
            payload["exp"] = (datetime.datetime.now() + datetime.timedelta(minutes=7)).timestamp()
            return {
                    "access_token": jwt.encode(payload, key),
                    "status": 200
                }
        else:
            return {
                "status": 403,
                "msg": "Incorrect password"
            }


@user_router.post('/register')
def register(req: RegisterUser):
    if database.get_user_by_email(req.email):
        return {
            "status": 403,
            "msg": "User registered under this email already exists"
        }
    else:
        a = generate_password_hash(req.password)
        print(a)
        res = database.insert_user(req.full_name, a, req.email, req.bilet)
        if res["msg"] == "success":
            return {
                "status": 200,
                "msg": "Registered successfully"
            }
        else:
            return {
                "status": 500,
                "msg": "Error occurred"
            }


