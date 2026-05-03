let inventory = [];
let collected = {
  room1: false,
  room2: false,
  room3: false
};

let currentRoom = null;
let trapRoom = Math.random() < 0.5 ? "room1" : "room3"; // random trap

function updateInventory() {
  document.getElementById("inventory").innerText =
    "Items: " + (inventory.length ? inventory.join(", ") : "None");
}

function resetGame() {
  inventory = [];
  collected = { room1: false, room2: false, room3: false };
  updateInventory();
  document.getElementById("story").innerText =
    "You triggered a trap! Game reset.";
  document.getElementById("item").style.display = "none";
  document.getElementById("puzzleBox").style.display = "none";
}

function enterRoom(room) {
  currentRoom = room;

  let itemDiv = document.getElementById("item");
  let puzzleBox = document.getElementById("puzzleBox");

  itemDiv.style.display = "none";
  puzzleBox.style.display = "none";

  // 🔒 Room 2 locked
  if (room === "room2" && !inventory.includes("Key")) {
    document.getElementById("story").innerText =
      "The door is locked. You need a key.";
    return;
  }

  if (collected[room]) {
    document.getElementById("story").innerText =
      "You already completed this room.";
    return;
  }

  // ROOM 1 (PUZZLE → KEY)
  if (room === "room1") {
    document.getElementById("story").innerText =
      "Solve this to unlock the Key:";
    showPuzzle("What is 3 + 4?");
  }

  // ROOM 2 (ITEM)
  if (room === "room2") {
    let itemImage = document.getElementById("itemImage");
    document.getElementById("story").innerText = "You see a Gem!";
    itemImage.src = "gem.png";
    itemImage.dataset.name = "Gem";

    itemDiv.style.display = "block";
    itemImage.onclick = () => collectItem(room);
  }

  // ROOM 3 (PUZZLE → SCROLL)
  if (room === "room3") {
    document.getElementById("story").innerText =
      "A magical barrier blocks the Scroll...";
    showPuzzle("What color is the sky?");
  }
}

function showPuzzle(question) {
  document.getElementById("puzzleText").innerText = question;
  document.getElementById("puzzleInput").value = "";
  document.getElementById("puzzleBox").style.display = "block";
}

function submitPuzzle() {
  let answer = document.getElementById("puzzleInput").value.toLowerCase();

  // Correct answers
  let correct = false;

  if (currentRoom === "room1" && answer === "7") correct = true;
  if (currentRoom === "room3" && answer === "blue") correct = true;

  // TRAP SYSTEM
  if (!correct) {
    if (currentRoom === trapRoom) {
      resetGame();
      return;
    } else {
      document.getElementById("story").innerText =
        "Wrong answer. Try again.";
      return;
    }
  }

  // SUCCESS → GIVE ITEM
  let itemDiv = document.getElementById("item");
  let itemImage = document.getElementById("itemImage");

  if (currentRoom === "room1") {
    itemImage.src = "key.png";
    itemImage.dataset.name = "Key";
  }

  if (currentRoom === "room3") {
    itemImage.src = "scroll.png";
    itemImage.dataset.name = "Scroll";
  }

  document.getElementById("puzzleBox").style.display = "none";
  itemDiv.style.display = "block";

  itemImage.onclick = () => collectItem(currentRoom);
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
