
const Web3 = require('web3');
const web3 = new Web3('https://mainnet.infura.io/v3/ed1b9a4644374019XXXXXXXXXXXXXXXXXX');


async function identify_address(address) {
    try {
        const code = await web3.eth.getCode(address);

        if (code === '0x') {
            return 'Wallet';
        } else {
            return 'Contract';
        }
    } catch (error) {
        console.error('Error identifying address:', error);
        return null;
    }
}


async function get_wallet_info(address) {
    try {
        const balance = await web3.eth.getBalance(address);
        const transactionCount = await web3.eth.getTransactionCount(address);
        const tokens = {}; // Implement token retrieval logic here

        return {
            address,
            balance: web3.utils.fromWei(balance, 'ether'),
            transactionCount,
            tokens
        };
    } catch (error) {
        console.error('Error getting wallet info:', error);
        return null;
    }
}


const address = '0x0b2c0240719CAfC446D6e506E91a269a6f60b36C';
identify_address(address)
    .then(type => {
        console.log('Address type:', type);
        if (type === 'Wallet') {
            return get_wallet_info(address);
        } else {
            console.log('It is a contract.');
    
        }
    })
    .then(walletInfo => {
        if (walletInfo) {
            console.log('Wallet Info:', walletInfo);
        }
    })
    .catch(error => console.error('Error:', error));
