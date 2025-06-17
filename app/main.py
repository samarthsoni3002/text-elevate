from fastapi import FastAPI 
from app.api.routes import router as api_router 
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="TextElevate")

app.include_router(api_router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          
    allow_credentials=True,
    allow_methods=["*"],             
    allow_headers=["*"],             
)

@app.route("/ping")
async def ping():
    return {"message":"pong"}

