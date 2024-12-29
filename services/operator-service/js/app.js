document.addEventListener('DOMContentLoaded', () => {
    // 1) Create a new operator
    document.getElementById('createOperatorBtn').addEventListener('click', () => {
      const operatorData = {
        operatorId: document.getElementById('operatorId').value,
        userName: document.getElementById('userName').value,
        passWord: document.getElementById('passWord').value,
        fullName: document.getElementById('fullName').value,
        address: document.getElementById('address').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        nic: document.getElementById('nic').value,
        email: document.getElementById('email').value,
      };
  
      // Validate if all fields are filled
      if (Object.values(operatorData).includes("")) {
        alert('Please fill in all fields');
        return;
      }
  
      // Send POST request to create the operator
      fetch('https://operator-service-193893744076.us-central1.run.app/operator-service/operators', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(operatorData),
      })
      .then(response => response.json())
      .then(data => {
        alert(data.message);  // Show success message
        document.getElementById('createOperatorForm').reset();  // Reset the form fields after submission
      })
      .catch(error => alert('Error creating operator: ' + error));
    });
  
    // 2) Fetch all operators
    document.getElementById('getAllOperatorsBtn').addEventListener('click', () => {
      fetch('https://operator-service-193893744076.us-central1.run.app/operator-service/operators')
        .then(response => response.json())
        .then(operators => {
          const operatorDetails = document.getElementById('operatorDetails');
          operatorDetails.innerHTML = '';  // Clear previous results
  
          if (operators.length === 0) {
            operatorDetails.innerHTML = 'No operators found.';
            return;
          }
  
          operators.forEach(operator => {
            const operatorDiv = document.createElement('div');
            operatorDiv.innerHTML = `
              <h3>Operator ID: ${operator.operatorId}</h3>
              <p><strong>Full Name:</strong> ${operator.fullName}</p>
              <p><strong>Username:</strong> ${operator.userName}</p>
              <p><strong>Email:</strong> ${operator.email}</p>
              <p><strong>Phone:</strong> ${operator.phoneNumber}</p>
              <hr>
            `;
            operatorDetails.appendChild(operatorDiv);
          });
        })
        .catch(error => {
          document.getElementById('operatorDetails').innerHTML = 'Error fetching operators: ' + error.message;
        });
    });
  
    // 3) Fetch an operator by ID
    document.getElementById('getOperatorByIdBtn').addEventListener('click', () => {
      const operatorId = document.getElementById('operatorIdInput').value.trim();
  
      if (!operatorId) {
        alert('Please enter a valid Operator ID.');
        return;
      }
  
      fetch(`https://operator-service-193893744076.us-central1.run.app/operator-service/operators/${operatorId}`)
        .then(response => response.json())
        .then(operator => {
          const operatorDetails = document.getElementById('operatorDetails');
          operatorDetails.innerHTML = '';  // Clear previous results
  
          if (!operator) {
            operatorDetails.innerHTML = 'Operator not found.';
            return;
          }
  
          const operatorDiv = document.createElement('div');
          operatorDiv.innerHTML = `
            <h3>Operator ID: ${operator.operatorId}</h3>
            <p><strong>Full Name:</strong> ${operator.fullName}</p>
            <p><strong>Username:</strong> ${operator.userName}</p>
            <p><strong>Email:</strong> ${operator.email}</p>
            <p><strong>Phone:</strong> ${operator.phoneNumber}</p>
          `;
          operatorDetails.appendChild(operatorDiv);
        })
        .catch(error => {
          document.getElementById('operatorDetails').innerHTML = 'Error fetching operator by ID: ' + error.message;
        });
    });
  
    // 4) Update an operator
    document.getElementById('updateOperatorBtn').addEventListener('click', () => {
      const operatorId = document.getElementById('updateOperatorId').value.trim();
      const updateData = {
        fullName: document.getElementById('updateFullName').value,
        address: document.getElementById('updateAddress').value,
        phoneNumber: document.getElementById('updatePhoneNumber').value,
      };
  
      if (!operatorId || !updateData.fullName || !updateData.address || !updateData.phoneNumber) {
        alert('Please fill in all fields');
        return;
      }
  
      fetch(`https://operator-service-193893744076.us-central1.run.app/operator-service/operators/${operatorId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      })
      .then(response => response.json())
      .then(data => {
        alert('Operator updated successfully');
      })
      .catch(error => alert('Error updating operator: ' + error));
    });
  
    // 5) Delete an operator
    document.getElementById('deleteOperatorBtn').addEventListener('click', () => {
      const operatorId = document.getElementById('deleteOperatorId').value.trim();
  
      if (!operatorId) {
        alert('Please enter a valid Operator ID.');
        return;
      }
  
      fetch(`https://operator-service-193893744076.us-central1.run.app/operator-service/operators/${operatorId}`, {
        method: 'DELETE',
      })
      .then(response => response.json())
      .then(data => {
        alert('Operator deleted successfully');
      })
      .catch(error => alert('Error deleting operator: ' + error));
    });
  });
  
