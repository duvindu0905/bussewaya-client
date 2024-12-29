// Fetch route numbers, schedule IDs, and permit numbers to populate the dropdowns
document.addEventListener('DOMContentLoaded', () => {
    // Fetch routes for the route dropdown
    fetch('https://route-service-193893744076.us-central1.run.app/route-service/routes')
        .then(response => response.json())
        .then(routes => {
            const routeDropdown = document.getElementById('routeNumber');
            routes.forEach(route => {
                const option = document.createElement('option');
                option.value = route.routeNumber;
                option.textContent = route.routeName;
                routeDropdown.appendChild(option);
            });
        })
        .catch(error => alert('Error fetching route data: ' + error));

    // Fetch schedule IDs for the schedule dropdown
    fetch('https://schedule-service-193893744076.us-central1.run.app/schedule-service/schedules')
        .then(response => response.json())
        .then(schedules => {
            const scheduleDropdown = document.getElementById('scheduleId');
            schedules.forEach(schedule => {
                const option = document.createElement('option');
                option.value = schedule.scheduleId;
                option.textContent = `Schedule ${schedule.scheduleId}`;
                scheduleDropdown.appendChild(option);
            });
        })
        .catch(error => alert('Error fetching schedule data: ' + error));

    // Fetch permit numbers for the permit dropdown
    fetch('https://permit-service-193893744076.us-central1.run.app/permit-service/permits')
        .then(response => response.json())
        .then(permits => {
            const permitDropdown = document.getElementById('permitNumber');
            permits.forEach(permit => {
                const option = document.createElement('option');
                option.value = permit.permitNumber;
                option.textContent = permit.permitNumber;
                permitDropdown.appendChild(option);
            });
        })
        .catch(error => alert('Error fetching permit data: ' + error));
});

// Function to create a new trip (POST)
document.getElementById('addTripBtn').addEventListener('click', () => {
    const tripData = {
        tripId: document.getElementById('tripId').value,
        tripNumber: document.getElementById('tripNumber').value,
        tripDate: document.getElementById('tripDate').value,
        bookingStatus: document.getElementById('bookingStatus').value,
        routeNumber: document.getElementById('routeNumber').value,
        scheduleId: document.getElementById('scheduleId').value,
        permitNumber: document.getElementById('permitNumber').value,
    };

    fetch('https://trip-service-193893744076.us-central1.run.app/trip-service/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tripData),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        displayTrips([data.trip]); // Display the newly created trip
    })
    .catch(error => alert('Error creating trip: ' + error));
});

// Function to display trips as cards
function displayTrips(trips) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous data

    trips.forEach(trip => {
        const card = document.createElement('div');
        card.classList.add('trip-card'); // Adding a class for styling the card
        
        // Adding the trip details into the card
        card.innerHTML = `
            <div class="trip-card-header">
                <h3>Trip Number: ${trip.tripNumber}</h3>
                <p><strong>Trip ID:</strong> ${trip.tripId}</p>
            </div>
            <div class="trip-card-body">
                <p><strong>Date:</strong> ${trip.tripDate}</p>
                <p><strong>Booking Status:</strong> ${trip.bookingStatus}</p>
                <p><strong>Route:</strong> ${trip.routeName} (${trip.routeNumber})</p>
                <p><strong>Departure Time:</strong> ${trip.departureTime}</p>
                <p><strong>Arrival Time:</strong> ${trip.arrivalTime}</p>
                <p><strong>Start Location:</strong> ${trip.startLocation}</p>
                <p><strong>End Location:</strong> ${trip.endLocation}</p>
                <p><strong>Price Per Seat:</strong> ${trip.pricePerSeat}</p>
                <p><strong>Capacity:</strong> ${trip.numberCapacity}</p>
                <p><strong>Confirmed Seats:</strong> ${trip.confirmedSeats.join(', ')}</p>
                <p><strong>Available Seats:</strong> ${trip.availableSeats.join(', ')}</p>
                <p><strong>Bus Type:</strong> ${trip.busType}</p>
                <p><strong>Music:</strong> ${trip.music ? 'Yes' : 'No'}</p>
                <p><strong>AC:</strong> ${trip.ac ? 'Yes' : 'No'}</p>
            </div>
            <div class="trip-card-footer">
                <button onclick="deleteTrip('${trip.tripId}')">Delete Trip</button>
                <button onclick="getTripById('${trip.tripId}')">View Trip</button>
            </div>
        `;

        // Append the card to the container
        resultsContainer.appendChild(card);
    });
}

// Fetch trip by ID
document.getElementById('getTripByIdBtn').addEventListener('click', () => {
    const tripId = document.getElementById('tripIdInput').value.trim();
    if (!tripId) {
        alert('Please enter a valid Trip ID.');
        return;
    }

    fetch(`https://trip-service-193893744076.us-central1.run.app/trip-service/trips/${tripId}`)
        .then(response => response.json())
        .then(data => {
            displayTrips([data]); // Display the fetched trip details
        })
        .catch(error => {
            console.error('Error fetching trip:', error);
            alert('Error fetching trip. Please try again later.');
        });
});

// Delete trip by ID
document.getElementById('deleteTripBtn').addEventListener('click', () => {
    const tripId = document.getElementById('deleteTripId').value.trim();
    if (!tripId) {
        alert('Please enter a valid Trip ID.');
        return;
    }

    fetch(`https://trip-service-193893744076.us-central1.run.app/trip-service/trips/${tripId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        // Optionally, reload or refresh the list of trips
        fetchTrips(); // This could be your existing fetchTrips function to reload data
    })
    .catch(error => {
        console.error('Error deleting trip:', error);
        alert('Error deleting trip. Please try again later.');
    });
});
