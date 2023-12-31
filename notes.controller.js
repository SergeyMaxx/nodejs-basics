const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
  const notes = await getNotes()

  const note = {
    title,
    id: Date.now().toString()
  }

  notes.push(note)

  await saveNotes(notes)
  console.log(chalk.bgGreen('Note was added!'))
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes))
}

async function printNotes() {
  const notes = await getNotes()
  console.log(chalk.bgBlue('Here is the list of notes:'))
  notes.forEach(n => console.log(chalk.bgWhite(n.id), chalk.blue(n.title)))
}

async function removeNote(id) {
  const notes = await getNotes()
  await saveNotes(notes.filter(n => n.id !== id))
  console.log(chalk.bgRed(`Note with id: ${id} has been deleted`))
}

async function edit(id, newContent) {
  const notes = await getNotes()
  notes.find(n => n.id === id).title = newContent
  await saveNotes(notes)
  console.log(chalk.bgBlue(`Note with id: ${id} has been updated`))
}

module.exports = {
  addNote,
  getNotes,
  removeNote,
  edit
}