
const { useState } = React;

function RestaurantApp() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const menuItems = [
    { id: 1, name: "Nasi Goreng Spesial", price: 35000 },
    { id: 2, name: "Ayam Bakar Madu", price: 45000 },
    { id: 3, name: "Sate Ayam Madura", price: 40000 },
    { id: 4, name: "Mie Goreng Jawa", price: 30000 },
  ];

  const users = {
    admin: { username: "admin", password: "admin123", role: "admin" },
    buyer: { username: "buyer", password: "buyer123", role: "buyer" },
  };

  function handleLogin() {
    if (username === users.admin.username && password === users.admin.password) {
      setUser(users.admin);
    } else if (username === users.buyer.username && password === users.buyer.password) {
      setUser(users.buyer);
    } else {
      alert("Username atau password salah");
    }
  }

  function handleLogout() {
    setUser(null);
    setUsername("");
    setPassword("");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      {!user ? (
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Login Restoran</h1>
          <input type="text" placeholder="Username"
            className="w-full p-3 mb-4 rounded-xl border"
            value={username} onChange={(e)=>setUsername(e.target.value)} />
          <input type="password" placeholder="Password"
            className="w-full p-3 mb-4 rounded-xl border"
            value={password} onChange={(e)=>setPassword(e.target.value)} />
          <button onClick={handleLogin}
            className="w-full p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
            Login
          </button>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-3xl">
          <div className="flex justify-between mb-6">
            <h1 className="text-2xl font-bold">Selamat Datang, {user.username}</h1>
            <button onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-xl">Logout</button>
          </div>

          {user.role === "admin" && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Panel Admin</h2>
              <p className="text-gray-600">Admin dapat mengelola menu & data pembeli.</p>
            </div>
          )}

          <h2 className="text-xl font-semibold mb-4">Menu Restoran</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {menuItems.map((item)=>(
              <div key={item.id} className="p-4 bg-gray-50 rounded-xl shadow">
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-gray-700">Rp {item.price.toLocaleString()}</p>
                {user.role === "buyer" && (
                  <button className="mt-3 w-full bg-green-600 text-white p-2 rounded-xl">
                    Pesan
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<RestaurantApp />);
