let inventory = [];
let collected = {
  room1: false,
  room2: false,
  room3: false
};

// Optional colored square images just for visibility
const images = {
  gem: "data:image/svg+xml;base64," + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" fill="red"/></svg>'),
  key: "data:image/svg+xml;base64," + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" fill="yellow"/></svg>'),
  scroll: "data:image/svg+xml;base64," + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" fill="cyan"/></svg>')
};

function updateInventory() {
  document.getElementById("inventory").innerText =
    "Items: " + (inventory.length ? inventory.join(", ") : "None");
}

function enterRoom(room) {
  if (collected[room]) {
    document.getElementById("story").innerText =
      "You already collected the item in this room.";
    document.getElementById("item").style.display = "none";
    return;
  }

  let itemDiv = document.getElementById("item");
  let itemImage = document.getElementById("itemImage");

  // Set story and item name per room
  if (room === "room1") {
    document.getElementById("story").innerText = "You see a sparkling Gem!";
    itemImage.src = images.gem;
    itemImage.dataset.name = "Gem";
  }
  if (room === "room2") {
    document.getElementById("story").innerText = "A shiny Key rests on a pedestal.";
    itemImage.src = images.key;
    itemImage.dataset.name = "Key";
  }
  if (room === "room3") {
    document.getElementById("story").innerText = "A glowing Scroll floats in the air.";
    itemImage.src = images.scroll;
    itemImage.dataset.name = "Scroll";
  }

  // Show item for clicking
  itemDiv.style.display = "block";

  // Click item to collect
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
