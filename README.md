# controller-pannel

in this controller panel i used node js to handle the backend while i used
javascript to handle smooth animitions with the GSAP api, it has a container with the 5 buttons
and a side panel that expands or closes as you click the expand icon (<<) , in the side panel you will find
a history of presssed buttons and their directions, and the time they were pressed.
# Task1
## a photo of the site
![image](https://github.com/faresAlharbi0/controller-pannel/assets/122399786/b221a357-aeca-455d-9d8a-c393f6f0526c)

## example of last direction entered in the database
![image](https://github.com/faresAlharbi0/controller-pannel/assets/122399786/dd80e52a-f406-4949-9830-fa6e04b6e165)

## example of visiting localhost:2500/retrive to request a get response with the last entered direction
![image](https://github.com/faresAlharbi0/controller-pannel/assets/122399786/02de0b2f-66ba-43a3-bd44-8252a192c441)

# task2

## settings modal dialogue overlay to configure the distance of the direction the robot will take
### the overlay will open when you click on the settings icon, and will closes when you click the save button
![image](https://github.com/faresAlharbi0/controller-pannel/assets/122399786/9c38220e-2b34-4c0e-bf5f-3b880cd29f22)

## simple path tracer map for the robot movments
![image](https://github.com/faresAlharbi0/controller-pannel/assets/122399786/ee082430-1538-4d7d-a8f7-7a22d205b04a)



## a demo
### visit https://faresalharbi0.github.io/controller-pannel/website/html/index.html to see a demo with no backend functionality

# instruction on how to run the website/important dependencies
1- node js/npm need to be installed.
2- xmapp need to be installed and run the apache/mysql localhosts in the application gui.

3- in the server.js folder, open the terminal and write to initilize the dependencies file:
```
$ npm init -y
```
4- install the following dependencies in the terminal
```
$ npm install express
$ npm install mysql2
$ npm i --save-dev nodemon
```
5-in package.json make sure to add the script: ```"dev" :"nodemon server.js"``` like shown in the photo:
![image](https://github.com/faresAlharbi0/controller-pannel/assets/122399786/693c6695-dbfe-4261-8665-3b90f6b96829)


6- in the terminal type ``` $ npm run dev``` and everything should be running correctly


7- go to localhost:2500/html/index.html to run the website or go to localhost:2500/retrive to retrive the last database entery from your own database server, make sure to match it with the quereies in the server.js file
