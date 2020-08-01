const tiles = [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [0, 6],
  [1, 1],
  [1, 2],
  [1, 3],
  [1, 4],
  [1, 5],
  [1, 6],
  [2, 2],
  [2, 3],
  [2, 4],
  [2, 5],
  [2, 6],
  [3, 3],
  [3, 4],
  [3, 5],
  [3, 6],
  [4, 4],
  [4, 5],
  [4, 6],
  [5, 5],
  [5, 6],
  [6, 6],
];

const ali = [];
const veli = [];
const arena = [];
const remainingTiles = [...tiles];
let i;

const drawTile = (sendTo) => {
  if (remainingTiles.length == 0) return console.log('There is no tile left');
  const index = Math.ceil(Math.random() * remainingTiles.length) - 1;

  sendTo.push(remainingTiles[index]);
  remainingTiles.splice(index, 1);
};

for (i = 0; i < 7; i++) {
  drawTile(ali);
  drawTile(veli);
}

drawTile(arena);

const findMatchTileAndPlay = (player) => {
  const first = arena[0][0];
  const last = arena[arena.length - 1][1];
  const obj = {};

  player.find(([a, b], index) => {
    if (a === first || b === first || a === last || b === last) {
      obj.tile = player[index];
      obj.index = index;

      return obj;
    }
  });

  if (!obj.tile) {
    console.log('There is no tile match');

    return drawTile(player);
  }

  const [a, b] = player[obj.index];

  if (a === first) {
    arena.unshift(player[obj.index].reverse());
  } else if (b === first) {
    arena.unshift(player[obj.index]);
  } else if (a === last) {
    arena.push(player[obj.index]);
  } else if (b === last) {
    arena.push(player[obj.index].reverse());
  }

  player.splice(obj.index, 1);
  return obj;
};

for (let index = 0; index < 1; index++) {
  const matchenTile = findMatchTileAndPlay(ali);
  const matchenTile2 = findMatchTileAndPlay(veli);
}
