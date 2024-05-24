from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from hosts import *
from database_connection import database
from routers.user_router import user_router
from routers.homework_router import homework_router
from  routers.group_router import group_router

app = FastAPI()
origins = [frontend_adress]

database.connect()

app.include_router(user_router)
app.include_router(homework_router)
app.include_router(group_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


