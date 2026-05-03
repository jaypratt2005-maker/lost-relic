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
  let itemDiv = document.getElementById("item");
  let itemImage = document.getElementById("itemImage");

  //  LOCK: Room 2 requires Key
  if (room === "room2" && !inventory.includes("Key")) {
    document.getElementById("story").innerText =
      "The door is locked. You need a key.";
    itemDiv.style.display = "none";
    return;
  }

  // Already collected
  if (collected[room]) {
    document.getElementById("story").innerText =
      "You already collected the item in this room.";
    itemDiv.style.display = "none";
    return;
  }

  // ROOM SETUP 
  if (room === "room1") {
    document.getElementById("story").innerText = "You found a Key!";
    itemImage.src = "key.png";
    itemImage.dataset.name = "Key";
  }

  if (room === "room2") {
    document.getElementById("story").innerText = "You see a sparkling Gem!";
    itemImage.src = "gem.png";
    itemImage.dataset.name = "Gem";
  }

  if (room === "room3") {
    document.getElementById("story").innerText = "A glowing Scroll floats in the air.";
    itemImage.src = "scroll.png";
    itemImage.dataset.name = "Scroll";
  }

  // Show item
  itemDiv.style.display = "block";

  // Click to collect
  itemImage.onclick = function() {
    collectItem(room);
  };
}

function collectItem(room) {
  if (collected[room]) return;

  let itemName = document.getElementById("itemImage").dataset.name;
  inventory.push(itemName);

  collected[room] = true;

  document.getElementById("story").innerText =
    `You collected ${itemName}! (${inventory.join(", ")})`;

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
