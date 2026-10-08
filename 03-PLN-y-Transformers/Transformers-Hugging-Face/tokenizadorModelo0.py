from transformers import GPT2Tokenizer

tokenizer = GPT2Tokenizer.from_pretrained("gpt2")

mi_texto = "How are you"

token_ids = tokenizer.encode(mi_texto)

print(token_ids)

print("$$$$$$$$$$$$$$$$")

tokens = [tokenizer.decode([token]) for token in token_ids]

print(tokens)