#import the required libraries
from TTS.tts.configs.vits_config import VitsConfig
from TTS.tts.models.vits import Vits
from TTS.utils.audio.numpy_transforms import save_wav
import numpy as np
import os
from dotenv import load_dotenv
load_dotenv()

# load the model's config file
qm_config=VitsConfig()
qm_config.load_json(os.environ['pathtomodel']+'\quizmistress config.json')
qm_config.model_args.speakers_file= os.environ['pathtomodel']+"\quizmistress.pth"
# load the model
qm_model=Vits.init_from_config(qm_config)
qm_model.load_onnx(os.environ['pathtomodel']+'\quizmistress.onnx')



def text_to_speech(text, path_to_save):
    '''
        function for text to speech conversion. Give it the text and the path to save, e.g. text = "Hi", path_to_save="output.wav"
    '''
    text= text
    out_path=  path_to_save
    
    # generate the speech
    text_inputs = np.asarray(
        qm_model.tokenizer.text_to_ids(text, language="en"),
        dtype=np.int64,
    )[None, :]

    audio = qm_model.inference_onnx(text_inputs,speaker_id=0)

    # save the synthesized speech
    save_wav(wav=audio[0], path=out_path,sample_rate=22050)

#test
#text_to_speech(r"$\mathrm{Mg}^{2+} / \mathrm{Mg},-2.38 \mathrm{~V} ; \quad \mathrm{Al}^{3+} / \mathrm{Al},-1.66 \mathrm{~V}$", "math.wav")


import speech_recognition as sr

# Initialize recognizer class (for recognizing the speech)
recognizer = sr.Recognizer()

def stt(path_to_file):

    '''
    speech to text function. Takes the path to the file as argument and then returns the text as string.
    '''
    # Define the path to your audio file
    audio_file_path = path_to_file  # Replace with your actual audio file path

    # Load the audio file
    with sr.AudioFile(audio_file_path) as source:
        # Listen to the audio file and store it in audio_data
        audio_data = recognizer.record(source)
    text = recognizer.recognize_google(audio_data, language="en-GH")
    return text
print(stt(fr"E:\AfricAIED\auth.wav"))
    