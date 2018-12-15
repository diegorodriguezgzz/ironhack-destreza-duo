# Destreza Duo

### By Diego Rodríguez

First module project: boardgame style videogame inspired on Parker Brothers' Perfection (Destreza, in Spanish) with some added functionalities.

## Technologies used
The game is fully built using HTML5/CSS3/JavaScript. All interactions are handled by the HTML file's DOM, and manipulated with JavaScript.
Given that the game's main assets (pieces) are inserted as img tags, but manipulated as svg tags, I also used some JQuery code which I adapted from Henrik Albrechtsson and Drew Baker's solutions to [this Stack Overflow problem](https://stackoverflow.com/questions/11978995/how-to-change-color-of-svg-image-using-css-jquery-svg-image-replacement/11978996).

## Approach taken
First, I built a list of criteria for success based on what I wanted from the game and then designed a work breakdown schedule based on them. My development was then sharply accelerated as the tools I needed to test the game were very similar to the ones I ended up building for the final user.
From the beginning, I had chosen to build the game to cater to the end-user's experience, so I incorporated extensive testing from the moment the game was "playable". This helped me greatly, as it enabled me to understand my users better than with other approaches.
When I was satisfied with the gameplay, I took to debugging and refactoring, in order to make the code more maintainable.
Finally, I enhanced the user experience and took advantage of my DOM-only approach to make the game more responsive.

## Installation
Just run in the browser! Head over to [diegorodriguezgzz.github.io](diegorodriguezgzz.github.io) and play!.
Drag-and-drop gameplay is not supported. Just click on the piece you want to place and then on the slot you chose to place it in.
In widescreen mode, use the keyboard to rotate pieces (left and right arrows, or Q and E keys, as desired).

## Features for future builds
- Instructions for gameplay in the final link
- Full 2 Player mode
- Challenge your friends! Send custom invitations to show off your lightning-fast dexterity
- Full custom color support
- Animations at endgame
- Drag-and-drop support

## Special thanks and credits
- Henrik Albrechtsson: JQuery code to change img tags into svgs
- Aline Aragón: Moral support, testing and much more
- Drew Baker: JQuery code to change img tags into svgs
- Sandra Barrón: Fresh ideas for UX
- Mike Bostock: Original code for [Fisher-Yates shuffle](https://bost.ocks.org/mike/shuffle/compare.html)
- Ricardo Chavero: Reminding me of the existence of this game
- José Carlos Correa: Moral support, testing, and help with JS
- María Teresa del Real: Game assets (SVGs)
- Germán Domínguez: Moral support and technical help with HTML/CSS/JS
- Paulina Espinosa: UX improvement