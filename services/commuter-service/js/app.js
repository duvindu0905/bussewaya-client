// Handle creating a new commuter
document.getElementById('createCommuterBtn').addEventListener('click', () => {
    const commuterData = {
        commuterId: document.getElementById('commuterId').value,
        commuterName: document.getElementById('commuterName').value,
        commuterEmail: document.getElementById('commuterEmail').value,
        nic: document.getElementById('nic').value,
        mobileNumber: document.getElementById('mobileNumber').value,
    };

    if (!commuterData.commuterId || !commuterData.commuterName || !commuterData.commuterEmail || !commuterData.nic || !commuterData.mobileNumber) {
        alert('Please fill in all fields.');
        return;
    }

    // Send the commuter data to the backend
    fetch('https://commuter-service-193893744076.us-central1.run.app/commuter-service/commuters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commuterData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Commuter created successfully') {
            document.getElementById('message').innerHTML = 'Commuter created successfully!';
            document.getElementById('commuterForm').reset();
        } else {
            document.getElementById('message').innerHTML = 'Error creating commuter: ' + data.message;
        }
    })
    .catch(error => {
        document.getElementById('message').innerHTML = 'Error: ' + error.message;
    });
});

// Handle getting all commuters
document.getElementById('getAllCommutersBtn').addEventListener('click', () => {
    fetch('https://commuter-service-193893744076.us-central1.run.app/commuter-service/commuters')
        .then(response => response.json())
        .then(commuters => {
            const commuterList = document.getElementById('commuterList');
            commuterList.innerHTML = '';  // Clear previous results

            if (commuters.length === 0) {
                commuterList.innerHTML = 'No commuters found.';
                return;
            }

            commuters.forEach(commuter => {
                const commuterDiv = document.createElement('div');
                commuterDiv.innerHTML = `
                    <h3>Commuter ID: ${commuter.commuterId}</h3>
                    <p><strong>Name:</strong> ${commuter.commuterName}</p>
                    <p><strong>Email:</strong> ${commuter.commuterEmail}</p>
                    <p><strong>NIC:</strong> ${commuter.nic}</p>
                    <p><strong>Mobile Number:</strong> ${commuter.mobileNumber}</p>
                    <hr>
                `;
                commuterList.appendChild(commuterDiv);
            });
        })
        .catch(error => {
            document.getElementById('commuterList').innerHTML = 'Error fetching commuters: ' + error.message;
        });
});

// Handle getting commuter by ID
document.getElementById('getCommuterByIdBtn').addEventListener('click', () => {
    const commuterId = document.getElementById('commuterIdInput').value.trim();

    if (!commuterId) {
        alert('Please enter a valid Commuter ID.');
        return;
    }

    fetch(`https://commuter-service-193893744076.us-central1.run.app/commuter-service/commuters/${commuterId}`)
        .then(response => response.json())
        .then(commuter => {
            const commuterList = document.getElementById('commuterList');
            commuterList.innerHTML = '';  // Clear previous results

            if (!commuter) {
                commuterList.innerHTML = 'Commuter not found.';
                return;
            }

            const commuterDiv = document.createElement('div');
            commuterDiv.innerHTML = `
                <h3>Commuter ID: ${commuter.commuterId}</h3>
                <p><strong>Name:</strong> ${commuter.commuterName}</p>
                <p><strong>Email:</strong> ${commuter.commuterEmail}</p>
                <p><strong>NIC:</strong> ${commuter.nic}</p>
                <p><strong>Mobile Number:</strong> ${commuter.mobileNumber}</p>
            `;
            commuterList.appendChild(commuterDiv);
        })
        .catch(error => {
            document.getElementById('commuterList').innerHTML = 'Error fetching commuter by ID: ' + error.message;
        });
});
