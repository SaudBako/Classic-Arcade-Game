(function() {

    let gems = 0;
    let loses = 0;

    gemCollected = function() {
        gems++;
    }

    lost = function() {
        loses++;
    }

    UIRender = function() {
        ctx.font = blockWidth / 3 + 'px Comic Sans MS';
        ctx.fillStyle = 'black';
        ctx.fillText('Gems  ' + gems, 5, -getYTranslation() + 60);
        ctx.fillText('Loses  ' + loses, 310, -getYTranslation() + 60);
        //Gems.innerHTML = 'Gems: ' + gems;
    }
})();