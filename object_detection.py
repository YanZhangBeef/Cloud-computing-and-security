# import the necessary packages
import base64
import numpy as np
import sys
import time
import cv2
import os

# construct the argument parse and parse the arguments
confthres = 0.3
nmsthres = 0.1

def get_labels(labels_path):
    # load the COCO class labels our YOLO model was trained on
    lpath=os.path.sep.join([yolo_path, labels_path])

    print(yolo_path)
    LABELS = open(lpath).read().strip().split("\n")
    return LABELS


def get_weights(weights_path):
    # derive the paths to the YOLO weights and model configuration
    weightsPath = os.path.sep.join([yolo_path, weights_path])
    return weightsPath

def get_config(config_path):
    configPath = os.path.sep.join([yolo_path, config_path])
    return configPath

def load_model(configpath,weightspath):
    # load our YOLO object detector trained on COCO dataset (80 classes)
    print("[INFO] loading YOLO from disk...")
    net = cv2.dnn.readNetFromDarknet(configpath, weightspath)
    return net

def do_prediction(image,net,LABELS):

    (H, W) = image.shape[:2]
    # determine only the *output* layer names that we need from YOLO
    ln = net.getLayerNames()
    # ln = [ln[i[0] - 1] for i in net.getUnconnectedOutLayers()]
    ln = [ln[i - 1] for i in net.getUnconnectedOutLayers()]

    # construct a blob from the input image and then perform a forward
    # pass of the YOLO object detector, giving us our bounding boxes and
    # associated probabilities
    blob = cv2.dnn.blobFromImage(image, 1 / 255.0, (416, 416),
                                 swapRB=True, crop=False)
    net.setInput(blob) 
    start = time.time()
    layerOutputs = net.forward(ln)
    #print(layerOutputs)
    end = time.time()

    # show timing information on YOLO
    print("[INFO] YOLO took {:.6f} seconds".format(end - start))

    # initialize our lists of detected bounding boxes, confidences, and
    # class IDs, respectively
    boxes = []
    confidences = []
    classIDs = []

    # loop over each of the layer outputs
    for output in layerOutputs:
        # loop over each of the detections
        for detection in output:
            # extract the class ID and confidence (i.e., probability) of
            # the current object detection
            scores = detection[5:]
            # print(scores)
            classID = np.argmax(scores)
            # print(classID)
            confidence = scores[classID]

            # filter out weak predictions by ensuring the detected
            # probability is greater than the minimum probability
            if confidence > confthres:
                # scale the bounding box coordinates back relative to the
                # size of the image, keeping in mind that YOLO actually
                # returns the center (x, y)-coordinates of the bounding
                # box followed by the boxes' width and height
                box = detection[0:4] * np.array([W, H, W, H])
                (centerX, centerY, width, height) = box.astype("int")

                # use the center (x, y)-coordinates to derive the top and
                # and left corner of the bounding box
                x = int(centerX - (width / 2))
                y = int(centerY - (height / 2))

                # update our list of bounding box coordinates, confidences,
                # and class IDs
                boxes.append([x, y, int(width), int(height)])

                confidences.append(float(confidence))
                classIDs.append(classID)

    # apply non-maxima suppression to suppress weak, overlapping bounding boxes
    idxs = cv2.dnn.NMSBoxes(boxes, confidences, confthres,
                            nmsthres)

    # TODO Prepare the output as required to the assignment specification
    # ensure at least one detection exists

    data_list = [] #store the detected result 

    if len(idxs) > 0:
        # loop over the indexes we are keeping  
        for i in idxs.flatten():
            #create a dictionary and put the data of image in it.
            if confidences[i] > 0.4:  #confidence equals accuracy
                data_list.append(LABELS[classIDs[i]])   
    
    
            image_data = {
                "label":LABELS[classIDs[i]],    
                "accuracy":confidences[i],   #accuracy:confidences[i]
                "rectangle":{             #sample answer is detected item:person, accuracy:0.9833723306655884, X:73, Y:13, width:121, height:144
                    "height": boxes[i][3],
                    "left": boxes[i][0],         #left equals x
                    "top": boxes[i][1],          #top equals y
                    "width": boxes[i][2]
                }
            }


        return data_list

        #don't need to print the data.
            # print("detected item:{}, accuracy:{}, X:{}, Y:{}, width:{}, height:{}".format(LABELS[classIDs[i]],
            #                                                                                  confidences[i],
            #                                                                                  boxes[i][0],
            #                                                                                  boxes[i][1],
            #                                                                                  boxes[i][2],
            #                                                                                  boxes[i][3]))


## argument
# if len(sys.argv) != 3:
#     raise ValueError("Argument list is wrong. Please use the following format:  {} {} {}".
#                      format("python iWebLens_server.py", "<yolo_config_folder>", "<Image file path>"))


#yolo_path  = str(sys.argv[1])  #path is not defined is this assignment

#the document and file name 
yolo_path="/opt/yolo_configs"

## Yolov3-tiny versrion
labelsPath="coco.names"
cfgpath="yolov3-tiny.cfg"
wpath="yolov3-tiny.weights"

Lables=get_labels(labelsPath)
CFG=get_config(cfgpath)
Weights=get_weights(wpath)


def read64(base64_string):
    nparr = np.fromstring(base64.b64decode(base64_string),np.unit8)
    img = cv2.imdecode(nparr,cv2.IMREAD_COLOR)
    return img



#TODO, you should  make this console script into webservice using Flask
def main():
    try:
        imagefile = str(sys.argv[2])
        img = cv2.imread(imagefile)
        npimg=np.array(img)
        image=npimg.copy()  
        image=cv2.cvtColor(image,cv2.COLOR_BGR2RGB)
        # load the neural net.  Should be local to this method as its multi-threaded endpoint
        nets = load_model(CFG, Weights)
        do_prediction(image, nets, Lables)


    except Exception as e:

        print("Exception  {}".format(e))

def main_image_detection(base64_encoded):
    print("Detecting.....")
    numpy_array = np.fromstring(base64.b64decode(base64_encoded),np.uint8)  
    #create a new 1-D array initialized from raw binary or text data in a string    (8bit)

    #put String decode into array 
    image_code = cv2.imdecode(numpy_array,cv2.IMREAD_COLOR) 
    #imdecode means reading an image from a buffer in memory 
    #IMREAD_COLOR Convert the image to a 3-channel BGR color image
    npimg=np.array(image_code)
    image=npimg.copy()  
    image=cv2.cvtColor(image,cv2.COLOR_BGR2RGB)
    # load the neural net.  Should be local to this method as its multi-threaded endpoint
    nets = load_model(CFG, Weights)
    return do_prediction(image, nets, Lables)





if __name__ == '__main__':
    ## argument
    if len(sys.argv) != 3:
        raise ValueError("Argument list is wrong. Please use the following format:  {} {} {}".
                      format("python iWebLens_server.py", "<yolo_config_folder>", "<Image file path>"))
    main_image_detection()
