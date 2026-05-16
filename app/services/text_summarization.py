from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

from app.core.config import SUMMARY_MODEL_NAME

tokenizer = None
model = None

def get_summary_model():
    global tokenizer, model
    if tokenizer is None:
        tokenizer = AutoTokenizer.from_pretrained(SUMMARY_MODEL_NAME)
    if model is None:
        model = AutoModelForSeq2SeqLM.from_pretrained(SUMMARY_MODEL_NAME)
    return tokenizer, model

def generate_summary(text: str, max_tokens: int = 1000, min_tokens: int = 30) -> str:
    tokenizer, model = get_summary_model()

    input_text = "summarize: " + text.strip()

    inputs = tokenizer.encode(input_text, return_tensors="pt", truncation=True)

    outputs = model.generate(
        inputs,
        max_length=max_tokens,
        min_length=min_tokens,
        length_penalty=2.0,
        num_beams=4,
        early_stopping=True
    )

    summary = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return summary
