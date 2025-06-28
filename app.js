document.addEventListener('DOMContentLoaded', function() {
    const sendBtn = document.getElementById('sendBtn');
    const messageInput = document.getElementById('message');
    const numbersInput = document.getElementById('numbers');
    const delayInput = document.getElementById('delay');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const statusDiv = document.getElementById('status');
    
    sendBtn.addEventListener('click', function() {
        const message = messageInput.value.trim();
        const numbersText = numbersInput.value.trim();
        const delay = parseInt(delayInput.value) * 1000; // Convert to milliseconds
        
        if (!message) {
            alert('Please enter a message');
            return;
        }
        
        if (!numbersText) {
            alert('Please enter at least one phone number');
            return;
        }
        
        const numbers = numbersText.split('\n')
            .map(num => num.trim())
            .filter(num => num.length > 0);
        
        if (numbers.length === 0) {
            alert('Please enter valid phone numbers');
            return;
        }
        
        // Encode the message for URL
        const encodedMessage = encodeURIComponent(message);
        
        // Show progress
        progressContainer.style.display = 'block';
        progressBar.style.width = '0%';
        statusDiv.textContent = `Preparing to send to ${numbers.length} recipients...`;
        
        // Disable button during sending
        sendBtn.disabled = true;
        
        // Process numbers one by one with delay
        let processed = 0;
        const total = numbers.length;
        
        function processNextNumber() {
            if (processed >= total) {
                // All done
                progressBar.style.width = '100%';
                statusDiv.textContent = `All messages prepared for sending!`;
                sendBtn.disabled = false;
                return;
            }
            
            const currentNumber = numbers[processed];
            const whatsappUrl = `https://web.whatsapp.com/send?phone=${currentNumber}&text=${encodedMessage}`;
            
            // Update progress
            const progress = Math.round((processed / total) * 100);
            progressBar.style.width = `${progress}%`;
            statusDiv.textContent = `Opening chat with ${currentNumber} (${processed+1}/${total})...`;
            
            // Open in new tab
            window.open(whatsappUrl, '_blank');
            
            processed++;
            
            if (processed < total) {
                setTimeout(processNextNumber, delay);
            } else {
                processNextNumber(); // To trigger completion
            }
        }
        
        // Start processing
        setTimeout(processNextNumber, 1000);
    });
});
