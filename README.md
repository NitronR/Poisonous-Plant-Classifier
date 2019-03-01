# Poisonous-Plant-Classifier
A web app that classifies an image into 8 categories of plants.

Took help from [this repository](https://github.com/shankarj67/Water-classifier-fastai) on Water classification.

Kaggle kernel. Used resnet18 model in deployment due to limitations of Heroku free.

Classification better with resnet50.

Used FastAI. Explain

Poisonous plants are dangerous for unsuspecting individuals such as children. Especially the plants that are common in backyards. There are many casualties due to lack of supervision of gardens in public and private areas.
One solution to this problem is image classification using deep learning. Keeping this in mind I made a custom data set of the poisonous plants that are common in our home area. I got a list of these from here:
https://www.goodhousekeeping.com/home/gardening/advice/g1174/deadly-poisonous-plants/
I have made the data set available on Kaggle:
https://lnkd.in/f4fQCEw
Using fastai, I have successfully created an Image classifier for classifying a plant's image into 8 categories of poisonous plants. The classifier have 98% accuracy on the current data set. Here is the Kaggle kernel:
https://lnkd.in/f9bDuRr
This is one of the first step towards the solution. Next I will make a web app for demonstrating the capabilities of the current model.
Any helpful tips are welcome :)