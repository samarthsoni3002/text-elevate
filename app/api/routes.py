from fastapi import APIRouter
from pydantic import BaseModel
from app.services import paragraph_scorer

router = APIRouter()

class ParagraphRequest(BaseModel):
    text: str

@router.post("/paragraph_scorer")
def score(request: ParagraphRequest):
    result = paragraph_scorer.paragraph_final_score(request.text)
    return result
