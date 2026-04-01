let inventory = [];

function updateInventory() {
  document.getElementById("inventory").innerText =
    "Items: " + (inventory.length ? inventory.join(", ") : "None");
}

function goToRoom(room) {
  let story = document.getElementById("story");

  if (room === "room1") {
    let answer = prompt("Solve this: 2 + 2 = ?");
    if (answer == "4") {
      alert("You got Item 1!");
      inventory.push("Gem");
    } else {
      alert("Wrong!");
    }
  }

  if (room === "room2") {
    alert("You found a hidden key!");
    inventory.push("Key");
  }

  if (room === "room3") {
    let answer = prompt("What color is the sky?");
    if (answer.toLowerCase() === "blue") {
      alert("You got Item 3!");
      inventory.push("Scroll");
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
