let inventory = [];
let currentRoom = null;
let collected = {
  room1: false,
  room2: false,
  room3: false
};

// Base64-encoded tiny placeholder images
const images = {
  gem: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAHGlET1QAAAACAAAAAAAAAAcAAAAoAAAAAAAHAAAAGwBSO9UAAABi0lEQVRo3u2ZzUoDQRSG/5oFzCEaEQyA5hQi+AgWkTZi8QTwqG6BPwOQqV1I0S1Xwl+TkWnL0JkY/dvsqvF1+/yOt1V1fU1fV8u+AtmQfq3zEPIA6z88r7i/9lNQXMALi4o3nvg8CSn6F1Z2oHkBWkDJbZ+G5xTqMDrjKquK1Vb69K2AqgB4gE+CbhV2SBzDuoNcuENw2UObGFMt4NRCKZ4LxB1HQzq0AdABnO1s+og68Vh9G+aCoRXwL8N3fR7qsnKfB+YB/kfXgJwDGQFlYCMAGeAAzAKsgC7AB0AC8ANwA7wMrADuYIPiH1oHoBFgeqa5Txl6AFwS4p5QAvwPbgz4EBQA8D+IPcHD7fwW8AaHmjf6FPjzU2r+ErcGN3rTMAAAAASUVORK5CYII=",
  key: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAVUlEQVRo3u3UsQ0AIAwDQY//+Zk7QpoACn4xnJZKCcBzA1F7XQ2gAuAqgL8AC+IucUAgCi+Ah4CtAHKACzA+AMwDJg2oz6qS4QWYL1FHw3aB3akIqAAAAAElFTkSuQmCC",
  scroll: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAXUlEQVRo3u3UsQkAIAwDQb//+ZtNkDCCwLZcJB1oAIgLoA+gFOwA+gJeBPiHCwA+gKOAP6LMEUGAY8BQz+gV7AR4AFwB3gLeBNwAmZQkp9HiK/5FdsJYAAAAASUVORK5CYII="
};

function updateInventory() {
  document.getElementById("inventory").innerText =
    "Items: " + (inventory.length ? inventory.join(", ") : "None");
}

function enterRoom(room) {
  if (collected[room]) {
    document.getElementById("story").innerText =
      "You already cleared this room.";
    document.getElementById("item").style.display = "none";
    return;
  }

  currentRoom = room;

  let gameDiv = document.getElementById("game");
  gameDiv.classList.remove("room1", "room2", "room3");
  gameDiv.classList.add(room);

  let itemDiv = document.getElementById("item");
  let itemImage = document.getElementById("itemImage");

  // Set image and story
  if (room === "room1") {
    document.getElementById("story").innerText = "You see a sparkling Gem!";
    itemImage.src = images.gem;
  }
  if (room === "room2") {
    document.getElementById("story").innerText = "A shiny Key rests on a pedestal.";
    itemImage.src = images.key;
  }
  if (room === "room3") {
    document.getElementById("story").innerText = "A glowing Scroll floats in the air.";
    itemImage.src = images.scroll;
  }

  itemDiv.style.display = "block";

  itemImage.onclick = function() {
    collectItem(room);
  };
}

function collectItem(room) {
  if (collected[room]) return;

  if (room === "room1") inventory.push("Gem");
  if (room === "room2") inventory.push("Key");
  if (room === "room3") inventory.push("Scroll");

  collected[room] = true;

  document.getElementById("story").innerText =
    `You collected your item! (${inventory.join(", ")})`;

  document.getElementById("item").style.display = "none";
  updateInventory();
  checkWin();
}

function checkWin() {
  if (inventory.length === 3) {
    document.getElementById("story").innerText =
      "You unlocked the chest and found the Lost Relic! You win!";
  }
}
