// Ensure the DOM is fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent default form submission

            const email = loginForm.querySelector('input[name=\"email\"]').value;
            const password = loginForm.querySelector('input[name=\"password\"]').value;

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
                    console.error('Login failed:', data.message || 'Server error');
                    alert(`Login Failed: ${data.message || 'Please try again.'}`);
                }
            } catch (error) {
                console.error('Network error or unexpected error during login:', error);
                alert('An error occurred during login. Please check your connection.');
            }
        });
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent default form submission

            const name = signupForm.querySelector('input[name=\"name\"]').value;
            const email = signupForm.querySelector('input[name=\"email\"]').value;
            const password = signupForm.querySelector('input[name=\"password\"]').value;
            const confirmPassword = signupForm.querySelector('input[name=\"confirmPassword\"]').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            try {
                const response = await fetch('/api/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, password })
                });

                const data = await response.json(); // Parse the JSON response

                if (response.ok) { // Check if HTTP status is 2xx
                    console.log('Signup successful:', data);
                    localStorage.setItem('userInfo', JSON.stringify(data));
                    alert('Signup Successful!'); // User-friendly alert
                    window.location.href = 'index.html'; // Redirect to home page
                } else {
                    // Handle server-side errors
                    console.error('Signup failed:', data.message || 'Server error');
                    alert(`Signup Failed: ${data.message || 'Please try again.'}`);
                }
            } catch (error) {
                console.error('Network error or unexpected error during signup:', error);
                alert('An error occurred during signup. Please check your connection.');
            }
        });
    }

    // Toggle password visibility (if you have this functionality)
    const togglePassword = document.getElementById('togglePassword');
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('bi-eye');
            this.classList.toggle('bi-eye-slash');
        });
    }

    // Product display logic
    const productListContainer = document.getElementById('product-list-container');

    // Function to fetch and display products
    const fetchProducts = async () => {
        if (!productListContainer) {
            console.warn('Product list container not found. Skipping product fetch.');
            return;
        }
        try {
            // Fetch products from your backend API
            const response = await fetch('/api/products');
            const products = await response.json();

            if (response.ok) {
                productListContainer.innerHTML = ''; // Clear any existing content before adding new ones

                // --- THIS SECTION IS NOW INSIDE THE ASYNC FUNCTION AFTER 'products' IS DEFINED ---
                products.forEach(product => {
                    const productCol = document.createElement('div');
                    productCol.className = 'col mb-5';
                    productCol.innerHTML = `
                        <a href="single-product.html?id=${product._id}" style="text-decoration: none;">
                            <div class="card h-100 position-relative overflow-hidden">
                                <img class="card-img-top" src="${product.image}" alt="${product.name}" />
                                <div class="position-absolute bottom-0 start-0 w-100 bg-gradient-to-top from-black to-transparent text-white p-3">
                                    <p class="mb-0 fw-semibold">@fashion_guru</p>
                                    <p class="mb-0">${product.name} - $${product.price ? product.price.toFixed(2) : 'N/A'}</p>
                                    <p class="mb-0 text-muted">${product.description ? product.description.substring(0, 50) + '...' : ''}</p>
                                </div>
                            </div>
                        </a>
                    `;
                    productListContainer.appendChild(productCol);
                });
                // --- END OF MOVED SECTION ---

            } else {
                console.error('Failed to fetch products:', products.message || 'Server error');
            }
        } catch (error) {
            console.error('Network error or unexpected error during product fetch:', error);
        }
    };

    // Call the fetchProducts function when the page loads
    fetchProducts();

}); // End of DOMContentLoaded