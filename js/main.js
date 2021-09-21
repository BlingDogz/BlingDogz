$(document).ready(() => {
    let web3;
    let account;
    let contract;

    $("#connect").on("click touchstart", async () => {
        if (ethereum) {
            web3 = new Web3(ethereum);
            account = (await ethereum.request({ method: 'eth_requestAccounts' }))[0];
            contract = new web3.eth.Contract(JSON.parse(FROGS_ABI), "0xa3b7CEe4e082183E69a03Fc03476f28b12c545A7");
            const res = await contract.methods.totalSupply().call();
            $("#minted").text(res);
            $("#connect").hide();
        }
    });

    $("#mint").on("click touchstart", async () => {
        if (web3) {
            const quantity = web3.utils.toBN($("#quantity").val());
            const price = web3.utils.toBN("45000000000000000");
            const [presale, paused] = await Promise.all([contract.methods.presaleOngoing().call(), contract.methods.paused().call()]);
            if (presale && paused) {
                contract.methods.mintPresale(quantity).send({ value: price.mul(quantity), from: account });
            }
            else {
                contract.methods.mint(quantity).send({ value: price.mul(quantity), from: account });
            }
        }
    });
}); 

