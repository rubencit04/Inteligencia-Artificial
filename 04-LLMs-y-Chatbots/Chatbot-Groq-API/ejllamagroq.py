import os
from groq import Groq

#client = Groq(api_key="TU_GROQ_API_KEY")
client = Groq(

    api_key=os.environ.get("GROQ_API_kEY"),

)
completion = client.chat.completions.create(
    model="llama3-70b-8192",
    messages=[
        {
            "role": "user",
           "content": "Dame un esquema para una presentación de ingeniería del software\n"
        },
    ],
    temperature=1,
    max_tokens=1024,
    top_p=1,
    stream=True,
    stop=None,
)

for chunk in completion:
    print(chunk.choices[0].delta.content or "", end="")

