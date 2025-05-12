import os
import sys
from tempfile import NamedTemporaryFile
from fastapi import FastAPI, File, HTTPException, UploadFile, Form
from fastapi.responses import JSONResponse
import uvicorn

from server.pinecone_utils import add_file_to_database


app = FastAPI()

@app.post("/upload_pdf")
async def upload_file(file: UploadFile = File(...), title: str = Form(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(
            status_code=400, detail="Attachments must be uploaded only in PDF format"
        )

    with NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
        temp_file.write(await file.read())
        temp_file.flush()
        temp_path = temp_file.name
        file_id = add_file_to_database(file=temp_path, title=title)
    os.remove(temp_path)

    return JSONResponse(content={"title": title, "file-id": file_id})

@app.post("/query")
async def ask_question(question: str = Form(...), chat_id: str = Form(...)):
    pass

@app.get("/generate_flashcard/{chat_id}")
async def generate_flashcard(chat_id: str):
    pass

@app.delete("/delete_chat/{chat_id}")
async def delete_chat(chat_id: str):
    pass


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)