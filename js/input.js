(function() {
    document.addEventListener('keyup', function(e) {
        e.preventDefault();
        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };

        player.handleInput(allowedKeys[e.keyCode]);
    });

    let startX;
    let startY;
    const allowedTime = 300;
    let startTime;

    document.addEventListener('touchstart', 
        function(e) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;

            startTime = new Date().getTime();

            e.preventDefault();
        }
    , {passive: false});
    document.addEventListener('touchmove', function(e) {e.preventDefault()}, {passive: false});
    document.addEventListener('touchend',
        function(e) {
            let distX = e.changedTouches[0].clientX - startX;
            let distY = e.changedTouches[0].clientY - startY;
            let elapsedTime = new Date().getTime() - startTime;

            let input = '';

            if (elapsedTime <= allowedTime) {
                if (Math.abs(distX) > Math.abs(distY)){
                    (distX < 0)? input = 'left' : input = 'right';
                }
                else if (Math.abs(distY) >= Math.abs(distX)){
                    (distY < 0)? input = 'up' : input = 'down';
                }
            }

            player.handleInput(input);

            e.preventDefault();
        }
    , {passive: false});
})();