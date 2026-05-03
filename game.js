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
      "You already completed this room.";
    itemDiv.style.display = "none";
    return;
  }

  // ROOM 1 → KEY
  if (room === "room1") {
    document.getElementById("story").innerText = "You found a Key!";
    itemImage.src = "key.png";
    itemImage.dataset.name = "Key";

    itemDiv.style.display = "block";
    itemImage.onclick = function() {
      collectItem(room);
    };
  }

  // ROOM 2 → GEM (LOCKED)
  if (room === "room2") {
    document.getElementById("story").innerText = "You see a sparkling Gem!";
    itemImage.src = "gem.png";
    itemImage.dataset.name = "Gem";

    itemDiv.style.display = "block";
    itemImage.onclick = function() {
      collectItem(room);
    };
  }

  // ROOM 3 → PUZZLE
  if (room === "room3") {
    document.getElementById("story").innerText =
      "A magical force blocks the Scroll. Solve the puzzle...";

    itemDiv.style.display = "none";

    let answer = prompt("What is 3 + 4?");
    if (answer === "7") {
      document.getElementById("story").innerText =
        "Correct! The Scroll appears.";

      itemImage.src = "scroll.png";
      itemImage.dataset.name = "Scroll";

      itemDiv.style.display = "block";
      itemImage.onclick = function() {
        collectItem(room);
      };
    } else {
      document.getElementById("story").innerText =
        "Wrong answer. Try again.";
    }
  }
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
