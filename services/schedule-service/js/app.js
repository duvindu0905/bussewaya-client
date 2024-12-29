// Fetch route numbers and populate the route dropdown
document.addEventListener('DOMContentLoaded', () => {
    // Fetch route data
    fetch('https://route-service-193893744076.us-central1.run.app/route-service/routes')
        .then(response => response.json())
        .then(routes => {
            const routeDropdown = document.getElementById('routeNumber');
            routes.forEach(route => {
                const option = document.createElement('option');
                option.value = route.routeNumber;
                option.textContent = route.routeName; // Display the route name
                routeDropdown.appendChild(option);
            });
        })
        .catch(error => alert('Error fetching route data: ' + error));

    // Fetch permit numbers and populate the permit dropdown
    fetch('https://permit-service-193893744076.us-central1.run.app/permit-service/permits')
        .then(response => response.json())
        .then(permits => {
            const permitDropdown = document.getElementById('permitNumber');
            permits.forEach(permit => {
                const option = document.createElement('option');
                option.value = permit.permitNumber;
                option.textContent = permit.permitNumber; // Display the permit number
                permitDropdown.appendChild(option);
            });
        })
        .catch(error => alert('Error fetching permit data: ' + error));
});

// Function to create a new schedule (POST)
document.getElementById('addScheduleBtn').addEventListener('click', () => {
    const scheduleData = {
        scheduleId: document.getElementById('scheduleId').value,
        departureTime: document.getElementById('departureTime').value,
        arrivalTime: document.getElementById('arrivalTime').value,
        routeNumber: document.getElementById('routeNumber').value,
        permitNumber: document.getElementById('permitNumber').value,
    };

    // Send the new schedule data to the backend
    fetch('https://schedule-service-193893744076.us-central1.run.app/schedule-service/schedules', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(scheduleData),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); // Display success message
        displaySchedules([data.schedule]); // Display the newly created schedule
    })
    .catch(error => alert('Error creating schedule: ' + error));
});

// Function to display schedules in the table with all details
function displaySchedules(schedules) {
    const tableBody = document.getElementById('schedulesTableBody');
    tableBody.innerHTML = ''; // Clear previous data

    schedules.forEach(schedule => {
        const row = document.createElement('tr');
        
        // Adding the schedule details into the row
        row.innerHTML = `
            <td>${schedule.scheduleId}</td>
            <td>${schedule.departureTime}</td>
            <td>${schedule.arrivalTime}</td>
            <td>${schedule.routeNumber}</td>
            <td>${schedule.permitNumber}</td>
            <td>${schedule.startLocation}</td>
            <td>${schedule.endLocation}</td>
            <td>${schedule.routeName}</td>
            <td>${schedule.vehicleNumber}</td>
            <td>${new Date(schedule.createdAt).toLocaleString()}</td> <!-- Format createdAt -->
            <td>
                <button onclick="deleteSchedule('${schedule.scheduleId}')">Delete</button>
                <button onclick="updateSchedule('${schedule.scheduleId}')">Update</button>
            </td>
        `;
        
        // Append the row to the table
        tableBody.appendChild(row);
    });
}

// Function to fetch all schedules from the backend
document.getElementById('getAllSchedulesBtn').addEventListener('click', () => {
    fetch('https://schedule-service-193893744076.us-central1.run.app/schedule-service/schedules')
        .then(response => response.json())
        .then(data => {
            displaySchedules(data); // Display all the schedules
        })
        .catch(error => alert('Error fetching schedules: ' + error));
});

// Function to get schedule by schedule ID
document.getElementById('getScheduleByIdBtn').addEventListener('click', () => {
    const scheduleId = document.getElementById('scheduleIdInput').value.trim(); // Get the schedule ID from input

    if (!scheduleId) {
        alert('Please enter a valid Schedule ID.');
        return;
    }

    // Construct the URL with the entered schedule ID
    const url = `https://schedule-service-193893744076.us-central1.run.app/schedule-service/schedules/${scheduleId}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Schedule not found.');
            }
            return response.json();
        })
        .then(data => {
            displaySchedules([data]); // Display the fetched schedule in a single row
        })
        .catch(error => {
            alert('Error fetching schedule: ' + error.message);
        });
});

// Function to delete a schedule by schedule ID
function deleteSchedule(scheduleId) {
    fetch(`https://schedule-service-193893744076.us-central1.run.app/schedule-service/schedules/${scheduleId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        alert('Schedule deleted successfully');
        // Refresh the schedule list after deletion
        fetch('https://schedule-service-193893744076.us-central1.run.app/schedule-service/schedules')
            .then(response => response.json())
            .then(updatedData => {
                displaySchedules(updatedData);
            })
            .catch(error => alert('Error fetching schedules: ' + error));
    })
    .catch(error => alert('Error deleting schedule: ' + error));
}

// Function to update a schedule (optional, you can implement a form for this)
function updateSchedule(scheduleId) {
    const updatedScheduleData = {
        scheduleId: prompt('Enter new Schedule ID:'),
        departureTime: prompt('Enter new Departure Time:'),
        arrivalTime: prompt('Enter new Arrival Time:'),
        routeNumber: prompt('Enter new Route Number:'),
        permitNumber: prompt('Enter new Permit Number:'),
    };

    fetch(`https://schedule-service-193893744076.us-central1.run.app/schedule-service/schedules/${scheduleId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedScheduleData),
    })
    .then(response => response.json())
    .then(data => {
        alert('Schedule updated successfully');
        displaySchedules([data.schedule]);
    })
    .catch(error => alert('Error updating schedule: ' + error));
};
