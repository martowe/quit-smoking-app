document.addEventListener('DOMContentLoaded', function() {
  // Create print report button
  const createPrintButton = function() {
    const progressSection = document.querySelector('.main-content h3:contains("Progress:")').parentNode;
    
    if (progressSection) {
      const printButtonWrapper = document.createElement('div');
      printButtonWrapper.className = 'print-button-wrapper';
      printButtonWrapper.style.textAlign = 'right';
      printButtonWrapper.style.marginTop = '20px';
      
      const printButton = document.createElement('button');
      printButton.id = 'printReportBtn';
      printButton.className = 'print-report-button';
      printButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 6 2 18 2 18 9"></polyline>
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
          <rect x="6" y="14" width="12" height="8"></rect>
        </svg>
        Print Progress Report
      `;
      
      printButtonWrapper.appendChild(printButton);
      progressSection.appendChild(printButtonWrapper);
      
      // Add event listener to the print button
      printButton.addEventListener('click', generateAndPrintReport);
    }
  };
  
  // Generate and print the report
  const generateAndPrintReport = function() {
    // Get data from the page
    const quitDateTimeInput = document.getElementById('quitDateTime');
    const cigarettesPerDayInput = document.getElementById('cigarettesPerDay');
    const pricePerPackInput = document.getElementById('pricePerPack');
    const moneyGoalInput = document.getElementById('moneyGoal');
    const timeWithoutSmokingElement = document.getElementById('timeWithoutSmoking');
    const moneySavedElement = document.getElementById('moneySaved');
    const goalProgressElement = document.getElementById('goalProgress');
    const cigarettesNotSmokedElement = document.getElementById('cigarettesNotSmoked');
    
    // Savings table data
    const dailySavingsElement = document.getElementById('dailySavings');
    const weeklySavingsElement = document.getElementById('weeklySavings');
    const monthlySavingsElement = document.getElementById('monthlySavings');
    const yearlySavingsElement = document.getElementById('yearlySavings');
    
    if (!quitDateTimeInput || !quitDateTimeInput.value) {
      if (typeof showToast === 'function') {
        showToast('No quit plan data found', 'error', 3000);
      }
      return;
    }
    
    const quitDateTime = new Date(quitDateTimeInput.value);
    const formattedQuitDate = quitDateTime.toLocaleDateString();
    const formattedQuitTime = quitDateTime.toLocaleTimeString();
    const cigarettesPerDay = cigarettesPerDayInput ? cigarettesPerDayInput.value : '0';
    const pricePerPack = pricePerPackInput ? pricePerPackInput.value : '0';
    const moneyGoal = moneyGoalInput ? moneyGoalInput.value : '0';
    const timeWithoutSmoking = timeWithoutSmokingElement ? timeWithoutSmokingElement.textContent : '0d 0h 0m 0s';
    const moneySaved = moneySavedElement ? moneySavedElement.textContent : '$0.00';
    const goalProgress = goalProgressElement ? goalProgressElement.textContent : '0%';
    const cigarettesNotSmoked = cigarettesNotSmokedElement ? cigarettesNotSmokedElement.textContent : '0';
    
    // Create print window
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    
    // Get timestamp for the report
    const now = new Date();
    const reportDate = now.toLocaleDateString();
    const reportTime = now.toLocaleTimeString();
    
    // Generate report content
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Quit Smoking Progress Report</title>
        <style>
          body {
            font-family: 'Poppins', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          
          h1, h2, h3 {
            color: #3cb371;
          }
          
          h1 {
            text-align: center;
            border-bottom: 2px solid #3cb371;
            padding-bottom: 10px;
            margin-bottom: 30px;
          }
          
          .report-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
          }
          
          .report-section {
            margin-bottom: 30px;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          
          table, th, td {
            border: 1px solid #ddd;
          }
          
          th, td {
            padding: 12px;
            text-align: left;
          }
          
          th {
            background-color: #f2f2f2;
          }
          
          .highlight {
            font-weight: bold;
            color: #3cb371;
          }
          
          .stat-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin: 20px 0;
          }
          
          .stat-item {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #3cb371;
          }
          
          .stat-label {
            font-size: 14px;
            color: #666;
          }
          
          .stat-value {
            font-size: 20px;
            font-weight: bold;
            color: #3cb371;
          }
          
          .footer {
            text-align: center;
            margin-top: 40px;
            font-size: 12px;
            color: #666;
            border-top: 1px solid #ddd;
            padding-top: 10px;
          }
          
          @media print {
            body {
              padding: 0;
              margin: 0.5cm;
            }
            
            @page {
              margin: 1cm;
            }
          }
        </style>
      </head>
      <body>
        <h1>Quit Smoking Progress Report</h1>
        
        <div class="report-header">
          <div>
            <p><strong>Report Generated:</strong> ${reportDate}, ${reportTime}</p>
          </div>
        </div>
        
        <div class="report-section">
          <h2>Quit Plan Details</h2>
          <table>
            <tr>
              <th>Quit Date</th>
              <td>${formattedQuitDate}</td>
            </tr>
            <tr>
              <th>Quit Time</th>
              <td>${formattedQuitTime}</td>
            </tr>
            <tr>
              <th>Cigarettes Per Day</th>
              <td>${cigarettesPerDay}</td>
            </tr>
            <tr>
              <th>Price Per Pack</th>
              <td>$${pricePerPack}</td>
            </tr>
            <tr>
              <th>Money Goal</th>
              <td>$${moneyGoal}</td>
            </tr>
          </table>
        </div>
        
        <div class="report-section">
          <h2>Current Progress</h2>
          
          <div class="stat-grid">
            <div class="stat-item">
              <div class="stat-label">Time Smoke-Free</div>
              <div class="stat-value">${timeWithoutSmoking}</div>
            </div>
            
            <div class="stat-item">
              <div class="stat-label">Money Saved</div>
              <div class="stat-value">${moneySaved}</div>
            </div>
            
            <div class="stat-item">
              <div class="stat-label">Goal Progress</div>
              <div class="stat-value">${goalProgress}</div>
            </div>
            
            <div class="stat-item">
              <div class="stat-label">Cigarettes Not Smoked</div>
              <div class="stat-value">${cigarettesNotSmoked}</div>
            </div>
          </div>
        </div>
        
        <div class="report-section">
          <h2>Projected Savings</h2>
          <table>
            <tr>
              <th>Time Period</th>
              <th>Projected Savings</th>
            </tr>
            <tr>
              <td>Daily</td>
              <td>${dailySavingsElement ? dailySavingsElement.textContent : '$0.00'}</td>
            </tr>
            <tr>
              <td>Weekly</td>
              <td>${weeklySavingsElement ? weeklySavingsElement.textContent : '$0.00'}</td>
            </tr>
            <tr>
              <td>Monthly</td>
              <td>${monthlySavingsElement ? monthlySavingsElement.textContent : '$0.00'}</td>
            </tr>
            <tr>
              <td>Yearly</td>
              <td>${yearlySavingsElement ? yearlySavingsElement.textContent : '$0.00'}</td>
            </tr>
          </table>
        </div>
        
        <div class="report-section">
          <h2>Health Benefits Timeline</h2>
          <p>Here's what happens to your body when you quit smoking:</p>
          <table>
            <tr>
              <th>Time Since Quitting</th>
              <th>Health Benefit</th>
            </tr>
            <tr>
              <td>20 minutes</td>
              <td>Your heart rate and blood pressure drop</td>
            </tr>
            <tr>
              <td>12 hours</td>
              <td>The carbon monoxide level in your blood drops to normal</td>
            </tr>
            <tr>
              <td>2-12 weeks</td>
              <td>Your circulation improves and lung function increases</td>
            </tr>
            <tr>
              <td>1-9 months</td>
              <td>Coughing and shortness of breath decrease</td>
            </tr>
            <tr>
              <td>1 year</td>
              <td>Your risk of coronary heart disease is about half that of a smoker's</td>
            </tr>
            <tr>
              <td>5-15 years</td>
              <td>Your stroke risk is reduced to that of a nonsmoker</td>
            </tr>
          </table>
        </div>
        
        <div class="footer">
          <p>Generated by QuitSmoke App | Keep going, you're doing great!</p>
        </div>
        
        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
      </html>
    `);
    
    printWindow.document.close();
  };
  
  // Add print button to the page
  createPrintButton();
});
