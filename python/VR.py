import sys
import speech_recognition as sr # Initialize recognizer class
# import the modules
from os import path
from pydub import AudioSegment
input = "./uploads/audio"
output = "./uploads/audio"
#conversion 
audio = AudioSegment.from_file(input)
audio.export(output, format="wav")                                     
r = sr.Recognizer()# audio object                                                         
speechFile = sr.AudioFile("./uploads/audio")
#read audio object and transcribe
with speechFile as source:
    speechFile = r.record(source)                  
    data = r.recognize_google(speechFile,language="ar-SA")
print(data)
sys.stdout.flush()