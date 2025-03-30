
document.addEventListener("DOMContentLoaded", function () {
    const starsContainer = document.querySelector(".stars-container");

    function createStars(count) {
        for (let i = 0; i < count; i++) {
            let star = document.createElement("div");
            star.classList.add("star");
            
            // Random position
            let x = Math.random() * window.innerWidth;
            let y = Math.random() * window.innerHeight;
            
            star.style.left = `${x}px`;
            star.style.top = `${y}px`;

            // Random animation duration for a natural twinkle effect
            let animationDuration = Math.random() * 3 + 2; // Between 2s to 5s
            star.style.animationDuration = `${animationDuration}s`;

            starsContainer.appendChild(star);
        }
    }

    createStars(100); // Generates 100 stars
});


// Function to handle subject button click
document.querySelectorAll('.subjectButton').forEach(function(button) {
    button.addEventListener('click', function() {
        var subjectsContainer = document.getElementById('subjectsContainer');
        var pdfsContainer = document.getElementById('pdfsContainer');
        
        if (!subjectsContainer.classList.contains('hidden')) {
            subjectsContainer.classList.add('hidden');
            pdfsContainer.classList.add('hidden');
        } else {
            subjectsContainer.classList.remove('hidden');
        }

        // Hide other subject buttons
        document.querySelectorAll('.subjectButton').forEach(function(btn) {
            if (btn !== button) {
                btn.classList.add('hidden');
            }
        });

        // Store selected subject
        subjectsContainer.setAttribute('data-selected-subject', button.getAttribute('data-subject'));
    });
});

// Function to handle subcategory button click (Assignments, Projects, Materials)
document.querySelectorAll('.subject').forEach(function(button) {
    button.addEventListener('click', function() {
        var selectedSubject = document.getElementById('subjectsContainer').getAttribute('data-selected-subject');
        var subCategory = button.getAttribute('data-subject');
        var pdfsContainer = document.getElementById('pdfsContainer');
        pdfsContainer.classList.remove('hidden');
        pdfsContainer.innerHTML = ''; // Clear previous content

        // Scroll down to the items
        window.scrollTo({
            top: pdfsContainer.offsetTop,
            behavior: 'smooth'
        });

        // Add items for the selected subject
        var items = getItemsForSubject(selectedSubject, subCategory);
        var itemList = document.createElement('div');
        itemList.classList.add('pdfList');
        items.forEach(function(item) {
            var itemElement = document.createElement('div');
            itemElement.classList.add('pdfItem');
            itemElement.textContent = item;
            itemList.appendChild(itemElement);
        });
        pdfsContainer.appendChild(itemList);
    });
});

// Function to handle clicking on the main subject button again
document.querySelectorAll('.subjectButton').forEach(function(button) {
    button.addEventListener('click', function() {
        if (document.getElementById('pdfsContainer').classList.contains('hidden')) {
            // Show the subcategory buttons
            document.getElementById('subjectsContainer').classList.remove('hidden');
        } else {
            // Reset to show all subject name buttons
            document.querySelectorAll('.subjectButton').forEach(function(btn) {
                btn.classList.remove('hidden');
            });
            document.getElementById('subjectsContainer').classList.add('hidden');
            document.getElementById('pdfsContainer').classList.add('hidden');
        }
    });
});

// Function to return items for the selected subject and subcategory
function getItemsForSubject(subject, subCategory) {
    var items = {
        webProgramming: {
            assignments: ['Web_Assignment1.pdf', 'Web_Assignment2.pdf', 'Web_Assignment3.pdf'],
            projects: ['Web_Project1.pdf', 'Web_Project2.pdf', 'Web_Project3.pdf'],
            materials: ['Web_Material1.pdf', 'Web_Material2.pdf', 'Web_Material3.pdf']
        },
        dataStructures: {
            assignments: ['DS_Assignment1.pdf', 'DS_Assignment2.pdf', 'DS_Assignment3.pdf'],
            projects: ['DS_Project1.pdf', 'DS_Project2.pdf', 'DS_Project3.pdf'],
            materials: ['DS_Material1.pdf', 'DS_Material2.pdf', 'DS_Material3.pdf']
        },
        databaseSystems: {
            assignments: ['DB_Assignment1.pdf', 'DB_Assignment2.pdf', 'DB_Assignment3.pdf'],
            projects: ['DB_Project1.pdf', 'DB_Project2.pdf', 'DB_Project3.pdf'],
            materials: ['DB_Material1.pdf', 'DB_Material2.pdf', 'DB_Material3.pdf']
        }
    };
    return items[subject][subCategory] || [];
}
// Name animation on scroll
window.addEventListener('scroll', function() {
    const nameTitle = document.getElementById('nameTitle');
    const namePlaceholder = document.getElementById('namePlaceholder');
    const introSection = document.querySelector('.intro');
    const navbar = document.querySelector('.navbar');

    // Get the position of the intro section relative to the viewport
    const introRect = introSection.getBoundingClientRect();

    // If the intro section is scrolled out of view (top of section is above viewport top)
    if (introRect.top < 0) {
        // Show and animate the name in the navbar
        namePlaceholder.style.opacity = '1';
        namePlaceholder.textContent = nameTitle.textContent;
        navbar.classList.add('scrolled');  // Add class to change navbar color
    } else {
        // Hide the name in the navbar
        namePlaceholder.style.opacity = '0';
        navbar.classList.remove('scrolled');  // Remove class when at the top
    }
});
