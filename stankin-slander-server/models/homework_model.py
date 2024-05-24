from pydantic import BaseModel


class Homework(BaseModel):
    group: str
    subject: str
    homework: str
    notes: str
    term: str

