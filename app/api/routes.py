from fastapi import APIRouter
from pydantic import BaseModel
from app.services import paragraph_scorer, text_completion, text_summarization

router = APIRouter()

class ParagraphRequest(BaseModel):
    text: str

@router.post("/paragraph_scorer")
def score(request: ParagraphRequest):
    result = paragraph_scorer.paragraph_final_score(request.text)
    return result

class CompletionRequest(BaseModel):
    text: str
    max_tokens: int = 20

@router.post("/complete")
def complete(request: CompletionRequest):
    result = text_completion.generate_completion(request.text, request.max_tokens)
    return {"completion": result}

class SummaryRequest(BaseModel):
    text: str
    max_tokens: int = 100
    min_tokens: int = 30

class SummaryResponse(BaseModel):
    summary: str

@router.post("/summarize", response_model=SummaryResponse)
def summarize(request: SummaryRequest):
    summary = text_summarization.generate_summary(
        request.text,
        max_tokens=request.max_tokens,
        min_tokens=request.min_tokens
    )
    return SummaryResponse(summary=summary)