import zipfile
import os
import pandas as pd

extract_folder_path = fr'C:/Users/alaao/Downloads/extracted_files/'
'''
# Define the path to the uploaded zip file
general = fr"C:/Users/alaao/Downloads"
zip_file_path = [general+"/1.zip", general+"/2.zip", general+"/3.zip", general+"/4.zip", general+"/5.zip"]


# Create a directory to extract the zip file
os.makedirs(extract_folder_path, exist_ok=True)

for file in zip_file_path:

    # Extract the zip file
    with zipfile.ZipFile(file, 'r') as zip_ref:
        zip_ref.extractall(extract_folder_path)

'''


'''
# List the extracted files to understand the structure
extracted_files = os.listdir(extract_folder_path)
print(extracted_files)


# Define a dictionary to store the aggregated data for each round
round_data = {f'Round {i}': [] for i in range(1, 6)}

# Iterate through each file and aggregate the data
for file_name in extracted_files:
    file_path = os.path.join(extract_folder_path, file_name)
    excel_file = pd.ExcelFile(file_path)
    
    for sheet_name in excel_file.sheet_names:
        # Read the data for the current round
        df = excel_file.parse(sheet_name)
        
        # Add a column for the file name to keep track of the source
        df['Source'] = file_name
        
        # Append the data to the corresponding round in the dictionary
        round_data[sheet_name].append(df)

# Concatenate the data for each round
for round_name in round_data.keys():
    round_data[round_name] = pd.concat(round_data[round_name], ignore_index=True)
'''
    
# Create a new Excel writer object to save the aggregated data
output_file_path = fr'C:/Users/alaao/Downloads/extracted_files/aggregated_rounds.xlsx'


'''
with pd.ExcelWriter(output_file_path, engine='xlsxwriter') as writer:
    for round_name, data in round_data.items():
        data.to_excel(writer, sheet_name=round_name, index=False)
'''

r'''
import pandas as pd
from pymongo import MongoClient
import numpy as np




# Define the paths to your CSV files
csv_files = {
    #'Round 1': fr"C:\Users\alaao\Downloads\extracted_files\rounds\1.csv",
    #'Round 2': fr"C:\Users\alaao\Downloads\extracted_files\rounds\2.csv",
    #'Round 3': fr"C:\Users\alaao\Downloads\extracted_files\rounds\3.csv",
    'Round 5': fr"C:\Users\alaao\Downloads\extracted_files\rounds\5.csv",
}

# Connect to your MongoDB instance
client = MongoClient(os.environ['dbURI'])
db = client['database']

# Iterate through each CSV file and save it to a MongoDB collection
for round_name, csv_path in csv_files.items():
    # Read the CSV file into a DataFrame
    df = pd.read_csv(csv_path)
    
    # Convert the DataFrame to a list of dictionaries
    data = df.to_dict(orient='records')
    for i in range(len(data)):
        if data[i]['Has Preamble'] == 'Yes':
            data[i]['Question'] = data[i]['Preamble Text']+"\n\n"+data[i]['Question']
        data[i]['Subject'] = data[i]['Subject'].split(", ")
        data[i]["Question"] = data[i]["Question"].split("\n")
    # Insert the data into a MongoDB collection
    collection = db[round_name.replace(' ', '_').lower()]  # Collection names are typically lowercase
    collection.insert_many(data)

print("Data has been successfully inserted into MongoDB.")
'''

from dotenv import load_dotenv
load_dotenv()

'''
import requests
import json

def llm_api(input):    # Define the URL of the API endpoint
    url = "https://api-inference.huggingface.co/models/microsoft/Phi-3-mini-4k-instruct/v1/chat/completions"

    # Define the headers with the cookies
    headers = {
        "Content-Type": "application/json",
        "Cookie": os.environ["llm"]
    }

    # Define the payload for the request
    payload = {
        "model": "microsoft/Phi-3-mini-4k-instruct",
        "messages": [
            {'role': 'user', 'content': input}
        ],
        "parameters": {"temperature": 0},
        #"stream": True
    }

    # Make the request to the API endpoint
    response = requests.post(url, headers=headers, data=json.dumps(payload))#, stream=True

    return (response.json()['choices'][0]["message"]["content"])
print(llm_api("How are you?"))
'''

'''from transformers import AutoTokenizer, AutoModelForSequenceClassification
from torch.nn import functional as F

tokenizer = AutoTokenizer.from_pretrained("kortukov/answer-equivalence-bem")
model = AutoModelForSequenceClassification.from_pretrained("kortukov/answer-equivalence-bem")

question = "What is the position?"
reference = "$42 \mathrm{~cm}$"
candidate = "42 cm"

def tokenize_function(question, reference, candidate):
    text = f"[CLS] {candidate} [SEP]"
    text_pair = f"{reference} [SEP] {question} [SEP]"
    return tokenizer(text=text, text_pair=text_pair, add_special_tokens=False, padding='max_length', truncation=True, return_tensors='pt')

inputs = tokenize_function(question, reference, candidate)
out = model(**inputs)

prediction = F.softmax(out.logits, dim=-1).argmax().item()
print(prediction)'''

import requests
import json

def llm_api(input):    # Define the URL of the API endpoint
    url = "https://hflink-eastus-models-playground.azure-api.net/models/Phi-3-small-128k-instruct/score"

    data = {
        "messages": [
            {'role': 'user', 'content': input}
        ],
        "max_tokens": 50000,
        "temperature": 0.7,
        "top_p": 1,
    }

    response = requests.post(url, json=data)
    for i in response:
        print(i)
    if response.status_code == 200:
        response_data = response.json()
        return response_data['choices'][0]['message']['content']
    else:
        return f'Request failed with status code: {response.status_code}'
    
print(llm_api("hey"))