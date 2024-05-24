from pydantic import BaseModel


class RegisterUser(BaseModel):
    full_name: str
    email: str
    bilet: str
    password: str