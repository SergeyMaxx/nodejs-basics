document.addEventListener('click', async ({target}) => {
  if (target.dataset.type === 'remove') {
    await fetch(`/${target.dataset.id}`, {method: 'DELETE'})
      .then(() => target.closest('li').remove())
  }

  if (target.dataset.type === 'update') {
    const newTitle = prompt('Update note')

    if (newTitle.trim()) {
      update(target.dataset.id, newTitle).then(() => {
        target.closest('li').querySelector('div').innerText = newTitle
      })
    }
  }
})

async function update(id, newTitle) {
  await fetch(`/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({title: newTitle})
  })
}