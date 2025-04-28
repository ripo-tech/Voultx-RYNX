async function trade(action) {
    const coin = document.getElementById('coin').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (!coin || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid coin and amount.');
        return;
    }

    let balanceElement = document.getElementById('balance');
    let coinsElement = document.getElementById('coins');

    let balance = parseFloat(balanceElement.innerText.replace('Balance: $', '').replace(',', ''));
    let coins = JSON.parse(coinsElement.dataset.coins || '{}');

    const price = Math.random() * (50000 - 10) + 10; // Random price between $10 and $50,000

    if (action === 'buy') {
        const cost = price * amount;
        if (balance >= cost) {
            balance -= cost;
            coins[coin] = (coins[coin] || 0) + amount;
            alert(`Bought ${amount} ${coin} at $${price.toFixed(2)} each.`);
        } else {
            alert('Insufficient balance.');
            return;
        }
    } else if (action === 'sell') {
        if (coins[coin] && coins[coin] >= amount) {
            coins[coin] -= amount;
            balance += price * amount;
            alert(`Sold ${amount} ${coin} at $${price.toFixed(2)} each.`);
        } else {
            alert('Insufficient coin amount.');
            return;
        }
    }

    balanceElement.innerText = `Balance: $${balance.toFixed(2)}`;
    coinsElement.innerText = `Coins: ${JSON.stringify(coins)}`;
    coinsElement.dataset.coins = JSON.stringify(coins);
}

document.getElementById('coins').dataset.coins = '{}';
