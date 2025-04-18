from fastapi import FastAPI, File, UploadFile, Form
import uvicorn

app = FastAPI()

@app.post("/upload_pdf")
async def upload_book(book: UploadFile = File(...), title: str = Form(...)):
    pass

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