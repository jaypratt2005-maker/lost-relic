let inventory = [];
let currentRoom = null;
let collected = {
  room1: false,
  room2: false,
  room3: false
};

// Simple colored square images in Base64 (fully working)
const images = {
  gem: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAAJUlEQVR4Ae3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAA4AUFAAGkHfhAAAAAElFTkSuQmCC",
  key: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAAIUlEQVR4Ae3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAADwHfYAAWq6hJYAAAAASUVORK5CYII=",
  scroll: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAAI0lEQVR4Ae3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAADwHuYAAZ2B6/gAAAAASUVORK5CYII="
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

  // Set image and story per room
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

  itemDiv.style.display = "block";

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
