var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood, feedTheDog;
var fedTime, lastFed;
var foodObj;

//create feed and lastFed variable here
var feed, lastFeed


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedTheDog = createButton("Feed the dog");
  feedTheDog.position(700,50);
  feedTheDog.mousePressed(feedDog);


  addFood=createButton("Add Food");
  addFood.position(800,50);
  addFood.mousePressed(addFoods);

}

function draw() {
  background("yellow");
  foodObj.display();

  //write code to read fedtime value from the database 
  fedTime = database.ref("fedTime");
    fedTime.on("value",function(data){
        lastFed = data.val();
    });
  
 //write code to display text lastFed time here
 fill("black");
    textSize(20);

    if(lastFed >= 12) {
        text("Last Feed : " + lastFed + "PM", 250, 30);
    }
    else if(lastFed === 0) {
        text("Last Feed : 12 AM", 250, 30);
    }
    else {
        text("Last Feed : " + lastFed + "AM", 250, 30);
    }


 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  database.ref('/').update({
      Food: foodObj.getFoodStock(),
      fedTime: hour()
    });

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
