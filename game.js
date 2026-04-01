let inventory = [];
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
    return;
  }

  let itemName = ""; // This will store the correct item for the room

  if (room === "room1") {
    document.getElementById("story").innerText = "You found a Gem!";
    itemName = "Gem";
  }
  if (room === "room2") {
    document.getElementById("story").innerText = "You found a Key!";
    itemName = "Key";
  }
  if (room === "room3") {
    document.getElementById("story").innerText = "You found a Scroll!";
    itemName = "Scroll";
  }

  // Add the item to inventory
  inventory.push(itemName);
  collected[room] = true;
  updateInventory();
  checkWin();
}

function checkWin() {
  if (inventory.length === 3) {
    document.getElementById("story").innerText =
      "You unlocked the chest and found the Lost Relic! You win!";
  }
}
