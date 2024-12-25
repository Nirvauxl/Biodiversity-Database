
// Fetch the species data
fetch('species_data.json')
    .then(response => response.json())
    .then(data => {
        speciesData = data;
    });

// Function to display species
function displaySpecies(data) {
    const speciesList = document.getElementById('species-list');

    // Clear previous results
    speciesList.innerHTML = "";

    // Populate with filtered data
    data.forEach(species => {
        const speciesDiv = document.createElement('div');
        speciesDiv.className = 'species-item';
        speciesDiv.innerHTML = `
            <img class="resized" src="${species.image_url}" alt="${species.common_name}">
            <h3>${species.common_name} (${species.scientific_name})</h3>
            <p><strong>Habitat:</strong> ${species.habitat}</p>
            <p><strong>Status:</strong> ${species.conservation_status}</p>
            <div>
                <h4>Classification:</h4>
                <ul>
                    <li><strong>Kingdom:</strong> ${species.classification.kingdom}</li>
                    <li><strong>Phylum:</strong> ${species.classification.phylum}</li>
                    <li><strong>Class:</strong> ${species.classification.class}</li>
                    <li><strong>Order:</strong> ${species.classification.order}</li>
                    <li><strong>Family:</strong> ${species.classification.family}</li>
                    <li><strong>Genus:</strong> ${species.classification.genus}</li>
                    <li><strong>Species:</strong> ${species.classification.species}</li>
                </ul>
                <h4>Additional Information:</h4>
                <ul>
                    <li><strong>Body Coelom:</strong> ${species.body_coelom}</li>
                    <li><strong>Germ Layer:</strong> ${species.germ_layer}</li>
                    <li><strong>Body Symmetry:</strong> ${species.body_symmetry}</li>
                </ul>
            </div>
        `;
        speciesList.appendChild(speciesDiv);
    });
}

// Add event listener for Enter key
document.getElementById('search-input').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') { // Check if the Enter key is pressed
        event.preventDefault(); // Prevent the default form submission behavior
        searchSpecies();
    }
});

// Function to search species
function searchSpecies() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();

    // Check if the search bar is empty
    if (searchTerm.trim() === "") {
        // If empty, clear the results container and return
        const speciesList = document.getElementById('species-list');
        speciesList.innerHTML = `<p>Please enter a valid search term.</p>`;
        return;
    }

    // Filter species based on the search term
    const filteredData = speciesData.filter(species =>
        species.common_name.toLowerCase().includes(searchTerm) ||
        species.scientific_name.toLowerCase().includes(searchTerm)
    );

    // Display filtered results or a message if no results are found
    if (filteredData.length > 0) {
        displaySpecies(filteredData);
    } else {
        const speciesList = document.getElementById('species-list');
        speciesList.innerHTML = `<p>No species found matching "${searchTerm}". Please try again.</p>`;
    }
}
