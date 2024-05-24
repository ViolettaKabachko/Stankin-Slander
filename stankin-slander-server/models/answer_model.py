from pydantic import BaseModel


class Answer(BaseModel):
    creator_id: int
    id: int
    status: str
    group: str
