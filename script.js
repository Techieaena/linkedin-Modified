document.addEventListener('DOMContentLoaded', function() {
    const table = document.getElementById('certTable');
    const originalRows = Array.from(table.getElementsByTagName('tbody')[0].getElementsByTagName('tr'));

    // Function to display rows
    function displayRows(rows) {
        const tbody = table.getElementsByTagName('tbody')[0];
        tbody.innerHTML = '';
        rows.forEach(row => tbody.appendChild(row));
    }

    // Add event listener for the search form
    document.getElementById('userSearchForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        let searchQuery = document.getElementById('mySearch').value.toLowerCase().trim();
        let filteredRows = originalRows.filter(row => {
            let cells = row.getElementsByTagName('td');
            for (let j = 0; j < cells.length; j++) {
                if (cells[j].textContent.toLowerCase().includes(searchQuery)) {
                    return true;
                }
            }
            return false;
        });

        displayRows(filteredRows);
    });

    // Add event listener for the reset button
    document.getElementById('resetButton').addEventListener('click', function() {
        document.getElementById('mySearch').value = '';
        displayRows(originalRows);
    });

    // Initialize table with original rows
    displayRows(originalRows);
});

document.addEventListener('DOMContentLoaded', function() {
    const table = document.getElementById('certTable');
    const originalRows = Array.from(table.getElementsByTagName('tbody')[0].getElementsByTagName('tr'));
    const rowsPerPage = 20;
    let currentPage = 1;
    const totalRows = originalRows.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    const paginationControls = document.getElementById('pagination');
    const pageNumbers = document.getElementById('pageNumbers');

    // Function to display rows
    function displayRows(rows, page) {
        const tbody = table.getElementsByTagName('tbody')[0];
        tbody.innerHTML = '';
        let start = (page - 1) * rowsPerPage;
        let end = page * rowsPerPage;
        rows.slice(start, end).forEach(row => tbody.appendChild(row));
    }

    // Create pagination controls
    function createPaginationControls() {
        pageNumbers.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            let pageNumber = document.createElement('button');
            pageNumber.innerText = i;
            pageNumber.addEventListener('click', function () {
                currentPage = i;
                displayRows(originalRows, currentPage);
                updatePaginationControls();
            });
            pageNumbers.appendChild(pageNumber);
        }
    }

    // Update pagination controls
    function updatePaginationControls() {
        const pageButtons = pageNumbers.getElementsByTagName('button');
        for (let i = 0; i < pageButtons.length; i++) {
            pageButtons[i].classList.remove('active');
            if (parseInt(pageButtons[i].innerText) === currentPage) {
                pageButtons[i].classList.add('active');
            }
        }
        document.getElementById('prevPage').disabled = currentPage === 1;
        document.getElementById('nextPage').disabled = currentPage === totalPages;
    }

    // Event listener for previous page button
    document.getElementById('prevPage').addEventListener('click', function () {
        if (currentPage > 1) {
            currentPage--;
            displayRows(originalRows, currentPage);
            updatePaginationControls();
        }
    });

    // Event listener for next page button
    document.getElementById('nextPage').addEventListener('click', function () {
        if (currentPage < totalPages) {
            currentPage++;
            displayRows(originalRows, currentPage);
            updatePaginationControls();
        }
    });

    // Search form submission
    document.getElementById('userSearchForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        let searchQuery = document.getElementById('mySearch').value.toLowerCase().trim();
        let filteredRows = originalRows.filter(row => {
            let cells = row.getElementsByTagName('td');
            for (let j = 0; j < cells.length; j++) {
                if (cells[j].textContent.toLowerCase().includes(searchQuery)) {
                    return true;
                }
            }
            return false;
        });

        displayRows(filteredRows, 1);
        updatePaginationControls();
    });

    // Reset button click event
    document.getElementById('resetButton').addEventListener('click', function() {
        document.getElementById('mySearch').value = '';
        document.getElementById('filterColumn').value = 'all';
        displayRows(originalRows, 1);
        updatePaginationControls();
    });

    // Filter by provider
    document.getElementById('filterColumn').addEventListener('change', function() {
        let filter = document.getElementById('filterColumn').value.toLowerCase();
        let filteredRows = originalRows.filter(row => {
            let cells = row.getElementsByTagName('td');
            let found = false;
            for (let j = 2; j < cells.length; j++) {
                if (filter === 'all' || cells[j].textContent.toLowerCase() === 'certificate' && cells[j].getAttribute('data-filter') === filter) {
                    found = true;
                    break;
                }
            }
            return found;
        });

        displayRows(filteredRows, 1);
        updatePaginationControls();
    });

    // Sorting function
    function sortTable(columnIndex) {
        let rowsArray = Array.from(originalRows);
        let dir = "asc";
        let switchCount = 0;

        rowsArray.sort((a, b) => {
            let x = a.getElementsByTagName("TD")[columnIndex].textContent.toLowerCase();
            let y = b.getElementsByTagName("TD")[columnIndex].textContent.toLowerCase();
            if (dir === "asc") {
                if (x > y) {
                    return 1;
                }
                if (x < y) {
                    return -1;
                }
                return 0;
            } else if (dir === "desc") {
                if (x < y) {
                    return 1;
                }
                if (x > y) {
                    return -1;
                }
                return 0;
            }
        });

        if (switchCount === 0 && dir === "asc") {
            dir = "desc";
        }

        originalRows.splice(0, originalRows.length, ...rowsArray);

        displayRows(originalRows, 1);
        updatePaginationControls();
    }

    // Attach sorting function to table headers
    const headers = table.getElementsByTagName('th');
    for (let i = 0; i < headers.length; i++) {
        headers[i].addEventListener('click', function() {
            sortTable(i);
        });
    }

    // Initialize table with original rows and pagination
    displayRows(originalRows, currentPage);
    createPaginationControls();
    updatePaginationControls();
});
document.addEventListener('DOMContentLoaded', function() {
    const table = document.getElementById('certTable');
    const originalRows = Array.from(table.getElementsByTagName('tbody')[0].getElementsByTagName('tr'));
    const rowsPerPage = 15;
    let currentPage = 1;
    const totalPages = Math.ceil(originalRows.length / rowsPerPage);

    function displayRows(page) {
        const tbody = table.getElementsByTagName('tbody')[0];
        tbody.innerHTML = '';
        let start = (page - 1) * rowsPerPage;
        let end = page * rowsPerPage;
        originalRows.slice(start, end).forEach(row => tbody.appendChild(row));
    }

    function updatePaginationControls() {
        const paginationControls = document.querySelector('.pagination');
        const pageButtons = paginationControls.getElementsByTagName('button');

        for (let i = 0; i < pageButtons.length; i++) {
            pageButtons[i].classList.remove('active');
            if (parseInt(pageButtons[i].innerText) === currentPage) {
                pageButtons[i].classList.add('active');
            }
        }

        document.getElementById('prevBtn').disabled = currentPage === 1;
        document.getElementById('nextBtn').disabled = currentPage === totalPages;
    }

    document.getElementById('nextBtn').addEventListener('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            displayRows(currentPage);
            updatePaginationControls();
        }
    });

    document.getElementById('prevBtn').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            displayRows(currentPage);
            updatePaginationControls();
        }
    });

    function paginate(page) {
        currentPage = page;
        displayRows(currentPage);
        updatePaginationControls();
    }

    document.querySelectorAll('.pagination button').forEach(button => {
        if (!button.id) { // Exclude prev and next buttons
            button.addEventListener('click', function() {
                paginate(parseInt(button.innerText));
            });
        }
    });

    displayRows(currentPage);
    updatePaginationControls();

    // Search form submission
    document.getElementById('userSearchForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        let searchQuery = document.getElementById('mySearch').value.toLowerCase().trim();
        let filteredRows = originalRows.filter(row => {
            let cells = row.getElementsByTagName('td');
            for (let j = 0; j < cells.length; j++) {
                if (cells[j].textContent.toLowerCase().includes(searchQuery)) {
                    return true;
                }
            }
            return false;
        });

        originalRows.splice(0, originalRows.length, ...filteredRows);
        currentPage = 1;
        displayRows(currentPage);
        updatePaginationControls();
    });

    // Reset button click event
    document.getElementById('resetButton').addEventListener('click', function() {
        document.getElementById('mySearch').value = '';
        document.getElementById('filterColumn').value = 'all';
        originalRows.splice(0, originalRows.length, ...Array.from(table.getElementsByTagName('tbody')[0].getElementsByTagName('tr')));
        currentPage = 1;
        displayRows(currentPage);
        updatePaginationControls();
    });

    // Filter by provider
    document.getElementById('filterColumn').addEventListener('change', function() {
        let filter = document.getElementById('filterColumn').value.toLowerCase();
        let filteredRows = originalRows.filter(row => {
            let cells = row.getElementsByTagName('td');
            let found = false;
            for (let j = 2; j < cells.length; j++) {
                if (filter === 'all' || (cells[j].textContent.toLowerCase() === 'certificate' && cells[j].getAttribute('data-filter') === filter)) {
                    found = true;
                    break;
                }
            }
            return found;
        });

        originalRows.splice(0, originalRows.length, ...filteredRows);
        currentPage = 1;
        displayRows(currentPage);
        updatePaginationControls();
    });
});
