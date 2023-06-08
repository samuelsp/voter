const Voter = artifacts.require("./Voter.sol");

module.exports = async function(deployer) {
    deployer.deploy(Voter, ["one", "two"]);
};