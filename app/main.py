from fastapi import FastAPI 
from app.api.routes import router as api_router 

app = FastAPI(title="TextElevate")

app.include_router(api_router)


@app.route("/ping")
async def ping():
    return {"message":"pong"}

