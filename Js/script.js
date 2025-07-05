let prevsong;
let songs;
let currfolder;
async function getsong(folder) {
    let a = await fetch(`/${folder}/`)
    currfolder = folder;
    let response = await a.text();
    let div = document.createElement('div');
    div.innerHTML = response;
    let as = div.getElementsByTagName('a');
    songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) songs.push(element.href)

    }

    //By default the first song should be playing

    playmusic(decodeURIComponent(songs[0].split(`/${currfolder}/`)[1].replace(".mp3", "")), true)
    //Show all the songs in the Playlist....

    let songul = document.querySelector(".songlistcont").getElementsByTagName("ul")[0];
    songul.innerHTML=""
    for (const song of songs) {
        songul.innerHTML = songul.innerHTML + ` <li class="song br-8 flex p-10 items-center cursor-pointer">
                                <img class="invert" src="assets/music.svg" alt="">
                                <div class="info flex f-col justify-center">
                                    <div class="songname">${decodeURIComponent(song.split(`/${currfolder}/`)[1].replace(".mp3", ""))}</div>
                                    <div class="artist hover">Sayan</div>
                                </div>
                                <div class="playnow flex items-center">
                                    <!-- <span>Play Now</span> -->
                                     <img  class="play invert" src="assets/Play.svg" alt="">
                                </div> </li>`;
    }

    //Attach an event listener to each song
    prevsong = document.querySelector(".play");
    Array.from(document.querySelector(".songlist").getElementsByClassName("song")).forEach(song => {
        song.addEventListener("click", (event) => {
            //Close the prevone;
            let img = song.querySelector(".play");
            if (prevsong.src !== img.src) {
                if (currentsong) currentsong.pause();
                prevsong.src = "assets/Play.svg";
                play.src = "assets/Play.svg";
            }
            if (img.src.includes("assets/Play.svg")) {
                img.src = "assets/pause.svg";
                play.src = "assets/pause.svg";
                prevsong = img;

                //checking wheather current song is paused and if yes resume it instead of restart it..
                let srcc = decodeURIComponent(currentsong.src.split(`/${currfolder}/`)[1].replace(".mp3", ""))
                if (srcc == song.querySelector(".songname").innerHTML && currentsong.paused) currentsong.play();
                else playmusic(song.querySelector(".songname").innerHTML)
            }
            else {
                img.src = "assets/Play.svg";
                play.src = "assets/Play.svg";
                prevsong = img;
                if (currentsong) currentsong.pause();
            }
        })

    });


     //listen for metadata update
    currentsong.addEventListener("loadedmetadata", () => {
        document.querySelector(".endtime").innerHTML = formatTime(currentsong.duration);
        document.querySelector(".starttime").innerHTML = formatTime(currentsong.currentTime);
    })


    return songs;
}


const playmusic = (track, pause = false) => {
    currentsong.src = `/${currfolder}/` + track + ".mp3";
    if (!pause) {
        currentsong.play();
        play.src = "assets/pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = track;
}
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    // Pad with 0 if less than 10
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

let currentsong = new Audio();

async function Displayallbums() {
    let a = await fetch(`/songs/`)
    let response = await a.text();
    let div = document.createElement('div');
    div.innerHTML = response;
    let array=Array.from(div.getElementsByTagName("a"));
    for (let index = 0; index < array.length; index++) {
        const e = array[index];
        if(e.href.includes("/songs/")){
           let folder = e.href.split("/songs/")[1];
           //Get the meta data of the folder
<<<<<<< HEAD
            let a = await fetch(`songs/${folder}/info.json`)
=======
            let a = await fetch(`/songs/${folder}/info.json`)
>>>>>>> e8c556c9caf428003a4fcdc335a0904d2eaddeab
           let response = await a.json();
           document.querySelector(".cards").innerHTML=document.querySelector(".cards").innerHTML+
           ` <div data-folder="${folder}" class="card br-8 p-10 m-10\  cursor-pointer">
                        <div class="imagecont br-8">
                            <img class="svg" src="assets/spotifylogo.svg" alt="">
                            <img class="br-8 contentimg"
                                src="/songs/${folder}/cover.jpg" alt="">
                        </div>
                        <div class="text">
                            <h2>${response.title}</h2>
                           <p class=" c-grey">${response.description}</p>
                        </div>
                        <div  class="playsvg trans-3">
                            <svg fill="#3ab738" height="45px" width="45px" version="1.1" id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 300 300" xml:space="preserve" transform="matrix(1, 0, 0, 1, 0, 0)"
                                stroke="#3ab738">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <g>
                                        <g>

                                            <path fill="#1fdf64"
                                                d="M150,0C67.157,0,0,67.162,0,150c0,82.841,67.157,150,150,150s150-67.159,150-150C300,67.162,232.843,0,150,0z">
                                            </path>

                                            <path fill="#000000" d="M205.846,158.266l-86.557,49.971c-1.32,0.765-2.799,1.144-4.272,1.144c-1.473,0-2.949-0.379-4.274-1.144 
                    c-2.64-1.525-4.269-4.347-4.269-7.402V100.89c0-3.053,1.631-5.88,4.269-7.402c2.648-1.528,5.906-1.528,8.551,0l86.557,49.974 
                    c2.645,1.53,4.274,4.352,4.269,7.402C210.12,153.916,208.494,156.741,205.846,158.266z"></path>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </div>
`
        }
    }
}
async function main() {
      
    // Getting all the songs....
    
    await getsong("songs/ncs");
    //Display all the albums on the songs
    await Displayallbums();
    //Attach an event listener to play  
    play.addEventListener("click", () => {
        if (currentsong) {
            if (currentsong.paused) {
                currentsong.play();
                play.src = "assets/pause.svg";
                prevsong.src = "assets/pause.svg";
            }
            else {
                play.src = "assets/Play.svg";
                prevsong.src = "assets/Play.svg";
                currentsong.pause();
            }
        }

    })

   
    //listen for time update
     currentsong.addEventListener("timeupdate", () => {
       document.querySelector(".starttime").innerHTML = formatTime(currentsong.currentTime);
       document.querySelector(".coloredpart").style.width = (currentsong.currentTime / currentsong.duration) * 100 + "%";
        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";

     })

    //add a eventlistener to seekbar
    document.querySelector(".seekbar").addEventListener("click", (e) => {
        let seekbar = e.currentTarget;
        let rect = seekbar.getBoundingClientRect();
        let clickPosition = e.clientX - rect.left;
        let percentage = (clickPosition / rect.width) * 100;
        document.querySelector(".circle").style.left = percentage + "%";
        document.querySelector(".coloredpart").style.width = percentage + "%"
        currentsong.currentTime = (currentsong.duration * percentage) / 100;
    })
    //Drag and seek
    const seekbar = document.querySelector(".seekbar");
    const circle = document.querySelector(".circle");
    const coloredPart = document.querySelector(".coloredpart");
    let isDragging = false;
    // Step 1: Start dragging
    circle.addEventListener("mousedown", (e) => {
        isDragging = true;
        e.preventDefault(); // Prevent text selection
    });
    // Step 2: Handle movement
    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const rect = seekbar.getBoundingClientRect();
        let x = e.clientX - rect.left;
        // Clamp x within bounds
        x = Math.max(0, Math.min(x, rect.width));
        let percentage = (x / rect.width) * 100;
        circle.style.left = percentage + "%";
        coloredPart.style.width = percentage + "%";
        currentsong.currentTime = (currentsong.duration * percentage) / 100;

    });
    // Step 3: Stop dragging
    document.addEventListener("mouseup", () => {
        isDragging = false;
    });


    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = 0 + "%"
        // document.querySelector(".close").style.display="block" ;
        // document.querySelector(".hamburger").style.display="none" ;
    })
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = -100 + "%"
        // document.querySelector(".close").style.display="none" ;
        // document.querySelector(".hamburger").style.display="block" ;
    })


    //Add a eventlisteners to prev and next

    prev.addEventListener("click", () => {
        let idx = songs.indexOf(currentsong.src)
        prevsong.src = "assets/Play.svg";
        if (idx == 0) {
            prevsong = document.querySelector(".songlist").children[songs.length - 1].querySelector(".play");
            prevsong.src = "assets/pause.svg";
            playmusic(decodeURIComponent(songs[songs.length - 1].split(`/${currfolder}/`)[1].replace(".mp3", "")))
        }
        if (idx - 1 >= 0) {
            prevsong = document.querySelector(".songlist").children[idx - 1].querySelector(".play");
            prevsong.src = "assets/pause.svg";
            playmusic(decodeURIComponent(songs[idx - 1].split(`/${currfolder}/`)[1].replace(".mp3", "")))
        }

    })

    next.addEventListener("click", () => {
        let idx = songs.indexOf(currentsong.src)
        prevsong.src = "assets/Play.svg";
        if (idx == songs.length - 1) {
            prevsong = document.querySelector(".songlist").children[0].querySelector(".play");
            prevsong.src = "assets/pause.svg";
            playmusic(decodeURIComponent(songs[0].split(`/${currfolder}/`)[1].replace(".mp3", "")))
        }
        else if (idx + 1 < songs.length) {
            prevsong = document.querySelector(".songlist").children[idx + 1].querySelector(".play");
            prevsong.src = "assets/pause.svg";
            playmusic(decodeURIComponent(songs[idx + 1].split(`/${currfolder}/`)[1].replace(".mp3", "")))
        }
    })

    currentsong.addEventListener("timeupdate", () => {
        if (currentsong.currentTime >= currentsong.duration - 0.1) {
            currentsong.pause();
            currentsong.currentTime = 0;
            prevsong.src = "assets/Play.svg";
            //Update to next song

            let idx = songs.indexOf(currentsong.src)
            if (idx == songs.length - 1) {
                prevsong = document.querySelector(".songlist").children[0].querySelector(".play");
                prevsong.src = "assets/pause.svg";
                playmusic(decodeURIComponent(songs[0].split(`/${currfolder}/`)[1].replace(".mp3", "")))
            }
            else if (idx + 1 < songs.length) {
                prevsong = document.querySelector(".songlist").children[idx + 1].querySelector(".play");
                prevsong.src = "assets/pause.svg";
                playmusic(decodeURIComponent(songs[idx + 1].split(`/${currfolder}/`)[1].replace(".mp3", "")))
            }
        }
    });

    currentsong.volume = 1;
    let curvol = currentsong.volume;
    document.querySelector(".seekbarvol").addEventListener("click", (e) => {
        let seekbarvol = e.currentTarget;
        let rect = seekbarvol.getBoundingClientRect();
        let clickPosition = e.clientX - rect.left;
        let percentage = (clickPosition / rect.width) * 100;
        curvol = percentage / 100;
        document.querySelector(".circlevol").style.left = percentage + "%";
        document.querySelector(".coloredpartvol").style.width = percentage + "%"
        currentsong.volume = percentage / 100;
        document.querySelector(".volval").innerHTML = parseInt(percentage);
        if (curvol == 0 && Volume.src.includes("assets/volume.svg")) Volume.src = "assets/mute.svg";
        else if (curvol > 0 && Volume.src.includes("assets/mute.svg")) Volume.src = "assets/volume.svg";
    })
    //Drag and seek
    const seekbarvol = document.querySelector(".seekbarvol");
    const circlevol = document.querySelector(".circlevol");
    const coloredPartvol = document.querySelector(".coloredpartvol");
    let isDraggingvol = false;
    // Step 1: Start dragging
    circlevol.addEventListener("mousedown", (e) => {
        isDraggingvol = true;
        e.preventDefault(); // Prevent text selection
    });
    // Step 2: Handle movement
    document.addEventListener("mousemove", (e) => {
        if (!isDraggingvol) return;
        const rect = seekbarvol.getBoundingClientRect();
        let x = e.clientX - rect.left;
        // Clamp x within bounds
        x = Math.max(0, Math.min(x, rect.width));
        let percentage = (x / rect.width) * 100;
        curvol = percentage / 100;
        circlevol.style.left = percentage + "%";
        coloredPartvol.style.width = percentage + "%";
        currentsong.volume = percentage / 100;
        document.querySelector(".volval").innerHTML = parseInt(percentage);
        if (curvol == 0 && Volume.src.includes("assets/volume.svg")) Volume.src = "assets/mute.svg";
        else if (curvol > 0 && Volume.src.includes("assets/mute.svg")) Volume.src = "assets/volume.svg";
    });
    // Step 3: Stop dragging
    document.addEventListener("mouseup", () => {
        isDraggingvol = false;
    });
    Volume.addEventListener("click", () => {
        if (Volume.src.includes("assets/volume.svg")) {
            Volume.src = "assets/mute.svg";
            currentsong.volume = 0;
            document.querySelector(".volval").innerHTML = 0;
            document.querySelector(".circlevol").style.left = 0 + "%";
            document.querySelector(".coloredpartvol").style.width = 0 + "%";

        }
        else {
            Volume.src = "assets/volume.svg";
            currentsong.volume = curvol;
            document.querySelector(".volval").innerHTML = parseInt(curvol * 100);
            document.querySelector(".circlevol").style.left = (curvol * 100) + "%";
            document.querySelector(".coloredpartvol").style.width = (curvol * 100) + "%";
        }
    })



    //Load the library whenever someone clicked on card

    Array.from(document.getElementsByClassName("card")).forEach(e=>{
        e.addEventListener("click",async item=>{
            if(play.src.includes("assets/pause.svg")) play.src="assets/Play.svg";
            // if(prevsong.src.includes())
             document.querySelector(".circle").style.left = 0 + "%";
             document.querySelector(".coloredpart").style.width = 0 + "%"
            songs = await getsong(`songs/${item.currentTarget.dataset.folder}`);
            
        })
    })
}

main();
