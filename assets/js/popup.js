const modal = document.getElementById('modal');
const close_modal = document.getElementById('save-info');
const btnModal = document.getElementById('btn-modal-open');
btnModal.addEventListener("click", function() {
    modal.style.display = "inline-block";
    close_modal.style.display = "inline-block"
})

close_modal.addEventListener("click", e => {
    modal.style.display = "none"
    close_modal.style.display = "none"
})

window.addEventListener("keyup", e => {
    if(modal.style.display === "inline-block" && e.key === "Escape") {
        modal.style.display = "none"
        close_modal.style.display = "none"

    }
})