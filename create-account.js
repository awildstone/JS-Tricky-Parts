
function createAccount(pin, amount=0) {
    function validatePin(xxxx) {
        return xxxx === pin;
    }

    function getBalance(xxxx) {
        if (validatePin(xxxx)) return `$${amount}`;
        return 'Invalid PIN.';
    }

    function makeDeposit(xxxx, amt) {
        if (validatePin(xxxx)) {
            amount += amt;
            return `Succesfully deposited $${amt}. Current balance: $${amount}.`;
        }
        return 'Invalid PIN.';
    }

    function makeWithdraw(xxxx, amt) {
        if (validatePin(xxxx)) {
            if (amount - amt >= 0) {
                amount -= amt;
                return `Succesfully withdrew $${amt}. Current balance: $${amount}.`;
            } else {
                return 'Withdrawal amount exceeds account balance. Transaction cancelled.';
            }
        }
        return 'Invalid PIN.';
    }

    function updateSecret(xxxx, newPin) {
        if (validatePin(xxxx)) {
            pin = newPin;
            return 'PIN successfully changed!';
        }
        return 'Invalid PIN.';
    }

    return {
        checkBalance: function(xxxx) {
            return getBalance(xxxx);
        },
        deposit: function(xxxx, amt) {
            return makeDeposit(xxxx, amt);
        },
        withdraw: function(xxxx, amt) {
            return makeWithdraw(xxxx, amt);
        },
        changePin: function(xxxx, newPin) {
            return updateSecret(xxxx, newPin);
        }
    }

}

module.exports = { createAccount };
