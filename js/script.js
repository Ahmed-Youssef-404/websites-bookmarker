let websitesArray = [];

// Retrieve existing bookmarks from localStorage, if available
if (localStorage.getItem("websites") !== null) {
    websitesArray = JSON.parse(localStorage.getItem("websites"));
}

let addButton = document.getElementById('addWebsite')
let websiteName = document.getElementById("websiteNameInput");
let websiteURL = document.getElementById("websiteURL");
let updateIndex = -1; // Index of the website being updated (default is -1, meaning no update)

// Add or update a website based on the current mode (add or update)
function addOrUpdate() {
    if (websiteName.value == '' || websiteURL.value == '') {
        alert("Please fill in both fields");
    } else if (updateIndex === -1) {
        // Add mode
        websitesArray.push({ name: websiteName.value, url: websiteURL.value });
    } else {
        // Update mode: Update the website at the specific index
        websitesArray[updateIndex] = { name: websiteName.value, url: websiteURL.value };
        updateIndex = -1; // Reset the update index after updating
        addButton.textContent = 'Update';
    }

    // Store the updated array back to localStorage
    localStorage.setItem("websites", JSON.stringify(websitesArray));

    // Clear 
    clearInputs();
    // Update the display
    display();
}

// -------------------------------------------------------------------------------------------------------

function display() {
    let websites = JSON.parse(localStorage.getItem("websites"));
    document.getElementById("websiteList").innerHTML = '';

    // Loop through the array and display each website
    for (let i = 0; i < websites.length; i++) {
        document.getElementById("websiteList").innerHTML += `
            <li class="webLI">
                <div class="websiteName">
                    <span>${websites[i].name}</span>
                </div>
                <div class="visitDeletButtons">
                    <a href="${websites[i].url}" class="btn btn-success  websiteButtons" target="_blank">Visit</a>
                    <button class="btn btn-warning  websiteButtons" onclick="populateFields(${i})">Update</button>
                    <button class="btn btn-danger  websiteButtons" onclick="deleteWebsite(${i})">Delete</button>
                </div>
            </li>
        `;
    }
}

// -------------------------------------------------------------------------------------------------------

// Populate the input fields with the current name and URL of the website to be updated
function populateFields(index) {
    // Set the input fields with the existing data of the selected website
    websiteName.value = websitesArray[index].name;
    websiteURL.value = websitesArray[index].url;

    addButton.textContent = 'Update';
    // Set updateIndex to the index of the website being updated
    updateIndex = index;
}

// -------------------------------------------------------------------------------------------------------

// Delete a website from the list
function deleteWebsite(index) {
    websitesArray.splice(index, 1);
    localStorage.setItem("websites", JSON.stringify(websitesArray));
    display();
}

// -------------------------------------------------------------------------------------------------------

function clearInputs() {
    document.getElementById("websiteNameInput").value = "";
    document.getElementById("websiteURL").value = "";
    addButton.textContent = 'Add';
}

// -------------------------------------------------------------------------------------------------------

document.getElementById('searchInput').addEventListener('input', filterWebsites);
function filterWebsites() {
    let filter = document.getElementById('searchInput').value.toLowerCase();
    let websites = document.querySelectorAll('.webLI');

    websites.forEach((website) => {
        let websiteName = website.querySelector('.websiteName span').textContent.toLowerCase(); // Get the website name in lowercase
        // Check if the website name includes the search query
        if (websiteName.includes(filter)) {
            website.style.display = ''; // Show the website if it matches the search query
        } else {
            website.style.display = 'none'; // Hide the website if it doesn't match the search query
        }
    });
}

// -------------------------------------------------------------------------------------------------------

document.addEventListener("keydown", function(event) {
    // Check if the pressed key is 'Enter'
    if (event.key === "Enter" || event.keyCode === 13) {
        // Call the function you want to execute
        addOrUpdate();
    }
});

// -------------------------------------------------------------------------------------------------------

// Display the websites when the page loads
display();