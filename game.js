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

function goToRoom(room) {
  if (collected[room]) {
    alert("You already got the item here!");
    return;
  }

  if (room === "room1") {
    let answer = prompt("Solve this: 2 + 2 = ?");
    if (answer == "4") {
      alert("You got a Gem!");
      inventory.push("Gem");
      collected.room1 = true;
    } else {
      alert("Wrong!");
    }
  }

  if (room === "room2") {
    alert("You found a Key!");
    inventory.push("Key");
    collected.room2 = true;
  }

  if (room === "room3") {
    let answer = prompt("What color is the sky?");
    if (answer && answer.toLowerCase() === "blue") {
      alert("You got a Scroll!");
      inventory.push("Scroll");
      collected.room3 = true;
    } else {
      alert("Wrong!");
    }
  }

  updateInventory();
  checkWin();
}

function checkWin() {
  if (inventory.length >= 3) {
    document.getElementById("story").innerText =
      "You unlocked the chest and found the Lost Relic! You win!";
  }
}
