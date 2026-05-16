from fastapi import FastAPI 
from app.api.routes import router as api_router 
from app.core.config import FRONTEND_URL
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="TextElevate")

app.include_router(api_router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        FRONTEND_URL,
        "http://127.0.0.1:5173",
        "http://localhost:5173",
        "http://127.0.0.1:5174",
        "http://localhost:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],             
    allow_headers=["*"],             
)

@app.get("/ping")
async def ping():
    return {"message":"pong"}

