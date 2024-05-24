from fastapi import APIRouter
from database_connection import database
from models.homework_model import Homework
from config import key
import jwt

homework_router = APIRouter(
    prefix="/homework",
    tags=["Homework"]
)


@homework_router.get('/{group}')
def get_homework(group: str):
    res = database.get_group_homework(group)
    if res["msg"] == "success":
        return {
            "status": 200,
            "payload": res["res"]
        }
    return {
        "status": 500,
        "msg": "Error occurred"
    }


@homework_router.post('/add_homework/{token}')
def add_homework(req: Homework, token):
    try:
        data = jwt.decode(token, key, algorithms=["HS256"])
        database.insert_homework(
            req.subject,
            req.group,
            req.homework,
            req.notes,
            req.term,
            data['id']
        )
        return {
            "status": 200,
            "msg": "Homework added"
        }
    except (jwt.ExpiredSignatureError, Exception):
        print("a")
        return {
            "status": 500,
            "msg": "Error occurred"
        }


@homework_router.post('/delete_homework/{homework_id}/{token}')
def delete_homework(homework_id, token):
    try:
        data = jwt.decode(token, key, algorithms=["HS256"])
        res = database.delete_homework_by_id(homework_id)
        if res['status'] == 200:
            return {
                "status": 200
            }
    except jwt.ExpiredSignatureError:
        return {
            "status": 500
        }


