let inventory = [];
let currentRoom = null;
let collected = {
  room1: false,
  room2: false,
  room3: false
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

  // Set image source and story for each room
  if (room === "room1") {
    document.getElementById("story").innerText = "You see a sparkling Gem!";
    itemImage.src = "gem.png";
  }
  if (room === "room2") {
    document.getElementById("story").innerText = "A shiny Key rests on a pedestal.";
    itemImage.src = "key.png";
  }
  if (room === "room3") {
    document.getElementById("story").innerText = "A glowing Scroll floats in the air.";
    itemImage.src = "scroll.png";
  }

  itemDiv.style.display = "block";

  // Click the image to collect item
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
