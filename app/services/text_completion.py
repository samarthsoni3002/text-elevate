from transformers import AutoTokenizer, AutoModelForCausalLM

from app.core.config import COMPLETION_MODEL_NAME

tokenizer = None
model = None

def get_completion_model():
    global tokenizer, model
    if tokenizer is None:
        tokenizer = AutoTokenizer.from_pretrained(COMPLETION_MODEL_NAME)
    if model is None:
        model = AutoModelForCausalLM.from_pretrained(COMPLETION_MODEL_NAME)
    return tokenizer, model

def generate_completion(text: str, max_tokens: int = 20):
    tokenizer, model = get_completion_model()
    inputs = tokenizer.encode(text, return_tensors="pt")
    outputs = model.generate(
        inputs,
        max_length=inputs.shape[1] + max_tokens,
        do_sample=True,
        top_k=50,
        top_p=0.95,
        temperature=0.8,
        num_return_sequences=1
    )
    completion = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return completion[len(text):].strip()
