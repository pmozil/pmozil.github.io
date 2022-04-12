setInterval(displayClock, 100);

if(localStorage.getItem("greet")==null) {
    localStorage.setItem("greet", "Hi there!");
}
if(localStorage.getItem("search")==null) {
    localStorage.setItem("search", "https://duckduckgo.com");
}
if(localStorage.getItem("background")==null) {
    localStorage.setItem("background", "var(--backgroundImg)");
}
if(localStorage.getItem("hour12")==null) {
    localStorage.setItem("hour12", false);
}
if(localStorage.getItem("timezone")==null) {
    localStorage.setItem("timezone", "Europe/Brussels");
}

function displayClock() {
    const time = document.querySelector('#time');
    let date = new Date();
    let timeString = date.toLocaleTimeString(
        "en-US",
        { 
            timeZone: localStorage.getItem("timezone"),
            hour12: localStorage.getItem("hour12")=='true',
            hour: "2-digit",
            minute: "2-digit"
        }
    );
    time.textContent = timeString;
}

function setSearch(search=null) {
    let searchFromInput = document.getElementsByName("searchenginebox")[0].value;
    document.getElementsByName("searchenginebox")[0].value = '';
    if(search!=null) {
        searchFromInput = search
    }
    localStorage.setItem("search", searchFromInput);
    document.querySelector("#search").action = localStorage.getItem("search");
}

function setTimezone(tz=null) {
    let tzFromInput = document.getElementsByName("tzbox")[0].value;
    document.getElementsByName("tzbox")[0].value = '';
    if(tz!=null) {
        tzFromInput = tz
    }
    localStorage.setItem("timezone", tzFromInput);
}

function setHourFormat() {
    let hourSelect = document.getElementsByName("hourFormat")[0];
    let hourFromInput = hourSelect.options[hourSelect.selectedIndex].value;
    localStorage.setItem("hour12", hourFromInput);
}

function setGreeting(default_greet="Hello there!") {
    let greet = document.getElementsByName("greet")[0].value;
    if (!greet.match(/^(.+.+)$/)) {
        greet = default_greet
    }
    localStorage.setItem("greet", greet);
    document.querySelector("#greeting").textContent = localStorage.getItem("greet")
}

function getBackground() {
    let img = localStorage.getItem("background");
    return img;
}

function setBackground(val=null){
    if(val!=null) {
        document.body.style.background = val;
        localStorage.setItem("background", val);
        return val;
    }
    let img = getBackground();
    document.body.style.background =  img;
    return img;
}

function setBackgroundFromText(){
    let url = document.getElementsByName('bg')[0].value;
    document.getElementsByName('bg')[0].value = '';
    localStorage.setItem("background", url);
    setBackground();
}

function bgChange() {
    const reader = new FileReader();
    reader.addEventListener("load", function () {
        try{
            localStorage.setItem("background", `url(${reader.result})`);
        } catch(error) {
            console.log(error);
            alert(
                "The picture is too big to be stored as default wallpaper. Please use a picture that is smaller than 5MB"
            );
        }
        setBackground();
    }, false);

    const input = document.querySelector("#input");
    let imgPath = input.files[0];
    reader.readAsDataURL(imgPath);
}

function pageLoaded() {
    setBackground();
    document.querySelector("#greeting").textContent = localStorage.getItem("greet");
    document.querySelector("#search").action = localStorage.getItem("search");
}
