let popup = document.querySelector(".popup__container");
let overlay = document.querySelector(".popup__overlay");
let editBtn = document.querySelector(".profile__edit");
let closeBtn = document.querySelector(".popup__x");
let saveBtn = document.querySelector(".popup__save");
let nameInput = document.querySelector(".popup__input_name");
let occupationInput = document.querySelector(".popup__input_occupation");
let profileName = document.querySelector(".profile__name").textContent;
let profileOccupation = document.querySelector(".profile__occupation").textContent;

editBtn.onclick = function() {
    popup.style.display = "block";
    overlay.style.display = "block";
    nameInput.value = profileName; 
    occupationInput.value = profileOccupation;
    checkInputs();
}

closeBtn.onclick = function() {
    popup.style.display = "none";
    overlay.style.display = "none";
}

saveBtn.onclick = function() {
    if (saveBtn.classList.contains("popup__save_disabled")) {
        return;
    }
    
    let newName = nameInput.value;
    let newOccupation = occupationInput.value;

    if (newName) {
        profileName = newName;
        document.querySelector(".profile__name").textContent = newName;
    }
    if (newOccupation) {
        profileOccupation = newOccupation;
        document.querySelector(".profile__occupation").textContent = newOccupation;
    }

    popup.style.display = "none";
    overlay.style.display = "none";
}

nameInput.addEventListener("focus", function() {
    nameInput.value = "";
    checkInputs();
});

occupationInput.addEventListener("focus", function() {
    occupationInput.value = "";
    checkInputs();
});

function checkInputs() {
    if (nameInput.value === "" || occupationInput.value === "") {
        saveBtn.classList.add("popup__save_disabled");
    } else {
        saveBtn.classList.remove("popup__save_disabled");
    }
}

nameInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        if (!saveBtn.classList.contains("disabled")) {
            saveBtn.onclick();
        }
    }
});

occupationInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        if (!saveBtn.classList.contains("disabled")) {
            saveBtn.onclick();
        }
    }
});

nameInput.addEventListener("input", checkInputs);
occupationInput.addEventListener("input", checkInputs);

overlay.onclick = function() {
    popup.style.display = "none";
    overlay.style.display = "none";
};