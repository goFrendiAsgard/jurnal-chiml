// filename: bpmn.terminal.js
// usage: node bpmn.terminal.js
const bpmn = require('bpmn')
const path = require('path')
bpmn.createUnmanagedCollaboratingProcesses(path.join(__dirname, 'genres.bpmn'), (error, myProcess) => {
  if (error) {
    return console.error(error)
  }
  return myProcess.triggerEvent('start')
})
