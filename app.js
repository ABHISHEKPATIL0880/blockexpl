const express = require('express');
const Web3 = require('web3');
const web3 = new Web3('https://mainnet.infura.io/v3/9a5afbb8f236455eb1562f865e41482b');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));




app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});






app.post('/query', (req, res) => {
  const input = req.body.input;

  if (input.startsWith('0x') && input.length === 66) {
    web3.eth.getTransaction(input, (error, tx) => {
      if (error) {
        console.error(error);
        res.send(error.message);
        return;
      }
      
      const table  = `
      
        <table>
          <tr><td>Transaction hash:</td><td>${tx.hash}</td></tr>
          <tr><td>Block number:</td><td>${tx.blockNumber}</td></tr>
          <tr><td>From:</td><td>${tx.from}</td></tr>
          <tr><td>To:</td><td>${tx.to}</td></tr>
          <tr><td>Value:</td><td>${web3.utils.fromWei(tx.value, 'ether')} ETH</td></tr>
          <tr><td>Gas price:</td><td>${web3.utils.fromWei(tx.gasPrice, 'gwei')} Gwei</td></tr>
          <tr><td>Gas limit:</td><td>${tx.gas}</td></tr>
          <tr><td>Nonce:</td><td>${tx.nonce}</td></tr>
          <tr><td>Input data:</td><td>${tx.input}</td></tr>
        </table>
      `;
      res.send(table);
    });
  } else if (input.startsWith('0x') && input.length === 64) {
    web3.eth.getBlock(input, (error, block) => {
      if (error) {
        console.error(error);
        res.send(error.message);
        return;
      }
      

      const table = `
        <table>
          <tr><td>Block number:</td><td>${block.number}</td></tr>
          <tr><td>Block hash:</td><td>${block.hash}</td></tr>
          <tr><td>Timestamp:</td><td>${new Date(block.timestamp * 1000).toLocaleString()}</td></tr>
          <tr><td>Gas limit:</td><td>${block.gasLimit}</td></tr>
          <tr><td>Gas used:</td><td>${block.gasUsed}</td></tr>
          <tr><td>Miner:</td><td>${block.miner}</td></tr>
          <tr><td>Difficulty:</td><td>${block.difficulty}</td></tr>
          <tr><td>Total difficulty:</td><td>${block.totalDifficulty}</td></tr>
          <tr><td>Size:</td><td>${block.size}</td></tr>
          <tr><td>Number of transactions:</td><td>${block.transactions.length}</td></tr>
        </table>
      `;
      res.send(table);
    });
  } else if (!isNaN(input)) {
    web3.eth.getBlock(parseInt(input), (error, block) => {
      if (error) {
        console.error(error);
        res.send(error.message);
        return;
      }

      const table = `
        <table>
          <tr><td>Block number:</td><td>${block.number}</td></tr>
          <tr><td>Block hash:</td><td>${block.hash}</td></tr>
          <tr><td>Timestamp:</td><td>${new Date(block.timestamp * 1000).toLocaleString()}</td></tr>
          <tr><td>Gas limit:</td><td>${block.gasLimit}</td></tr>
          <tr><td>Gas used:</td><td>${block.gasUsed}</td></tr>
          <tr><td>Miner:</td><td>${block.miner}</td></tr>
          <tr><td>Difficulty:</td><td>${block.difficulty}</td></tr>
          <tr><td>Total difficulty:</td><td>${block.totalDifficulty}</td></tr>
          <tr><td>Size:</td><td>${block.size}</td></tr>
          <tr><td>Number of transactions:</td><td>${block.transactions.length}</td></tr>
        </table>
      `;
      res.send(table);
    });
  } else {
    res.send('Invalid input. Please enter a valid transaction hash, block hash, or block number.');
  }
});
app.listen(1000, () => {
console.log('Server listening on port 1000');
});