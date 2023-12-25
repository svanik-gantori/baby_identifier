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
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotResults);
        for(i=0; i<objects.length; i++)
        {
           
            document.getElementById("status").innerHTML="Objects are detected";
            fill(r,g,b);
            percentage=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percentage+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i]=="person")
            { document.getElementById("num").innerHTML="Baby Detected";
             alarm.stop(); 
             console.log("stop");
           } 
           else 
           { document.getElementById("num").innerHTML="Baby not detected";
            alarm.play();
            console.log("play");
            } 
            if(objects.length==0)
             { 
                document.getElementById("num").innerHTML="Baby not detected";
               alarm.play(); 
               console.log("because of length, play");
           }

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

