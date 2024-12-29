// Fetch all routes and populate the route dropdown
function populateRouteDropdown() {
    fetch('https://route-service-193893744076.us-central1.run.app/route-service/routes')
      .then(response => response.json())
      .then(routes => {
        const routeDropdown = document.getElementById('routeNumber');
        routes.forEach(route => {
          const option = document.createElement('option');
          option.value = route.routeNumber;
          option.textContent = route.routeNumber;
          routeDropdown.appendChild(option);
        });
      })
      .catch(error => console.error('Error fetching routes:', error));
  }
  
  // Function to display permits in the table
  function displayPermits(permits) {
    const tableBody = document.getElementById('permitsTableBody');
    tableBody.innerHTML = ''; // Clear previous data
  
    permits.forEach(permit => {
      const row = document.createElement('tr');
  
      // Creating table row and inserting permit details
      row.innerHTML = `
        <td>${permit.permitId}</td>
        <td>${permit.permitNumber}</td>
        <td>${permit.expiryAt}</td>
        <td>${permit.vehicleNumber}</td>
        <td>${permit.routeName || 'Route Not Found'}</td>
        <td>${permit.busOwner}</td>
        <td>${permit.busType}</td>
        <td>${permit.numberCapacity}</td>
        <td>${permit.pricePerSeat}</td>
        <td>
          <button class="deleteBtn" onclick="deletePermit('${permit.permitNumber}')">Delete</button>
          <button class="updateBtn" onclick="updatePermit('${permit.permitNumber}')">Update</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  // Fetch all permits and display them
  document.getElementById('getAllPermitsBtn').addEventListener('click', () => {
    fetch('https://permit-service-193893744076.us-central1.run.app/permit-service/permits')
      .then(response => response.json())
      .then(data => {
        displayPermits(data);
      })
      .catch(error => alert('Error fetching permits: ' + error));
  });
  
  // Fetch permit by permit number
  document.getElementById('getPermitByNumberBtn').addEventListener('click', () => {
    const permitNumber = document.getElementById('permitNumberInput').value;
    fetch(`https://permit-service-193893744076.us-central1.run.app/permit-service/permits/${permitNumber}`)
      .then(response => response.json())
      .then(data => {
        displayPermits([data]); // Display the fetched permit in a single row
      })
      .catch(error => alert('Error fetching permit: ' + error));
  });
  
  // Create a new permit (POST)
  document.getElementById('addPermitBtn').addEventListener('click', () => {
    const permitData = {
      permitId: document.getElementById('permitId').value,
      permitNumber: document.getElementById('permitNumber').value,
      expiryAt: document.getElementById('expiryAt').value,
      vehicleNumber: document.getElementById('vehicleNumber').value,
      routeNumber: document.getElementById('routeNumber').value,
      busOwner: document.getElementById('busOwner').value,
      busType: document.getElementById('busType').value,
      numberCapacity: document.getElementById('numberCapacity').value,
      pricePerSeat: document.getElementById('pricePerSeat').value,
      music: document.getElementById('music').checked,
      ac: document.getElementById('ac').checked
    };
  
    // Fetch route data before creating the permit
    fetchRouteData(permitData.routeNumber)
      .then(routeData => {
        permitData.routeName = routeData.routeName || 'Unknown Route'; // Set the route name
  
        // Send the permit data to the backend (POST request)
        fetch('https://permit-service-193893744076.us-central1.run.app/permit-service/permits', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(permitData),
        })
          .then(response => response.json())
          .then(data => {
            alert(data.message); // Display success message
            displayPermits([data.permit]); // Display the newly created permit
          })
          .catch(error => alert('Error creating permit: ' + error));
      })
      .catch(error => {
        alert('Error fetching route data for new permit: ' + error);
      });
  });
  
  // Delete a permit by permit number (DELETE)
  function deletePermit(permitNumber) {
    fetch(`https://permit-service-193893744076.us-central1.run.app/permit-service/permits/${permitNumber}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        alert('Permit deleted successfully');
        // Refresh the table after deletion
        fetch('https://permit-service-193893744076.us-central1.run.app/permit-service/permits')
          .then(response => response.json())
          .then(updatedData => {
            displayPermits(updatedData);
          })
          .catch(error => alert('Error fetching permits: ' + error));
      })
      .catch(error => alert('Error deleting permit: ' + error));
  }
  
  // Function to fetch route data from the Route Service
  function fetchRouteData(routeNumber) {
    return fetch(`https://route-service-193893744076.us-central1.run.app/route-service/routes/${routeNumber}`)
      .then(response => response.json())
      .catch(error => {
        console.error('Error fetching route data:', error);
        return { routeName: 'Unknown Route' }; // Fallback if route data can't be fetched
      });
  }
  
  // Populate the route dropdown on page load
  window.onload = populateRouteDropdown;
  