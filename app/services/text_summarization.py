from transformers import AutoTokenizer, AutoModelForSeq2SeqLM


tokenizer = AutoTokenizer.from_pretrained("t5-small")
model = AutoModelForSeq2SeqLM.from_pretrained("t5-small")

def generate_summary(text: str, max_tokens: int = 1000, min_tokens: int = 30) -> str:

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
