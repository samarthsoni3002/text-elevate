from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

from app.core.config import GEC_MODEL_NAME

tokenizer = None
model = None

def get_gec_model():
    global tokenizer, model
    if tokenizer is None:
        tokenizer = AutoTokenizer.from_pretrained(GEC_MODEL_NAME)
    if model is None:
        model = AutoModelForSeq2SeqLM.from_pretrained(GEC_MODEL_NAME)
    return tokenizer, model

def correct_grammar(text: str, max_tokens: int = 128) -> str:
    tokenizer, model = get_gec_model()
    input_text = "grammar: " + text.strip()
    inputs = tokenizer.encode(input_text, return_tensors="pt", truncation=True)

    outputs = model.generate(
        inputs,
        max_length=max_tokens,
        num_beams=4,
        early_stopping=True
    )

    corrected = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return corrected
