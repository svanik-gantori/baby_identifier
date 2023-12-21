img="";
status="";
objects=[];
function preload()
{
    img=loadImage('dog_cat.jpg');
    alarm=loadSound('alarm.mp3');
}

function setup()
{
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function start()
{
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function draw()
{
    image(video,0,0,380,380);
    if(status !="")
    {
        objectDetector.detect(video,gotResults);
        for(i=0; i<objects.length; i++)
        {
            r=random(255);
            g=random(255);
            b=random(255);
            document.getElementById("status").innerHTML="Objects are detected";
            document.getElementById("num").innerHTML="Number of objects: "+objects.length;
            fill(r,g,b);
            percentage=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percentage+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
           

        }
        if(objects[i]="person")
        {
            document.getElementById("status").innerHTML="Baby Detected";
            alarm.stop();
        }

        if(objects.length<1)
        {
            alarm.play();
        }
        
        else
        {
            document.getElementById("status").innerHTML="Baby not detected";
            alarm.play();
        }

        
    }
    
}

function modelLoaded()
{
    console.log("Model Loaded");
    status=true;
}

function gotResults(error,results)
{
    if(error)
    {
        console.error(error);
    }

    console.log(results); 
    objects=results;  
}

for(i=0; i<11; i++)
{
    console.log(i);
}