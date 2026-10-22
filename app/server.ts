import express from "express";

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT || 4173);
const demoUser = { email: "qa@example.com", password: "Passw0rd!" };

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.get("/", (_req, res) => {
  res.type("html").send(`<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>TestMu SDET Demo</title>
<style>
body{font:16px system-ui;max-width:760px;margin:40px auto;padding:0 18px;color:#18221e}
.card{border:1px solid #d4ddd8;border-radius:12px;padding:24px;margin:16px 0}
label{display:block;margin:12px 0 4px}input{padding:10px;width:min(100%,320px);box-sizing:border-box}
button{padding:10px 16px;margin-top:14px;cursor:pointer}
#error{color:#a21d24}#dashboard{display:none} .muted{color:#52645a}
</style></head>
<body>
<h1>Quality Dashboard</h1>
<p class="muted">Local demo application for the TestMu AI SDET-1 assessment.</p>
<section class="card" id="login">
<h2>Login</h2>
<form id="loginForm">
<label for="email">Email</label><input id="email" type="email" value="qa@example.com" required>
<label for="password">Password</label><input id="password" type="password" value="Passw0rd!" required>
<br><button type="submit">Sign in</button>
</form><p id="error" role="alert"></p><a href="#" id="forgot">Forgot password?</a>
</section>
<section class="card" id="dashboard">
<h2>Dashboard</h2><p id="welcome">Welcome!</p>
<label for="filter">Filter widgets</label>
<select id="filter"><option value="all">All widgets</option><option value="sales">Sales</option><option value="users">Users</option></select>
<ul id="widgets"><li data-kind="sales">Sales: 120</li><li data-kind="users">Users: 42</li></ul>
<button id="logout">Log out</button>
</section>
<script>
const form=document.querySelector('#loginForm');
form.addEventListener('submit',async e=>{
 e.preventDefault();
 const r=await fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:document.querySelector('#email').value,password:document.querySelector('#password').value})});
 const data=await r.json();
 if(r.ok){document.querySelector('#login').style.display='none';document.querySelector('#dashboard').style.display='block';document.querySelector('#welcome').textContent='Welcome, '+data.user.email;}
 else document.querySelector('#error').textContent=data.error || 'Login failed';
});
document.querySelector('#forgot').addEventListener('click',e=>{e.preventDefault();document.querySelector('#error').textContent='Password reset instructions would be sent if the account exists.';});
document.querySelector('#filter').addEventListener('change',e=>{document.querySelectorAll('#widgets li').forEach(x=>x.style.display=e.target.value==='all'||x.dataset.kind===e.target.value?'list-item':'none');});
document.querySelector('#logout').addEventListener('click',()=>{document.querySelector('#dashboard').style.display='none';document.querySelector('#login').style.display='block';document.querySelector('#password').value='';});
</script></body></html>`);
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body ?? {};
  if (email === demoUser.email && password === demoUser.password) {
    return res.json({ token: "demo-token-not-for-production", user: { email } });
  }
  return res.status(401).json({ error: "Invalid email or password" });
});

app.get("/api/widgets", (req, res) => {
  const auth = req.header("authorization");
  if (auth !== "Bearer demo-token-not-for-production") {
    return res.status(401).json({ error: "Missing or invalid token" });
  }
  return res.json({
    widgets: [
      { id: 1, name: "Sales", value: 120 },
      { id: 2, name: "Users", value: 42 }
    ]
  });
});

app.get("/api/users/:id", (req, res) => {
  if (req.params.id !== "1") return res.status(404).json({ error: "User not found" });
  return res.json({ id: 1, name: "QA Demo", role: "tester" });
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Demo app listening on http://127.0.0.1:${PORT}`);
});
