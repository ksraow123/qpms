document.addEventListener("DOMContentLoaded", function () {
    let courseCodeElement = document.getElementById("courseCode");
    //let regulationElement = document.getElementById("regulation");
    let subjectDropdown = document.getElementById("subjectCode");

    if (courseCodeElement  && subjectDropdown) {
        courseCodeElement.addEventListener("change", function () {
            let courseId = this.value;
           // let regulation = regulationElement.value;

            // Clear existing options
            subjectDropdown.innerHTML = '<option value="0">Loading...</option>';
            if (courseId !== "0") {
                fetch("https://online.ctestservices.com/msbteqp/subjects/"+courseId)
                    .then(response => response.json())
                    .then(data => {
                        subjectDropdown.innerHTML = '<option value="0">Select</option>'; // Reset dropdown

                        data.forEach(subject => {
                            let option = document.createElement("option");
                            option.value = subject.id;  // Use Subject Code as value
                            option.textContent = `${subject.subjectCode} - ${subject.subject_name}`;  // Display Code & Name
                           option.setAttribute("data-syllabus", subject.syllabus || "");
                            subjectDropdown.appendChild(option);
                        });
                    })
                    .catch(error => {
                        console.error("Error fetching subjects:", error);
                        subjectDropdown.innerHTML = '<option value="0">Error Loading Subjects</option>';
                    });
            } else {
                subjectDropdown.innerHTML = '<option value="0">Select a Course First</option>';
            }
        });
    }
subjectDropdown.addEventListener("change", function () {
        let selectedOption = subjectDropdown.options[subjectDropdown.selectedIndex];
        let syllabusUrl = selectedOption.getAttribute("data-syllabus");

        if (syllabusUrl) {
            syllabusLink.href = "../"+syllabusUrl;
            syllabusLink.style.display = "inline"; // Show link
            noSyllabusText.style.display = "none"; // Hide "No syllabus available" text
        } else {
            syllabusLink.style.display = "none"; // Hide link
            noSyllabusText.style.display = "inline"; // Show "No syllabus available" text
        }
    });
    // Sidebar Toggle
    let toggleButton = document.querySelector(".toggle-btn");
    let sidebar = document.querySelector("#sidebar");

    if (toggleButton && sidebar) {
        toggleButton.addEventListener("click", function () {
            sidebar.classList.toggle("expand");
        });
    }
});
