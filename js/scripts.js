// Ensure the DOM is fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent default form submission

            const email = loginForm.querySelector('input[name="email"]').value;
            const password = loginForm.querySelector('input[name="password"]').value;

            try {
                const response = await fetch('/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json(); // Parse the JSON response

                if (response.ok) { // Check if HTTP status is 2xx
                    console.log('Login successful:', data);
                    // Store user info (including token) in localStorage
                    localStorage.setItem('userInfo', JSON.stringify(data));
                    alert('Login Successful!'); // User-friendly alert
                    window.location.href = 'index.html'; // Redirect to home page
                } else {
                    // Handle server-side errors (e.g., 401 Unauthorized, 400 Bad Request)
                    console.error('Login failed:', data.message || 'Something went wrong');
                    alert(data.message || 'Login failed. Please check your credentials.');
                }
            } catch (error) {
                // Handle network errors or other unexpected issues
                console.error('Network error or unexpected error during login:', error);
                alert('An error occurred. Please try again later.');
            }
        });
    }

    // Keep the password toggle functionality if it's in this file
    const togglePassword = document.getElementById('togglePassword');
    const passwordField = document.getElementById('password');

    if (togglePassword && passwordField) {
        togglePassword.addEventListener('click', function () {
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent default form submission

            const name = signupForm.querySelector('input[name="name"]').value;
            const email = signupForm.querySelector('input[name="email"]').value;
            const password = signupForm.querySelector('input[name="password"]').value;
            const confirmPassword = signupForm.querySelector('input[name="confirmPassword"]').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return; // Stop the function if passwords don't match
            }

            try {
                const response = await fetch('/api/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, password }) // Only send name, email, password to backend
                });

                const data = await response.json();

                if (response.ok) { // Check if HTTP status is 2xx
                    console.log('Signup successful:', data);
                    localStorage.setItem('userInfo', JSON.stringify(data));
                    alert('Registration Successful! You can now log in.'); // User-friendly alert
                    window.location.href = 'index.html'; // Redirect to home or login page
                } else {
                    console.error('Signup failed:', data.message || 'Something went wrong');
                    alert(data.message || 'Registration failed. Please try again.');
                }
            } catch (error) {
                console.error('Network error or unexpected error during signup:', error);
                alert('An error occurred. Please try again later.');
            }
        });
    }

    // Keep the password toggle functionality for signup page if needed
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const confirmPasswordField = document.getElementById('confirmPassword');

    if (toggleConfirmPassword && confirmPasswordField) {
        toggleConfirmPassword.addEventListener('click', function () {
            const type = confirmPasswordField.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmPasswordField.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

});

