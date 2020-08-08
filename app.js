import { tiles } from '/tiles.js';

const player1 = {
  name: 'First',
  tiles: [],
};

const player2 = {
  name: 'Second',
  tiles: [],
};

const arena = {
  tiles: [],
};

let isFirstPlayerPlaying = true;

const players = [player1, player2];

const remainingTiles = [...tiles];
let i;

const drawTile = (sendTo) => {
  // get a random number to defined an index
  const index = Math.floor(Math.random() * remainingTiles.length);

  const drawedTile = remainingTiles[index];

  sendTo.push(drawedTile);
  remainingTiles.splice(index, 1);

  return drawedTile;
};

for (i = 0; i < 7; i++) {
  drawTile(players[0].tiles);
  drawTile(players[1].tiles);
}

drawTile(arena.tiles);

console.log(
  `Game starting with first tile <${arena.tiles[0][0]}:${arena.tiles[0][1]}>`
);

const findMatchTileAndPlay = (isSwitching = false) => {
  const firstTile = arena.tiles[0];
  const lastTile = arena.tiles[arena.tiles.length - 1];
  const first = firstTile[0];
  const last = lastTile[1];
  const obj = {};

  if (isSwitching) {
    isFirstPlayerPlaying = !isFirstPlayerPlaying;
  }
  const player = isFirstPlayerPlaying ? players[0] : players[1];

  player.tiles.find(([a, b], index) => {
    if (a === first || b === first || a === last || b === last) {
      obj.tile = player.tiles[index];
      obj.index = index;
      if (a === first || b === first) {
        obj.arenaTile = firstTile;
      } else {
        obj.arenaTile = lastTile;
      }

      return obj;
    }
  });

  if (!obj.tile) {
    if (remainingTiles.length === 0) {
      console.log('There is no tile left');
      console.log('%cThe game ended in a draw.', 'color: red;');
      return;
    }

    let drawedTile;

    drawedTile = drawTile(player.tiles);
    // console.log(drawedTile);
    console.log(
      `${player.name} can't play, drawing tile <${drawedTile[0]}:${drawedTile[1]}>`
    );

    return findMatchTileAndPlay();
  }
  let originalTile = player.tiles[obj.index];
  const [a, b] = originalTile;

  if (a === first) {
    originalTile = originalTile.reverse();
    arena.tiles.unshift(originalTile);
  } else if (b === first) {
    arena.tiles.unshift(originalTile);
  } else if (a === last) {
    arena.tiles.push(originalTile);
  } else if (b === last) {
    originalTile = originalTile.reverse();
    arena.tiles.push(originalTile);
  }

  player.tiles.splice(obj.index, 1);

  console.log(
    `${player.name} plays <${originalTile.join(
      ':'
    )}> to connect to tile <${obj.arenaTile.join(':')}> on the board`
  );
  console.log(
    `%cBord is now: <${arena.tiles.map((tile) => tile.join(':')).join('> <')}>`,
    'color:yellow;'
  );
  if (player.tiles.length === 0)
    return console.log(`%cPlayer ${player.name} has won.`, 'color:lightGreen;');
  findMatchTileAndPlay(true);
};

findMatchTileAndPlay();
