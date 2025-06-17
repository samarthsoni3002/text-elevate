from transformers import AutoTokenizer, AutoModelForSeq2SeqLM


tokenizer = AutoTokenizer.from_pretrained("vennify/t5-base-grammar-correction")
model = AutoModelForSeq2SeqLM.from_pretrained("vennify/t5-base-grammar-correction")

def correct_grammar(text: str, max_tokens: int = 128) -> str:
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
