import os
import json
import requests

# ========================================

GOOGLE_API_KEY = None
if "GOOGLE_API_KEY" in os.environ:
    GOOGLE_API_KEY = os.environ["GOOGLE_API_KEY"]

if GOOGLE_API_KEY is None:
    raise ValueError("Please set the GOOGLE_API_KEY environment variable")

LOCATION = "25.0212615,121.5424523" # 台大經緯度
RADIUS = "100"

url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={LOCATION}&radius={RADIUS}&key={GOOGLE_API_KEY}"

# ========================================

text = requests.get(url).text
data = json.loads(text)

print(data)
with open("out.json", "w") as fout:
    json.dump(data, fout, ensure_ascii=False)
