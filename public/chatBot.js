(function () {

const api_url = "http://localhost:3000/api/chatbot"
const scriptTag = document.currentScript;
const ownerId = scriptTag.getAttribute("data-owner-id")

if (!ownerId) {
console.log("Owner ID not found")
return
}

const button = document.createElement("div")
button.innerHTML = "💬"

Object.assign(button.style,{
position:"fixed",
bottom:"24px",
right:"24px",
width:"56px",
height:"56px",
borderRadius:"50%",
background:"#000",
color:"#fff",
display:"flex",
alignItems:"center",
justifyContent:"center",
cursor:"pointer",
fontSize:"22px",
boxShadow:"0 15px 40px rgba(0,0,0,0.35)",
zIndex:"999999"
})

document.body.appendChild(button)

const box = document.createElement("div")

Object.assign(box.style,{
position:"fixed",
bottom:"90px",
right:"24px",
width:"320px",
height:"430px",
background:"#fff",
borderRadius:"14px",
boxShadow:"0 25px 60px rgba(0,0,0,0.25)",
display:"none",
flexDirection:"column",
overflow:"hidden",
zIndex:"999999",
fontFamily:"Inter, system-ui, sans-serif"
})

box.innerHTML = `
<div style="
background:#000;
color:#fff;
padding:12px 14px;
font-size:14px;
display:flex;
justify-content:space-between;
align-items:center;
">
<span>Customer Support Assistant</span>
<span id="chat-close" style="cursor:pointer;font-size:18px;">✖</span>
</div>

<div id="chat-messages" style="
flex:1;
padding:12px;
overflow-y:auto;
background:#f9fafb;
display:flex;
flex-direction:column;
"></div>

<div style="
display:flex;
border-top:1px solid #e5e7eb;
padding:8px;
gap:6px;
">
<input type="text" id="chat-input"
style="
flex:1;
padding:8px 10px;
border:1px solid #d1d5db;
font-size:13px;
outline:none;
"
placeholder="Ask your question here..."
/>

<button id="chat-send"
style="
border:none;
background:#000;
color:#fff;
border-radius:8px;
font-size:13px;
cursor:pointer;
padding:8px 12px;
">
Send
</button>

</div>
`

document.body.appendChild(box)

const closeBtn = box.querySelector("#chat-close")

button.onclick = () => {
box.style.display = "flex"
}

closeBtn.onclick = () => {
box.style.display = "none"
}

const input = box.querySelector("#chat-input")
const sendButton = box.querySelector("#chat-send")
const messageArea = box.querySelector("#chat-messages")


function addMessage(text, from) {

const bubble = document.createElement("div")
bubble.innerHTML = text

Object.assign(bubble.style,{
maxWidth:"78%",
padding:"8px 12px",
borderRadius:"14px",
fontSize:"13px",
lineHeight:"1.4",
marginBottom:"8px",
alignSelf: from === "user" ? "flex-end" : "flex-start",
background: from === "user" ? "#000" : "#e5e7eb",
color: from === "user" ? "#fff" : "#111",
borderTopRightRadius: from === "user" ? "4px" : "14px",
borderTopLeftRadius: from === "user" ? "14px" : "4px"
})

messageArea.appendChild(bubble)
messageArea.scrollTop = messageArea.scrollHeight
}

sendButton.onclick = async () => {

const text = input.value.trim()

if (!text) return

addMessage(text,"user")
input.value=""

const typing = document.createElement("div")
typing.innerHTML = "Assistant is typing..."

Object.assign(typing.style,{
fontSize:"12px",
color:"#6b7280",
marginBottom:"8px",
alignSelf:"flex-start"
})

messageArea.appendChild(typing)
messageArea.scrollTop = messageArea.scrollHeight

try {

const response = await fetch(api_url,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
ownerId,
message:text
})
})

const data = await response.json()

messageArea.removeChild(typing)

addMessage(data.reply || "I'm sorry, I couldn't process your request at the moment.","ai")

} catch(error){

messageArea.removeChild(typing)

addMessage("An unexpected error occurred while contacting the assistant. Please try again later.","ai")

}

}

input.addEventListener("keydown", (e) => {
if (e.key === "Enter" && !e.shiftKey) {
e.preventDefault()
sendButton.click()
}
})

})()