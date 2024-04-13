from fastapi import FastAPI

app = FastAPI()


@app.get("/testing")
async def test():
    return [
        {
            "id": 1,
            "subjectName": "Линал",
            "homeWork": "№1, 2, 3, 4, 5",
            "notes": "обязательно к КР",
            "term": "08.04.2024"
        },
        {
            "id": 2,
            "subjectName": "ВССиТ",
            "homeWork": "Сосать бибу",
            "notes": "ибатулин((",
            "term": "никогда"
        }
    ]

