document.addEventListener('click', async ({target}) => {
  if (target.dataset.type === 'remove') {
    await fetch(`/${target.dataset.id}`, {method: 'DELETE'})
      .then(() => target.closest('li').remove())
  }

  const listItem = target.closest('li')
  const editBtn = listItem.querySelector('.edit-btn')
  const saveBtn = listItem.querySelector('.save-btn')
  const cancelBtn = listItem.querySelector('.cancel-btn')
  const removeBtn = listItem.querySelector('.btn-danger')
  const title = listItem.querySelector('[data-type="title"]')

  if (target.dataset.type === 'edit') {
    target.style.display = 'none'
    removeBtn.style.display = 'none'
    saveBtn.style.display = 'block'
    cancelBtn.style.display = 'block'
    title.dataset.originalTitle = title.innerText
    title.style.minWidth = '100px'
    title.contentEditable = 'true'
    title.focus()
  }

  if (target.dataset.type === 'save') {
    target.style.display = 'none'
    cancelBtn.style.display = 'none'
    listItem.querySelector('[data-type="edit"]').style.display = 'block'
    removeBtn.style.display = 'block'
    title.contentEditable = 'false'
    const newTitle = title.innerText

    await update(target.dataset.id, newTitle).then(() => title.innerText = newTitle)
  }

  if (target.dataset.type === 'cancel') {
    target.style.display = 'none'
    editBtn.style.display = 'none'
    title.innerText = title.dataset.originalTitle
    title.contentEditable = 'false'
    listItem.querySelector('[data-type="edit"]').style.display = 'block'
    removeBtn.style.display = 'block'
  }
})

async function update(id, newTitle) {
  await fetch(`/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({title: newTitle})
  })
}