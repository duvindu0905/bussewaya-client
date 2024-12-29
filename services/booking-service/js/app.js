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

// Function to create a new booking (POST)
document.getElementById('addBookingBtn').addEventListener('click', () => {
    const bookingData = {
        bookingId: document.getElementById('bookingId').value,
        commuterId: document.getElementById('commuterId').value,
        commuterName: document.getElementById('commuterName').value,
        commuterEmail: document.getElementById('commuterEmail').value,
        nic: document.getElementById('nic').value,
        mobileNumber: document.getElementById('mobileNumber').value,
        seatNumber: document.getElementById('seatNumber').value,
        routeNumber: document.getElementById('routeNumber').value,
        scheduleId: document.getElementById('scheduleId').value,
        permitNumber: document.getElementById('permitNumber').value,
        tripId: document.getElementById('tripId').value, // Now it's fetched from the input field
    };

    fetch('https://booking-service-193893744076.us-central1.run.app/booking-service/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        displayBookings([data.booking]); // Display the newly created booking
    })
    .catch(error => alert('Error creating booking: ' + error));
});

// Function to display bookings as cards
function displayBookings(bookings) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous data

    bookings.forEach(booking => {
        const card = document.createElement('div');
        card.classList.add('booking-card'); // Adding a class for styling the card
        
        // Adding the booking details into the card
        card.innerHTML = `
            <div class="booking-card-header">
                <h3>Booking ID: ${booking.bookingId}</h3>
                <p><strong>Commuter Name:</strong> ${booking.commuterName}</p>
            </div>
            <div class="booking-card-body">
                <p><strong>Commuter Email:</strong> ${booking.commuterEmail}</p>
                <p><strong>NIC:</strong> ${booking.nic}</p>
                <p><strong>Mobile Number:</strong> ${booking.mobileNumber}</p>
                <p><strong>Seat Number:</strong> ${booking.seatNumber}</p>
                <p><strong>Route Number:</strong> ${booking.routeNumber}</p>
                <p><strong>Trip ID:</strong> ${booking.tripId}</p>
                <p><strong>Trip Number:</strong> ${booking.tripNumber}</p>
                <p><strong>Trip Date:</strong> ${booking.tripDate}</p>
                <p><strong>Start Location:</strong> ${booking.startLocation}</p>
                <p><strong>End Location:</strong> ${booking.endLocation}</p>
                <p><strong>Schedule ID:</strong> ${booking.scheduleId}</p>
                <p><strong>Departure Time:</strong> ${booking.departureTime}</p>
                <p><strong>Arrival Time:</strong> ${booking.arrivalTime}</p>
                <p><strong>Permit Number:</strong> ${booking.permitNumber}</p>
                <p><strong>Vehicle Number:</strong> ${booking.vehicleNumber}</p>
                <p><strong>Bus Type:</strong> ${booking.busType}</p>
                <p><strong>Price Per Seat:</strong> ${booking.pricePerSeat}</p>
                <p><strong>Music:</strong> ${booking.music ? 'Yes' : 'No'}</p>
                <p><strong>AC:</strong> ${booking.ac ? 'Yes' : 'No'}</p>
                <p><strong>Payment Status:</strong> ${booking.paymentStatus}</p>
                <p><strong>Booking Date:</strong> ${new Date(booking.createdAt).toLocaleString()}</p>
            </div>
            <div class="booking-card-footer">
                <button onclick="deleteBooking('${booking.bookingId}')">Delete Booking</button>
                <button onclick="getBookingById('${booking.bookingId}')">View Booking</button>
            </div>
        `;

        // Append the card to the container
        resultsContainer.appendChild(card);
    });
}


// Fetch all bookings
document.getElementById('getAllBookingsBtn').addEventListener('click', () => {
    fetch('https://booking-service-193893744076.us-central1.run.app/booking-service/bookings')
        .then(response => response.json())
        .then(data => {
            displayBookings(data); // Display all bookings
        })
        .catch(error => {
            console.error('Error fetching all bookings:', error);
            alert('Error fetching bookings. Please try again later.');
        });
});

// Fetch booking by NIC
document.getElementById('getBookingByNicBtn').addEventListener('click', () => {
    const nic = document.getElementById('nicInput').value.trim();
    if (!nic) {
        alert('Please enter a valid NIC.');
        return;
    }

    fetch(`https://booking-service-193893744076.us-central1.run.app/booking-service/bookings/nic/${nic}`)
        .then(response => response.json())
        .then(data => {
            displayBookings([data]); // Display the fetched booking details
        })
        .catch(error => {
            console.error('Error fetching booking by NIC:', error);
            alert('Error fetching booking. Please try again later.');
        });
});

// Fetch bookings by tripId
document.getElementById('getBookingsByTripIdBtn').addEventListener('click', () => {
    const tripId = document.getElementById('tripIdInput').value.trim();
    if (!tripId) {
        alert('Please enter a valid Trip ID.');
        return;
    }

    fetch(`https://booking-service-193893744076.us-central1.run.app/booking-service/bookings/tripId/${tripId}`)
        .then(response => response.json())
        .then(data => {
            displayBookings(data); // Display bookings for the specific trip
        })
        .catch(error => {
            console.error('Error fetching bookings by Trip ID:', error);
            alert('Error fetching bookings. Please try again later.');
        });
});

// Update payment status and confirm seat
document.getElementById('updatePaymentBtn').addEventListener('click', () => {
    const bookingId = document.getElementById('bookingIdForPayment').value.trim();
    
    if (!bookingId) {
        alert('Please enter a valid Booking ID.');
        return;
    }

    fetch('https://booking-service-193893744076.us-central1.run.app/booking-service/bookings/payment', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId: bookingId })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); // Display success message
        displayBookings([data.booking]); // Display the updated booking details
    })
    .catch(error => {
        console.error('Error updating payment status:', error);
        alert('Error processing payment. Please try again later.');
    });
});
