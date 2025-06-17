from transformers import AutoTokenizer, AutoModelForCausalLM

tokenizer = AutoTokenizer.from_pretrained("distilgpt2")
model = AutoModelForCausalLM.from_pretrained("distilgpt2")

def generate_completion(text: str, max_tokens: int = 20):
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
