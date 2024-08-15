async function hashStringToBase64(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);

    // Hash the data using SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    // Convert the hash buffer to a Base64 string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashBinaryString = hashArray.reduce((str, byte) => str + String.fromCharCode(byte), '');
    const hashBase64 = btoa(hashBinaryString);

    return hashBase64;
}

function hashAndDisplay() {
    const inputText = document.getElementById('inputText').value;
    const numChars = parseInt(document.getElementById('numChars').value, 10);

    hashStringToBase64(inputText).then(base64Hash => {
        const truncatedHash = base64Hash.substring(0, numChars);
        document.getElementById('result').textContent = numChars;
    }).catch(err => {
        document.getElementById('result').textContent = 'Error: ' + err.message;
    });
}
