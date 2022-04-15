setInterval(displayClock, 100);

const defaultMarks = [
    {"name": "Reddit",
     "href":"https://reddit.com",
     "icon": "images/reddit.svg",
     "aria-label":"Link to reddit",
    },
    {"name": "Github",
     "icon": "images/github.svg",
     "href":"https://github.com",
     "aria-label":"Link to github",
    },
    {"name": "Gitlab",
     "icon": "images/gitlab.svg",
     "href":"https://gitlab.com",
     "aria-label":"Link to gitlab",
    },
    {"name": "Youtube",
     "icon": "images/youtube.svg",
     "href":"https://youtube.com",
     "aria-label":"Link to gitlab",
    }
]

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
if(localStorage.getItem("bookmarks")==null) {
    localStorage.setItem("bookmarks", JSON.stringify(defaultMarks));
}

function setDefaults() {
    localStorage.setItem("greet", "Hi there!");
    localStorage.setItem("search", "https://duckduckgo.com");
    localStorage.setItem("background", "var(--backgroundImg)");
    localStorage.setItem("hour12", false);
    localStorage.setItem("timezone", "Europe/Brussels");
    localStorage.setItem("bookmarks", JSON.stringify(defaultMarks));
}

function setBookmarkList(bookmarkListString=null) {
    let marks = bookmarkListString;
    if(marks=null) {
        return localStorage.getItem("bookmarks");
    }
    localStorage.setItem("bookmarks", bookmarkList);
    return JSON.stringify(bookmarkList);
}

function setBookmarks() {
    let marksStr = localStorage.getItem("bookmarks");
    let marks = marksStr!=null ? JSON.parse(marksStr) : defaultMarks;
    let bookmarks = document.querySelector("#bookmarks");
    for(var i=0; i<marks.length; i++) {
        let mark = document.createElement('li');
        mark.innerHTML=`
            <a
                class="bookmark"
                href="${marks[i]["href"]}"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="${marks[i]["aria-label"]}"
                >
                <img src="${marks[i]["icon"]}" alt="${marks[i]["name"]} svg">
                    <span class="hint">${marks[i]["name"]}</span>
                </img>
            </a>

            `;
        bookmarks.appendChild(mark);
    }
}

function getSettingsJSONString() {
    let greet = localStorage.getItem("greet");
    let search = localStorage.getItem("search");
    let background = localStorage.getItem("background");
    let hourFormat = localStorage.getItem("hour12");
    let timezone = localStorage.getItem("timezone");
    let bookmarks = localStorage.getItem("bookmarks");
    let settings = {
        "greet": greet,
        "search": search,
        "hour12": hourFormat,
        "timezone": timezone,
        "bookmarks": bookmarks,
        "background": background
    }
    return JSON.stringify(settings);
}

function settingsFromJSONStr(settingsStr=null){
    let str = settingsStr;
    if(str==null){
        str = getSettingsJSONString();
    }
    let settingsJSON = JSON.parse(str);
    settingsFromJSON(settingsJSON);
}

function settingsFromJSON(settingsJSON=null) {
    let settings = settingsJSON;
    if(settings==null) {
        settings=JSON.parse(getSettingsJSONString());
    }
    for(var key in settings) {
        localStorage.setItem(key, settings[key]);
    }
    location.reload();
}

function settingsFromURL() {
    let seattingsURL = document.getElementsByName("jsonURL")[0].value;
    document.getElementsByName("jsonURL")[0].value = '';
    let settingsStr;
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.onload = function() {
        if(xhr.status == 404)
            settingsStr = getSettingsJSONString();
        settingsStr = this.response;
    }

    xhr.send();

    settingsFromJSONStr(settingsStr);
}

function settingsOptionsClicked() {
    let check = document.querySelector("#sidebar_check");
    check.checked = false;
    let par = document.querySelector("#settingsParagraph");
    let base = JSON.parse(getSettingsJSONString());
    let str = "";
    base["bookmarks"] = JSON.stringify(JSON.parse(base["bookmarks"]), null, 4);
    base["bookmarks"] = base["bookmarks"].replace(", ", ",<br/>");
    for (var key in base) {
        str += `<span><b>${key}</b>: ${base[key]}</span><br/>\n`
    }
    par.innerHTML = str;
}

function settingsOptionClosed() {
    let par = document.querySelector("#settingsParagraph");
    par.innerHTML = "";
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
    localStorage.setItem("background", `url(${url})`);
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
    setBookmarks();
    document.querySelector("#greeting").textContent = localStorage.getItem("greet");
    document.querySelector("#search").action = localStorage.getItem("search");
}
