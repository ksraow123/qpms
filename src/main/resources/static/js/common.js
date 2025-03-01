document.addEventListener("DOMContentLoaded", function () {
    let courseCodeElement = document.getElementById("courseCode");
    let regulationElement = document.getElementById("regulation");
    let subjectDropdown = document.getElementById("subjectCode");

    if (courseCodeElement && regulationElement && subjectDropdown) {
        courseCodeElement.addEventListener("change", function () {
            let courseId = this.value;
            let regulation = regulationElement.value;

            // Clear existing options
            subjectDropdown.innerHTML = '<option value="0">Loading...</option>';

            if (courseId !== "0") {
                fetch(`https://online.ctestservices.com/qprs/subjects/${courseId}/${regulation}`)
                    .then(response => response.json())
                    .then(data => {
                        subjectDropdown.innerHTML = '<option value="0">Select</option>'; // Reset dropdown

                        data.forEach(subject => {
                            let option = document.createElement("option");
                            option.value = subject.id;  // Use Subject Code as value
                            option.textContent = `${subject.subject_code} - ${subject.subject_name}`;  // Display Code & Name
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

    // Sidebar Toggle
    let toggleButton = document.querySelector(".toggle-btn");
    let sidebar = document.querySelector("#sidebar");

    if (toggleButton && sidebar) {
        toggleButton.addEventListener("click", function () {
            sidebar.classList.toggle("expand");
        });
    }
});
