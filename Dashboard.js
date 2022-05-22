const imageForm = document.querySelector("#imageForm")
const imageInput = document.querySelector("#imageInput")

imageForm.addEventListener("submit", async event => {
    event.preventDefault()
    const file=imageInput.files[0]
})