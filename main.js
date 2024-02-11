var video =""
var status1 =""
var objects = []
function setup()
{
 canvas = createCanvas(480,300);
 canvas.center();
 video = createCapture(VIDEO);
 video.size(500,300);
 video.hide();
}
function draw()
{
image (video,0,0,480,300);
if (status1 != "")
{
 objectDetector.detect(video,gotResults);
 for ( index = 0; index < objects.length; index++)
 {
 document.getElementById("status").innerHTML = "status : objects detected"
    fill("red");
    percent=floor(objects [index].confidence*100);
    text(objects[index].label + " " + percent + "%" , objects[index].x , objects[index].y);
    noFill();
    stroke("black");
    rect(objects[index].x , objects[index].y , objects[index].width , objects[index].height);

    if (objects[index].label == object_name)
    {
    objectDetector.detect(gotResults);
    document.getElementById("object_status").innerHTML = object_name + " found" 
    synth = window.speechSynthesis;
    utterthis =  new SpeechSynthesisUtterance(object_name + "found");
    synth.speak(utterthis);
    } else 
    {
      document.getElementById("object_status").innerHTML = object_name + " not found"; 
    }
    
 }  
}
}
function start()
{
objectDetector = ml5.objectDetector('cocossd',ModelLoaded) ;
document.getElementById("status").innerHTML = "Status : Detecting Object";
object_name = document.getElementById("object_name").value
}
function ModelLoaded()
{
console.log("model loaded successfully")
status1 = true 
}
function gotResults(error, results)
{
if (error) 
{
  console.log(error);
}    
console.log(results);
objects=results;
}