async function connectWallet() {
    // Verificar si MetaMask está instalado
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Asegurar que MetaMask esté disponible completamente
            if (window.ethereum.isMetaMask) {
                // Agregar la red Polygon si no está presente
                await addPolygonNetwork();

                // Solicitar acceso a la billetera
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                alert('Conectado: ' + accounts[0]);
            } else {
                alert('Parece que MetaMask no está disponible. Por favor, asegúrate de tener MetaMask instalado.');
            }
        } catch (error) {
            console.error('Error al conectar con MetaMask:', error);
            alert('Ocurrió un error al conectar con MetaMask. Revisa la consola para más detalles.');
        }
    } else {
        alert('MetaMask no está instalado. Por favor, instala MetaMask y recarga la página.');
        window.open('https://metamask.io/download/', '_blank'); // Redirige a la página de descarga de MetaMask
    }
}

async function addPolygonNetwork() {
    try {
        // Agregar la red Polygon a MetaMask
        await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
                chainId: '0x89', // ID de la red Polygon
                chainName: 'Polygon Mainnet',
                nativeCurrency: {
                    name: 'MATIC',
                    symbol: 'MATIC',
                    decimals: 18
                },
                rpcUrls: ['https://polygon-rpc.com/'],
                blockExplorerUrls: ['https://polygonscan.com/']
            }]
        });
    } catch (error) {
        console.error('Error al agregar la red Polygon:', error);
        alert('Ocurrió un error al agregar la red Polygon.');
    }
}

// Asignar la función al botón
document.getElementById('connectButton').addEventListener('click', connectWallet);
