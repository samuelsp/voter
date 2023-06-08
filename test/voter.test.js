const Voter = artifacts.require('./Voter.sol')

contract('Voter', function(accounts){
    let voter;

    beforeEach(async function(){
        voter = await Voter.new(["one", "two"])
    })

    it('has no votes by default', async function() {
        const votes = await voter.getVotes()
        expect(toNumbers(votes)).to.deep.equal([0, 0])
    })

    it('allows to vote with a string option', async function(){
        const firstAccount = accounts[0];

        await voter.methods['vote(string)']('one', {from: firstAccount})
        const votes = await voter.getVotes()

        expect(toNumbers(votes)).to.deep.equal([1, 0])

    })

    it('allows to vote with a number option', async function(){
        const firstAccount = accounts[0];

        await voter.methods['vote(uint256)'](0, {from: firstAccount})
        const votes = await voter.getVotes()

        expect(toNumbers(votes)).to.deep.equal([1, 0])

    })

    it('does not allow to vote twice from same account', async function() {
        try {
            const firstAccount = accounts[0]
            
            await voter.methods['vote(string)']('one', {from: firstAccount}) 
            await voter.methods['vote(string)']('one', {from: firstAccount})    

            expect.fail('Should revert execution')
        }
        catch(error) {
            expect(error.message).to.include('Already voted')
        }

    })

    it('allows to vote from different accounts', async function() {
        const firstAccount  = accounts[0]
        const secondAccount = accounts[1]
        
        await voter.methods['vote(string)']('one', {from: firstAccount}) 
        await voter.methods['vote(string)']('one', {from: secondAccount})  
        
        const votes = await voter.getVotes()

        expect(toNumbers(votes)).to.deep.equal([2, 0])
    
    })

    function toNumbers(bigNumbers) {
        return bigNumbers.map(n => n.toNumber());
    }


})