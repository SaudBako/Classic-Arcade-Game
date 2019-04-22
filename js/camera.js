//This program controls the canvas view of the game

(function() {
    let yTranslation; //Translation of canvas that reaches the player
    const yTranslationOffset = 4 * blockHeight + 36;

    followPlayer = function() {
        yTranslation = - player.y //Starts from the bottom
            - yTranslationOffset //Adds the space needed by the last blocks row
            + canvasHeight / scale;
        ctx.setTransform(scale, 0, 0, scale, 0, 0);
        ctx.translate(0, yTranslation);
    };
})();