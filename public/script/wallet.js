window.addEventListener('load', async () => {
  if (typeof window.ethereum !== 'undefined') {
    const provider = window.ethereum;
    try {
      await provider.request({ method: 'eth_requestAccounts' });
      alert('Connected to Metamask!');
    } catch (error) {
      alert('You need to connect with Metamask to continue.');
    }
  } else {
    alert('Please install Metamask to continue.');
  }
});
document.getElementById('connect-btn').addEventListener('click', async () => {

  const provider = window.ethereum;

  try {
   
    await provider.request({ method: 'eth_requestAccounts' });

    
    alert('Connected to Metamask!');
  } catch (error) {
   
    alert('You need to connect with Metamask to continue.');
  }
});
