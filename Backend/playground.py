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


import pandas as pd
from pymongo import MongoClient
import numpy as np
from dotenv import load_dotenv
load_dotenv()



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