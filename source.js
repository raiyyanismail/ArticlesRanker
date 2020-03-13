function loadDoc() {
reload(); 
// once all articles read then rank button appears
if (count >=4 )
    {
        button.style.display = "block";
    }
else 
    {
        button.style.display = "none";
    }    
    
 table.style.display = "none";    
    
//the source of each article
var arts = ["article-1.json", "article-2.json", "article-3.json","article-4.json","article-5.json"];    
document.getElementById("next").innerHTML = "Next Article";      
var ajaxhttp = new XMLHttpRequest();
var src = arts[artDisp];
ajaxhttp.open("GET", src, true);
ajaxhttp.setRequestHeader("content-type","application/json");
ajaxhttp.onreadystatechange = function(){
    if (ajaxhttp.readyState == 4 && ajaxhttp.status == 200)
    {
        //initialise selected JSON file as js object
        var jArt = JSON.parse(ajaxhttp.responseText);
        console.log(jArt);
        document.getElementById("title").innerHTML = jArt.title;
        
        //work out how many sections in article
        var size = jArt.body.length;
        console.log(size);
        
        //display article
        for (var i = 0; i < size; i++)
        {
            //different methods to display different types of data 
            if (jArt.body[i].type == "heading")
            {
                var head = document.createElement("h3");
                var node = document.createTextNode(jArt.body[i].model.text);
                head.appendChild(node);
                var element = document.getElementById("div1");
                element.appendChild(head);
            }
            
            else if (jArt.body[i].type == "paragraph")
            {
                var para = document.createElement("p");
                var node = document.createTextNode(jArt.body[i].model.text);
                para.appendChild(node);
                var element = document.getElementById("div1");
                element.appendChild(para);
            }
            
            else if (jArt.body[i].type == "image")
            {
                var img = document.createElement("img"); 
                img.src = jArt.body[i].model.url;
                img.setAttribute("height", jArt.body[i].model.height);
                img.setAttribute("width", jArt.body[i].model.width);
                img.setAttribute("alt", jArt.body[i].model.altText);
                var element = document.getElementById("div1");
                element.appendChild(img);
                
            }
            
            else if (jArt.body[i].type == "list")
            {
                if (jArt.body[i].model.type == "unordered")
                {
                    var list = document.createElement("ul");
                    
                    var listSize = jArt.body[i].model.items.length;
                    console.log(listSize);
                    
                    for (var j = 0; j < listSize; j++)
                    {
                    var item = document.createElement("li");
                    var node = document.createTextNode(jArt.body[i].model.items[j]);
                    item.appendChild(node);
                    list.appendChild(item);  
                    }
                    
                    var element = document.getElementById("div1");
                    element.appendChild(list);
                    
                }
                
                
                if (jArt.body[i].model.type == "ordered")
                {
                    var list = document.createElement("ol");
                    
                    var listSize = jArt.body[i].model.items.length;
                    console.log(listSize);
                    
                    for (var j = 0; j < listSize; j++)
                    {
                    var item = document.createElement("li");
                    var node = document.createTextNode(jArt.body[i].model.items[j]);
                    item.appendChild(node);
                    list.appendChild(item);  
                    }
                    
                    var element = document.getElementById("div1");
                    element.appendChild(list);
                    
                }
                
                
            }
            
        }
        
    }
    
}
    ajaxhttp.send();
    
    artDisp++;
    count++;
    //resets cycle of articles after all 5 shown
    if (artDisp == 5)
    {
        artDisp = 0;
    }
    
}


function loadRank()
{
    reload();
    document.getElementById("title").innerHTML = "Rank the articles you just read out of 5:";
    table.style.display = "block";
    button.style.display = "none";
    document.getElementById("next").innerHTML = "Return to Articles"; 
    
    
}




function reload()
{
    document.getElementById("div1").innerHTML = "";
}

// counts how many articles have been shown so far
var artDisp = 0;
// counts how many times button is pressed
var count = 0;

var button = document.getElementById("rate");
var table = document.getElementById("rank");
