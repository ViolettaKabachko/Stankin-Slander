from fastapi import APIRouter
from database_connection import database
from config import key
from models.answer_model import Answer
import jwt


group_router = APIRouter(
    prefix='/group',
    tags=["group"]
)


@group_router.post('/request/{group}/{token}')
def request_group(group, token):
    try:
        data = jwt.decode(token, key, algorithms=['HS256'])
        res = database.get_groups()
        if group not in res:
            database.insert_request(group, data['id'], "sent")
            return {
                "status": 200,
                "msg": "Request has been sent"
            }
        else:
            return {
                "status": 400,
                "msg": "This group is already exists"
            }
    except jwt.ExpiredSignatureError:
        return {
            "status": 500,
            "msg": "Error occurred"
        }


@group_router.get('/requests/{token}')
def get_reqs(token):
    try:
        data = jwt.decode(token, key, algorithms=["HS256"])
        if data["is_admin"]:
            res = database.get_requests()['res']
            print(res)
            return {
                "status": 200,
                "res": res
            }
    except jwt.ExpiredSignatureError:
        return {
            "status": 500,
        }


@group_router.post('/handle_answer/{token}')
def handle_answer(token, req: Answer):
    try:
        data = jwt.decode(token, key, algorithms=["HS256"])
        if data["is_admin"]:
            database.set_request(req.status, req.id)
            if req.status == "approved":
                database.set_user_monitor(req.creator_id, req.group)
            return {
                "status": 200
            }
        return {
            "status": 403
        }
    except jwt.ExpiredSignatureError:
        return {
            "status": 500
        }


@group_router.get('/')
def get_groups():
    return {"res":database.get_groups()}

