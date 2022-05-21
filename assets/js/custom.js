const modal = document.getElementById("modal")
const close_area = document.getElementById('close-area')
const btnModal = document.getElementById("btn-modal-open")
btnModal.addEventListener("click", e => {
    modal.style.display = "flex"
    close_area.style.display = "flex"
})

const closeBtn = document.getElementById("close-area")
closeBtn.addEventListener("click", e => {
    modal.style.display = "none"
    closeBtn.style.display = "none"
})

window.addEventListener("keyup", e => {
    if(modal.style.display === "flex" && e.key === "Escape") {
        modal.style.display = "none"
        closeBtn.style.display = "none"

    }
})