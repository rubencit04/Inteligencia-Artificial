from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("bert-base-cased")

mi_texto = "Today is a good day"
tokens = tokenizer.tokenize(mi_texto)

print(tokens)