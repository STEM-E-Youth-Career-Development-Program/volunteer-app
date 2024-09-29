function toggleDropdown() {
    var dropdown = document.getElementById("dropdownMenu");
    if (dropdown.classList.contains("show")) {
        dropdown.classList.remove("show");
        setTimeout(() => {
            dropdown.style.display = "none";
        }, 300); // Time should match the transition duration
    } else {
        dropdown.style.display = "flex";
        setTimeout(() => {
            dropdown.classList.add("show");
        }, 10); // Delay to ensure the display: flex is applied before adding the animation
    }
}

// Close the dropdown if clicked outside of it
window.onclick = function(event) {
    if (!event.target.matches('.user-icon img')) {
        var dropdown = document.getElementById("dropdownMenu");
        if (dropdown.classList.contains("show")) {
            dropdown.classList.remove("show");
            setTimeout(() => {
                dropdown.style.display = "none";
            }, 300);
        }
    }
};
