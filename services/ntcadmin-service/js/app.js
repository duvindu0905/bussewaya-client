// Fetch all NTC admins and display them
document.getElementById('getAllNtcadminsBtn').addEventListener('click', () => {
    fetch('https://ntcadmin-service-193893744076.us-central1.run.app/ntcadmin-service/ntcadmins')
      .then(response => response.json())
      .then(ntcadmins => {
        const ntcadminDetails = document.getElementById('ntcadminDetails');
        ntcadminDetails.innerHTML = ''; // Clear previous results
  
        if (ntcadmins.length === 0) {
          ntcadminDetails.innerHTML = 'No NTC Admins found.';
          return;
        }
  
        ntcadmins.forEach(admin => {
          const adminDiv = document.createElement('div');
          adminDiv.innerHTML = `
            <h3>NTC Admin ID: ${admin.ntcadminId}</h3>
            <p><strong>Full Name:</strong> ${admin.fullName}</p>
            <p><strong>Username:</strong> ${admin.userName}</p>
            <p><strong>Email:</strong> ${admin.email}</p>
            <p><strong>Phone:</strong> ${admin.phoneNumber}</p>
            <hr>
          `;
          ntcadminDetails.appendChild(adminDiv);
        });
      })
      .catch(error => {
        document.getElementById('ntcadminDetails').innerHTML = 'Error fetching NTC admins: ' + error.message;
      });
  });
  
  // Fetch NTC admin by ID and display their details
  document.getElementById('getNtcadminByIdBtn').addEventListener('click', () => {
    const ntcadminId = document.getElementById('ntcadminIdInput').value.trim();
  
    if (!ntcadminId) {
      alert('Please enter a valid NTC Admin ID.');
      return;
    }
  
    fetch(`https://ntcadmin-service-193893744076.us-central1.run.app/ntcadmin-service/ntcadmins/${ntcadminId}`)
      .then(response => response.json())
      .then(admin => {
        const ntcadminDetails = document.getElementById('ntcadminDetails');
        ntcadminDetails.innerHTML = ''; // Clear previous results
  
        if (!admin) {
          ntcadminDetails.innerHTML = 'NTC Admin not found.';
          return;
        }
  
        const adminDiv = document.createElement('div');
        adminDiv.innerHTML = `
          <h3>NTC Admin ID: ${admin.ntcadminId}</h3>
          <p><strong>Full Name:</strong> ${admin.fullName}</p>
          <p><strong>Username:</strong> ${admin.userName}</p>
          <p><strong>Email:</strong> ${admin.email}</p>
          <p><strong>Phone:</strong> ${admin.phoneNumber}</p>
        `;
        ntcadminDetails.appendChild(adminDiv);
      })
      .catch(error => {
        document.getElementById('ntcadminDetails').innerHTML = 'Error fetching NTC admin by ID: ' + error.message;
      });
  });
  