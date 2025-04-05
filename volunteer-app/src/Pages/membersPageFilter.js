// Assume we have an array of items to filter
let items = [
    { id: 1, orientationCompleted: true, waiverSigned: true, timeSheetCreated: false },
    { id: 2, orientationCompleted: false, waiverSigned: true, timeSheetCreated: true },
    { id: 3, orientationCompleted: true, waiverSigned: false, timeSheetCreated: true },
    // ... more items ...
];

// Object to store current filter state
let filterState = {
    orientation: null,
    waiver: null,
    timesheet: null
};

// Function to apply filters
export function applyFilters() {
    const filteredItems = items.filter(item => {
        const orientationMatch = filterState.orientation === null || 
            (filterState.orientation === true && item.orientationCompleted) || 
            (filterState.orientation === false && !item.orientationCompleted);
        
        const waiverMatch = filterState.waiver === null || 
            (filterState.waiver === true && item.waiverSigned) || 
            (filterState.waiver === false && !item.waiverSigned);
        
        const timeSheetMatch = filterState.timesheet === null || 
            (filterState.timesheet === true && item.timeSheetCreated) || 
            (filterState.timesheet === false && !item.timeSheetCreated);

        return orientationMatch && waiverMatch && timeSheetMatch;
    });

    displayResults(filteredItems);
}

// Function to display results (you'd implement this based on your UI needs)
function displayResults(filteredItems) {
    console.log('Filtered items:', filteredItems);
    // TODO: Update your UI here to show the filtered items
    // For example:
    // const resultContainer = document.getElementById('result-container');
    // resultContainer.innerHTML = filteredItems.map(item => `<div>Item ${item.id}</div>`).join('');
}

// Function to handle button clicks
function handleButtonClick(event) {
    event.preventDefault();
    const button = event.target;
    const fieldset = button.closest('fieldset');
    const filterType = fieldset.classList[0];
    const value = button.name === 'Yes';

    // Toggle filter state
    if (filterState[filterType] === value) {
        filterState[filterType] = null;
    } else {
        filterState[filterType] = value;
    }

    // Update button styles
    fieldset.querySelectorAll('button').forEach(btn => {
        btn.classList.remove('active');
    });
    if (filterState[filterType] !== null) {
        button.classList.add('active');
    }

    applyFilters();
}

// Add event listeners to all buttons
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.Filter button').forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });

    // Initial application of filters
    applyFilters();
});
