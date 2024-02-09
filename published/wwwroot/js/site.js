// Global variable to store courses
let theCourses = [];

// Fetch courses from the server
async function fetchCourses() {
    try {
        const response = await fetch("/courses.json"); // Replace with the actual path to your JSON file
        theCourses = await response.json();
        renderCourses(theCourses);
    } catch (error) {
        console.error("Error fetching courses:", error);
    }
}

// Render courses on the page
function renderCourses(courses) {
    const coursesContainer = document.getElementById("courses-container");
    const searchDisplay = document.getElementById("search-display");

    if (!coursesContainer || !searchDisplay) {
        console.error("Courses container or search display not found.");
        return;
    }

    coursesContainer.innerHTML = ""; // Clear existing content

    const searchInput = document.getElementById("search").value.toLowerCase();
    let foundCourses = false;

    courses.forEach((course, index) => {
        const arrayCourseTitle = course.course.toLowerCase();
        const arrayCourseDescription = course.description.toLowerCase();
        const courseElement = createCourseElement(course, index, searchInput);

        if (arrayCourseTitle.includes(searchInput) || arrayCourseDescription.includes(searchInput)) {
            courseElement.style.display = "flex";
            foundCourses = true;
        } else {
            courseElement.style.display = "none";
        }
        coursesContainer.appendChild(courseElement);
    });

    // Update search display
    if (foundCourses) {
        searchDisplay.innerHTML = `Search: ${searchInput}`;
        searchDisplay.style.visibility = "visible";
    } else {
        searchDisplay.innerHTML = "No courses found.";
        searchDisplay.style.visibility = "visible";
    }
}

// Create HTML element for a single course
function createCourseElement(course, index, searchInput) {
    const courseElement = document.createElement("div");
    courseElement.classList.add("crss");
    courseElement.classList.add("card");
    courseElement.id = index;

    const lineBreakIndex = findLineBreakIndex(course.description, 2);
    const shortDescription = course.description.substring(0, lineBreakIndex);
    const fullDescription = course.description;

    courseElement.innerHTML = `
        <div class="row course">
            <div class="col-md-3 code">
                <h5>${course.code}</h5> 
            </div>
            <div class="col-md description">
                <h2>${course.course}</h2>
                <p>
                    <span class="short-description">${shortDescription}</span>
                    <span class="full-description" style="display:none;">${fullDescription}</span>
                    <a href="#" class="read-more" onclick="toggleDescription(${index}); return false;">+ Read more</a>
                </p>
            </div>
            <div class="col-md-2 level">
                <h5>${course.level}</h5>
            </div>
        </div>
    `;

    return courseElement;
}

// Function to find the line break index for limiting description to two lines
function findLineBreakIndex(description, lines) {
    let index = 0;

    for (let i = 0; i < lines; i++) {
        index = description.indexOf('\n', index + 1);

        if (index === -1) {
            break;
        }
    }

    if (index === -1) {
        index = Math.min(description.length, 160);
    } else {
        // Check if the final character before the line break is not whitespace
        while (index > 0 && !/\s/.test(description[index - 1])) {
            index--;
        }
    }

    return index;
}

// Function to toggle description visibility
function toggleDescription(index) {
    const shortDescriptionElement = document.getElementById(index).getElementsByClassName("short-description")[0];
    const fullDescriptionElement = document.getElementById(index).getElementsByClassName("full-description")[0];
    const readMoreLink = document.getElementById(index).getElementsByClassName("read-more")[0];

    if (shortDescriptionElement.style.display !== "none") {
        shortDescriptionElement.style.display = "none";
        fullDescriptionElement.style.display = "inline";
        readMoreLink.innerText = "- Show less";
    } else {
        shortDescriptionElement.style.display = "inline";
        fullDescriptionElement.style.display = "none";
        readMoreLink.innerText = "+ Read more";
    }
}

// Event listener for the search button
document.getElementById("btn").addEventListener("click", commitSearch);

// Function to filter courses based on search input
function commitSearch() {
    renderCourses(theCourses);
}

// Initial fetch of courses when the page loads
document.addEventListener("DOMContentLoaded", fetchCourses);
