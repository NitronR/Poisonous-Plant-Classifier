# Poisonous-Plant-Classifier
Poisonous plants are dangerous for unsuspecting individuals such as children. Especially the plants that are common in backyards. There are many casualties due to lack of supervision of gardens in public and private areas.

One solution to this problem is image classification using deep learning. Keeping this in mind I made a custom data set of the poisonous plants that are common in our home area. I got a list of these from [here](https://www.goodhousekeeping.com/home/gardening/advice/g1174/deadly-poisonous-plants/).

I have made the data set available [on Kaggle](https://www.kaggle.com/nitron/poisonous-plants-images).

Using fastai, I have successfully created an Image classifier for classifying a plant's image into 8 categories of poisonous plants. These are: lilies, rhubarb, oleander, castor oil plant, dieffenbachia, foxglove, wisteria and lily of the valley. Create a Convolutional Neural Network and improved the model through interpretation as well as fine tuning. The classifier have 93% accuracy on the current test set. [Here](https://www.kaggle.com/nitron/poisonous-plant-classifier-renset18) is the Kaggle kernel.

This repository is for the web app that can take an image file as input and classifies it into the 8 categories of plants mentioned above using a resnet18 model.

I took help from [this repository](https://github.com/shankarj67/Water-classifier-fastai) on Water classification that provides the boiler plate code to deploy a fastai model on heroku.

I loaded weights from the Kaggle kernel into the web app. I used resnet18 model in deployment due to limitations of Heroku free. Resnet50 gave better results on Kaggle.

Any helpful tips are welcome :)