document.addEventListener('DOMContentLoaded', () => {
    // 1. Handle Form Submission to Generate Preview
    const form = document.getElementById('resume-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        generateResumePreview();
        
        // Scroll to the preview section
        document.getElementById('preview-section').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Initial project input on load
    addProjectInput();
});

// Counter for dynamic project inputs
let projectCounter = 0;

/**
 * Dynamically adds a new set of input fields for a project.
 */
window.addProjectInput = function() {
    projectCounter++;
    const projectsSection = document.getElementById('projects-section');
    
    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project-group');
    projectDiv.innerHTML = `
        <h4 style="margin-top: 15px;">Project ${projectCounter}</h4>
        <input type="text" class="project-name" placeholder="Project Name" required>
        <textarea class="project-details" rows="2" placeholder="Project Details"></textarea>
    `;
    
    // Insert the new project fields just before the "Add Project" button
    const addButton = projectsSection.querySelector('.secondary-btn');
    projectsSection.insertBefore(projectDiv, addButton);
}

/**
 * Collects form data and generates the HTML preview in the output div.
 */
function generateResumePreview() {
    const outputDiv = document.getElementById("resume-output");
    outputDiv.innerHTML = ""; // Clear previous content

    // --- Collect Data ---
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const university = document.getElementById('university').value;
    const skillsInput = document.getElementById('skillsInput').value;
    const languages = document.getElementById('languages').value;
    const workExperience = document.getElementById('workExperience').value;

    const skills = skillsInput.split(',').map(s => s.trim()).filter(s => s);
    
    const projects = [];
    document.querySelectorAll('.project-group').forEach(group => {
        const nameEl = group.querySelector('.project-name');
        const detailsEl = group.querySelector('.project-details');
        if (nameEl && nameEl.value) {
            projects.push({
                name: nameEl.value,
                details: detailsEl ? detailsEl.value : ''
            });
        }
    });
// Display output on the webpage
            outputDiv.innerHTML += `<h3>Name: ${name}</h3>`;
            outputDiv.innerHTML += `<h3>Address: ${address}</h3>`;
            outputDiv.innerHTML += `<h3>Phone: ${phone}</h3>`;
            outputDiv.innerHTML += `<h3>Email: ${email}</h3>`;
            outputDiv.innerHTML += `<h3>University: ${university}</h3>`;

            outputDiv.innerHTML += `<h3>Skills:</h3><ul>`;
            skills.forEach(skill => {
                outputDiv.innerHTML += `<li>${skill}</li>`;
            });
            outputDiv.innerHTML += `</ul>`;

            outputDiv.innerHTML += `<h3>Projects:</h3>`;
            projects.forEach((project, index) => {
                outputDiv.innerHTML += `<p><b>Project ${index + 1}:</b> ${project.name}</p>`;
                outputDiv.innerHTML += `<p>Details: ${project.details}</p>`;
            });

            outputDiv.innerHTML += `<h3>Work Experience: ${workExperience}</h3>`;
            outputDiv.innerHTML += `<h3>Languages: ${languages}</h3>`;


    // Show the preview and download section
    document.getElementById("preview-section").style.display = "block";
}

/**
 * Converts the HTML content of the resume output div into a PDF.
 * This uses a basic jsPDF approach that relies on text parsing.
 */
function downloadPDF() {
            const { jsPDF } = window.jspdf;
            let doc = new jsPDF();
            let outputDiv = document.getElementById("resume-output");

            doc.setFont("helvetica", "bold");
            doc.setFontSize(16);
            doc.text("Resume", 90, 10);

            doc.setFontSize(12);
            let yPosition = 20;

            outputDiv.childNodes.forEach(node => {
                if (node.tagName === "H3" || node.tagName === "P") {
                    doc.text(node.textContent, 10, yPosition);
                    yPosition += 10;
                } else if (node.tagName === "UL") {
                    node.childNodes.forEach(li => {
                        doc.text("- " + li.textContent, 15, yPosition);
                        yPosition += 10;
                    });
                }
            });

            doc.save("Resume.pdf");
        }
