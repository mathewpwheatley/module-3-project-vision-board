import {GOALS_URL} from './index.js'
import {fetchBoard} from './board.js'

export const statusInput = document.getElementById("status")
statusInput.style.margin = "25px"
export const submitButton = document.getElementById("submit-button")
const newGoalEditButton = document.getElementById("cancel-button")
const newGoalForm = document.querySelector(".new-goal-container")
export const goalFormLabel = document.getElementById("form-label")

newGoalEditButton.addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("new-goal").reset()
  newGoalForm.hidden = true
})

export function createOrEditGoal() {
  newGoalForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const goal = {
      id: event.target[3].getAttribute("goal-id"),
      title: `${event.target[0].value}`,
      content: `${event.target[1].value}`,
      status: `${event.target[2].value}`,
    };
    const data = {
      board_id: document.getElementById("board-card").getAttribute("board-id"),
      title: goal.title,
      content: goal.content,
      status: goal.status
    }
    if (submitButton.value === "Complete Edit") {
      let editedGoal = document.querySelector(`div[goal-id = "${goal.id}"]`)
      let title = editedGoal.querySelector("h2")
      let content = editedGoal.querySelector("p")
      let status = editedGoal.querySelector("h4")
      title.innerHTML = `${event.target[0].value}`
      content.innerHTML = `${event.target[1].value}`
      status.innerHTML = `${event.target[2].value}`
      fetch(`${GOALS_URL}/${goal.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
    }
    else {
      fetch(`${GOALS_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(function(json) {
        fetchBoard(data.board_id)
      })
  }
    document.getElementById("new-goal").reset()
    goalFormLabel.innerHTML = `<strong>Create New Goal</strong>`
    statusInput.value = "-- Select a Status --"
    newGoalForm.hidden = true
    submitButton.value = "Submit"
  });
}