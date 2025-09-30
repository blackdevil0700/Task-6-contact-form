const form = document.getElementById('contactForm');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const successMessage = document.getElementById('successMessage');
        const charCount = document.getElementById('charCount');

        // Error message elements
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const messageError = document.getElementById('messageError');

        // Success icons
        const nameIcon = document.getElementById('nameIcon');
        const emailIcon = document.getElementById('emailIcon');
        const messageIcon = document.getElementById('messageIcon');

        // Email validation regex (RFC 5322 simplified)
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Character counter for message
        messageInput.addEventListener('input', () => {
            const length = messageInput.value.length;
            charCount.textContent = `${length} / 500 characters`;
        });

        // Real-time validation on blur
        nameInput.addEventListener('blur', () => validateName());
        emailInput.addEventListener('blur', () => validateEmail());
        messageInput.addEventListener('blur', () => validateMessage());

        // Clear error on input
        nameInput.addEventListener('input', () => clearError(nameInput, nameError, nameIcon));
        emailInput.addEventListener('input', () => clearError(emailInput, emailError, emailIcon));
        messageInput.addEventListener('input', () => clearError(messageInput, messageError, messageIcon));

        // Validation functions
        function validateName() {
            const name = nameInput.value.trim();
            
            if (name === '') {
                showError(nameInput, nameError, nameIcon, 'Name is required');
                return false;
            }
            
            if (name.length < 2) {
                showError(nameInput, nameError, nameIcon, 'Name must be at least 2 characters long');
                return false;
            }
            
            if (name.length > 50) {
                showError(nameInput, nameError, nameIcon, 'Name must be less than 50 characters');
                return false;
            }
            
            if (!/^[a-zA-Z\s'-]+$/.test(name)) {
                showError(nameInput, nameError, nameIcon, 'Name can only contain letters, spaces, hyphens, and apostrophes');
                return false;
            }
            
            showSuccess(nameInput, nameError, nameIcon);
            return true;
        }

        function validateEmail() {
            const email = emailInput.value.trim();
            
            if (email === '') {
                showError(emailInput, emailError, emailIcon, 'Email is required');
                return false;
            }
            
            if (!emailRegex.test(email)) {
                showError(emailInput, emailError, emailIcon, 'Please enter a valid email address');
                return false;
            }
            
            if (email.length > 100) {
                showError(emailInput, emailError, emailIcon, 'Email must be less than 100 characters');
                return false;
            }
            
            showSuccess(emailInput, emailError, emailIcon);
            return true;
        }

        function validateMessage() {
            const message = messageInput.value.trim();
            
            if (message === '') {
                showError(messageInput, messageError, messageIcon, 'Message is required');
                return false;
            }
            
            if (message.length < 10) {
                showError(messageInput, messageError, messageIcon, 'Message must be at least 10 characters long');
                return false;
            }
            
            if (message.length > 500) {
                showError(messageInput, messageError, messageIcon, 'Message must be less than 500 characters');
                return false;
            }
            
            showSuccess(messageInput, messageError, messageIcon);
            return true;
        }

        function showError(input, errorElement, icon, message) {
            input.classList.add('error');
            input.classList.remove('success');
            errorElement.textContent = message;
            errorElement.classList.add('show');
            icon.classList.remove('show');
        }

        function showSuccess(input, errorElement, icon) {
            input.classList.remove('error');
            input.classList.add('success');
            errorElement.classList.remove('show');
            icon.classList.add('show');
        }

        function clearError(input, errorElement, icon) {
            input.classList.remove('error');
            errorElement.classList.remove('show');
            icon.classList.remove('show');
        }

        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Hide success message if visible
            successMessage.classList.remove('show');
            
            // Validate all fields
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isMessageValid = validateMessage();
            
            // Check if all validations passed
            if (isNameValid && isEmailValid && isMessageValid) {
                // Show success message
                successMessage.classList.add('show');
                
                // Log form data (for demonstration)
                console.log('Form submitted successfully!');
                console.log({
                    name: nameInput.value.trim(),
                    email: emailInput.value.trim(),
                    message: messageInput.value.trim()
                });
                
                // Reset form
                form.reset();
                charCount.textContent = '0 / 500 characters';
                
                // Clear success indicators
                nameInput.classList.remove('success');
                emailInput.classList.remove('success');
                messageInput.classList.remove('success');
                nameIcon.classList.remove('show');
                emailIcon.classList.remove('show');
                messageIcon.classList.remove('show');
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                // Scroll to first error
                const firstError = document.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.focus();
                }
            }
        });