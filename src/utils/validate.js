function validateUsername(value) {
    let illegal = '[^A-Za-z0-9]';    
    return (value.toString().search(illegal) < 0);
}

exports.validateUsername = validateUsername;