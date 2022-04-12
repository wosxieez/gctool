const connectButton = document.getElementById('connect')
const runButton = document.getElementById('run')
const hostInput = document.getElementById('host')
const portInput = document.getElementById('port')
const usernameInput = document.getElementById('username')
const passwordInput = document.getElementById('password')
const sqlView = document.getElementById('sql')
const messageView = document.getElementById('message')

connectButton.addEventListener('click', () => {
  console.log('connect...')
  window.api.connect({
    host: hostInput.value,
    port: portInput.value,
    user: usernameInput.value,
    password: passwordInput.value
  })
})

runButton.addEventListener('click', () => {
  console.log('run...', sqlView.value)
  window.api.run(sqlView.value)
})

window.api.onMessage((_, message) => {
  console.log('on message...', message)
  messageView.innerHTML = message
})
