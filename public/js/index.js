//load musics into the dropdown when window load

window.onload = function(){

    songItems = [
        {
            name : "inochi-no-namae",
            path : "audios/inochi-no-namae.mp3"
        },
        {
            name : "senbonzakura",
            path : "audios/senbonzakura.mp3"
        },
        {
            name : "time-to-love",
            path : "audios/time-to-love.mp3"
        },
        {
            name : "sparkle",
            path : "audios/sparkle.mp3"
        }
    ];
    localStorage.setItem("songs", JSON.stringify(songItems));

    console.log(JSON.stringify(songItems));


    //set playPause to paused state

    localStorage.setItem("playPause","Pause");
}


function set_time(){
    let date = new Date();
    let time_str = ('0'+date.getHours()).slice(-2) + ':' + ('0'+date.getMinutes()).slice(-2) + ':' + ('0'+date.getSeconds()).slice(-2);
    document.getElementById("time").innerText = time_str;
}

function update(){
    if (localStorage.getItem("ItemsJson") == null){
        itemsArray = [];
        localStorage.setItem("ItemsJson",JSON.stringify(itemsArray));
    }
    else{
        itemsArrayStr = localStorage.getItem("ItemsJson");
        itemsArray = JSON.parse(itemsArrayStr);
    }


    //populate table
    let tasklist = document.getElementById("tasklist");
    let str = "";

    let searchvalue = document.getElementById("searchbar").value;

    itemsArray.forEach((element,index) => {

        if (element[0].includes(searchvalue)){


        str += `
        <div class="listelement border border-light border-2">
                    <div class="tasktitle">${element[0]}</div>
                    <div class="buttons">
                    <button class = "delete btn btn-success" data-bs-toggle="modal" data-bs-target="#viewModal${index}"">View</button>
                    <button class = "delete btn btn-secondary" onclick = "deleteItem(${index})">Delete</button>
                    </div>    
        </div>
        <div class="modal fade" id="viewModal${index}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Task Details</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card w-100">
                <div class="card-body">
                <h5 class="card-title">${element[0]}</h5>
                <p class="card-text">${element[1]}</p>
                </div>
            </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>

        `
        }
    });


    tasklist.innerHTML = str;

    // change no of tasks number
    document.getElementById("no_of_items").innerHTML = `No of tasks: ${itemsArray.length}`;
}

//Play a song 


function playPause(songObject){
    play_status = localStorage.getItem("playPause");

    if (play_status == "Pause"){
        play_status = "Play";
        localStorage.setItem("playPause",play_status);
        document.getElementById("playButton").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
        </svg>`;
        window.audio.play();
        console.log(play_status);
    }
    else{
        play_status = "Pause";
        localStorage.setItem("playPause",play_status);
        document.getElementById("playButton").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-pause" viewBox="0 0 16 16">
        <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
      </svg>`;
        window.audio.pause();
        console.log(play_status);
    }
}

//function to set active song
function activeSong(itemIndex){
    
    //checker function
    console.log("song playing!");


    //load songs
    songItemsStr = localStorage.getItem("songs");
    songItems = JSON.parse(songItemsStr);

    //access song by index
    currSong = songItems[itemIndex] // object of current song
    localStorage.setItem("currSong",JSON.stringify(currSong));
    if (window.audio == null){window.audio = new Audio(currSong["path"]);}
    else{
        window.audio.pause();
        window.audio = null;
        window.audio = new Audio(currSong["path"]);
    }

    //change song name title
    document.getElementById("song-name").innerText = currSong["name"];
}

function deleteItem(itemIndex){
    console.log("Deleted",itemIndex);

    itemsArrayStr = localStorage.getItem("ItemsJson");
    itemsArray = JSON.parse(itemsArrayStr);

    itemsArray.splice(itemIndex,1);

    localStorage.setItem("ItemsJson",JSON.stringify(itemsArray));
    update();

}


//used to render song list
function showSongs(){

    songItemsStr = localStorage.getItem("songs");
    songItems = JSON.parse(songItemsStr);

    str = ""

    songItems.forEach((element,index) => {
        str += `<li><a class="dropdown-item" href="#" id = "index" onclick = "activeSong(${index})">${element["name"]}</a></li>`
    });


    document.getElementById("songList").innerHTML = str;
    
}

function getAndUpdate(){
    console.log("Clicked!");

    let title = document.getElementById("tasktitle").value;
    let desc = document.getElementById("taskdesc").value;

    if (localStorage.getItem("ItemsJson")==null){
        itemsArray = [];
        itemsArray.push([title,desc]);
        localStorage.setItem("ItemsJson",JSON.stringify(itemsArray));
    }
    else{
        itemsArrayStr = localStorage.getItem("ItemsJson");
        itemsArray = JSON.parse(itemsArrayStr);
        itemsArray.push([title,desc]);
        localStorage.setItem("ItemsJson",JSON.stringify(itemsArray));
    }

    update();

    document.getElementById("taskdetailsclose").click();
    //clearing task inputs after adding a task
    document.getElementById("tasktitle").value = "";
    document.getElementById("desc").value = "";
    
}



add = document.getElementById("add");
add.addEventListener("click",getAndUpdate)


update();

playButton = document.getElementById("playButton");
playButton.addEventListener("click",playPause);

dropdown = document.getElementById("dropdown");
dropdown.addEventListener("click", showSongs);


setInterval(set_time,1000);