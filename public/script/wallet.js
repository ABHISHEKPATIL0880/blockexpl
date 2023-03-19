// Wait for the page to load
window.addEventListener('load', async () => {
  // Check if Metamask is installed
  if (typeof window.ethereum !== 'undefined') {
    // Get the provider
    const provider = window.ethereum;

    try {
      // Request access to the user's accounts
      await provider.request({ method: 'eth_requestAccounts' });

      // Accounts now exposed
      alert('Connected to Metamask!');
    } catch (error) {
      // User denied account access...
      alert('You need to connect with Metamask to continue.');
    }
  } else {
    // Metamask is not installed
    alert('Please install Metamask to continue.');
  }
});

// Connect button click event handler
document.getElementById('connect-btn').addEventListener('click', async () => {
  // Get the provider
  const provider = window.ethereum;

  try {
    // Request access to the user's accounts
    await provider.request({ method: 'eth_requestAccounts' });

    // Accounts now exposed
    alert('Connected to Metamask!');
  } catch (error) {
    // User denied account access...
    alert('You need to connect with Metamask to continue.');
  }
});
