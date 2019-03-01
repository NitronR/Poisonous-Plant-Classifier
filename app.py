from __future__ import division, print_function
# coding=utf-8
import sys
import os
import glob
import re
from pathlib import Path

# Import fast.ai Library
from fastai import *
from fastai.vision import *

# Flask utils
from flask import Flask, redirect, url_for, request, render_template
from werkzeug.utils import secure_filename
# from gevent.pywsgi import WSGIServer

# Define a flask app
app = Flask(__name__)

# Model saved with Keras model.save()

path = Path("")
classes = ['lilies', 'rhubarb', 'oleander', 'castor_oil_plant', 'dieffenbachia', 'foxglove', 'wisteria', 'lily_of_the_valley']
data2 = ImageDataBunch.single_from_classes(path, classes, tfms=get_transforms(), size=299).normalize(imagenet_stats)
learn = create_cnn(data2, models.resnet18, pretrained=False)
learn.load('res18-unfine')


def model_predict(img_path):
    """
       model_predict will return the preprocessed image
    """
    img = open_image(img_path)
    pred_class, pred_idx, outputs = learn.predict(img)
    result = str(pred_class)
    if(outputs[pred_idx] <= 0.5):
        result = 'Not sure what this is!'
    return result


@app.route('/', methods=['GET'])
def index():
    # Main page
    return render_template('index.html')


@app.route('/predict', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        # Get the file from post request
        f = request.files['file']

        # Save the file to ./uploads
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(
            basepath, 'uploads', secure_filename(f.filename))
        f.save(file_path)

        # Make prediction
        preds = model_predict(file_path)
        os.remove(file_path)
        return preds
    return None


if __name__ == '__main__':
    
    app.run(debug=True)

