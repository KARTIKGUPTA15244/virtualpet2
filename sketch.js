//Create variables here
var dog,happydog,database,foodS,foodStock;
var feed,addfood;
var fedTime,lastfed;
var foodObj;
function preload()
{
dogImg = loadImage("dogImg.png")
happydogimg = loadImage("dogImg1.png")  

}


function setup() {
  createCanvas(1000, 500);
  foodObj = new Foods();
  dog= createSprite(250,350,10,60)
  dog.addImage(dogImg)
  dog.scale = (0.2)
  database = firebase.database();
  feed = createButton("Feed the dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addfood = createButton("Add Food")
  addfood.position(800,95)
  addfood.mousePressed(addFoods)
}


function draw() {  
background(46, 139, 87)

foodObj.display()
fedTime = database.ref("FeedTime")
fedTime.on("value", function(data){
  lastfed = data.val()
})
fill(255)
textSize(20)

if(lastfed>=12){
  text("last feed : "+ lastfed%12+" PM",350,30)
}
else if(lastfed==0){
  text("last feed : 12 AM",350,30)
}
else{
  text("last feed : "+lastfed+" AM",350,30)
}





  

  drawSprites();
}
function readStock(data){
foodS = data.val()
foodObj.updateFoodStock(foodS)
}
function feedDog(){
  dog.addImage(happydogimg)
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref("/").update({
    food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref("/").update({
    Food:foodS
  })
}
