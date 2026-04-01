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
    return;
  }

  currentRoom = room;

  let gameDiv = document.getElementById("game");

  // Remove old room styles
  gameDiv.classList.remove("room1", "room2", "room3");

  // Add new room style
  gameDiv.classList.add(room);

  // Show puzzle area
  document.getElementById("puzzle").style.display = "block";

  // Update story + question based on room
  if (room === "room1") {
    document.getElementById("question").innerText = "Solve: 2 + 2 = ?";
    document.getElementById("story").innerText = "This room glows faintly...";
  }

  if (room === "room2") {
    document.getElementById("question").innerText = "Type: key to collect it";
    document.getElementById("story").innerText = "You see something shiny...";
  }

  if (room === "room3") {
    document.getElementById("question").innerText = "What color is the sky?";
    document.getElementById("story").innerText = "The air feels strange here...";
  }
}

function submitAnswer() {
  let answer = document.getElementById("answer").value.toLowerCase();

  if (currentRoom === "room1" && answer === "4") {
    inventory.push("Gem");
    collected.room1 = true;
    document.getElementById("story").innerText = "You found a Gem!";
  }
  else if (currentRoom === "room2" && answer === "key") {
    inventory.push("Key");
    collected.room2 = true;
    document.getElementById("story").innerText = "You found a Key!";
  }
  else if (currentRoom === "room3" && answer === "blue") {
    inventory.push("Scroll");
    collected.room3 = true;
    document.getElementById("story").innerText = "You found a Scroll!";
  }
  else {
    document.getElementById("story").innerText = "Wrong answer!";
    return;
  }

  // Hide puzzle and clear input
  document.getElementById("puzzle").style.display = "none";
  document.getElementById("answer").value = "";

  updateInventory();
  checkWin();
}

function checkWin() {
  if (inventory.length === 3) {
    document.getElementById("story").innerText =
      "You unlocked the chest and found the Lost Relic! You win!";
  }
}
