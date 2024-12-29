// Function to display routes in the table
function displayRoutes(routes) {
    const tableBody = document.getElementById('routesTableBody');
    tableBody.innerHTML = ''; // Clear previous data

    routes.forEach(route => {
      const row = document.createElement('tr');
      
      // Displaying the route information without the Actions column
      row.innerHTML = `
        <td>${route.routeId}</td>
        <td>${route.routeNumber}</td>
        <td>${route.routeName}</td>
        <td>${route.travelDistance}</td>
        <td>${route.travelDuration}</td>
        <td>${route.startLocation}</td>
        <td>${route.endLocation}</td>
      `;

      // Append the row to the table body
      tableBody.appendChild(row);
    });
}

// Fetch all routes and display them
document.getElementById('getRouteBtn').addEventListener('click', () => {
  fetch('https://route-service-193893744076.us-central1.run.app/route-service/routes')
    .then(response => response.json())
    .then(data => {
      displayRoutes(data);
    })
    .catch(error => alert('Error fetching routes: ' + error));
});

// Fetch route by route number
document.getElementById('getRouteByNumberBtn').addEventListener('click', () => {
  const routeNumber = document.getElementById('routeNumberInput').value;
  fetch(`https://route-service-193893744076.us-central1.run.app/route-service/routes/${routeNumber}`)
    .then(response => response.json())
    .then(data => {
      displayRoutes([data]); // Display the fetched route in a single row
    })
    .catch(error => alert('Error fetching route: ' + error));
});

// Create a new route
document.getElementById('addRouteBtn').addEventListener('click', () => {
  const routeData = {
    routeId: document.getElementById('routeId').value,
    routeNumber: document.getElementById('routeNumber').value,
    routeName: document.getElementById('routeName').value,
    startLocation: document.getElementById('startLocation').value,
    endLocation: document.getElementById('endLocation').value,
    travelDistance: document.getElementById('travelDistance').value,
    travelDuration: document.getElementById('travelDuration').value,
  };

  fetch('https://route-service-193893744076.us-central1.run.app/route-service/routes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(routeData),
  })
    .then(response => response.json())
    .then(data => {
      // Add the new route to the table
      displayRoutes([data]);
    })
    .catch(error => alert('Error creating route: ' + error));
});

// Delete a route
document.getElementById('deleteRouteBtn').addEventListener('click', () => {
  const routeNumber = document.getElementById('deleteRouteNumber').value;
  fetch(`https://route-service-193893744076.us-central1.run.app/route-service/routes/${routeNumber}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(data => {
      alert('Route deleted successfully');
      // After deletion, fetch all routes again to update the table
      fetch('https://route-service-193893744076.us-central1.run.app/route-service/routes')
        .then(response => response.json())
        .then(updatedData => {
          displayRoutes(updatedData);
        })
        .catch(error => alert('Error fetching routes: ' + error));
    })
    .catch(error => alert('Error deleting route: ' + error));
});
