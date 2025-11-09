import {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../lib/axios';


const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) =>{
        e.preventDefault();
        try{
            const res = await axiosInstance.post("/admin/login", {email,password});
            localStorage.setItem("adminToken", res.data.token);
            navigate('/admin/menu/list')
        }catch(error){
            console.log("error in handle login", error);
            alert("Invalid credentials");
        }
    }


  return (
    <div className="flex justify-center items-center min-h-screen bg-orange-50">
  <form 
    onSubmit={handleLogin} 
    className="w-full max-w-sm p-8 bg-linear-to-br from-orange-400 to-orange-500 shadow-lg rounded-2xl"
  >
    <h2 className="text-2xl font-bold mb-6 text-white text-center">Admin Login</h2>
    
    <input 
      type="email" 
      placeholder="Email" 
      className="w-full mb-4 p-3 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-white text-gray-800" 
      value={email} 
      onChange={(e) => setEmail(e.target.value)} 
    />
    
    <input 
      type="password" 
      placeholder="Password" 
      className="w-full mb-6 p-3 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-white text-gray-800" 
      value={password} 
      onChange={(e) => setPassword(e.target.value)} 
    />
    
    <button 
      className="w-full bg-white text-orange-500 font-semibold py-3 rounded-lg hover:bg-orange-100 transition-all duration-200"
    >
      Login
    </button>
    <Link to='/'>
        <button 
        className="w-full bg-white text-orange-500 font-semibold py-3 rounded-lg hover:bg-orange-100 transition-all duration-200 mt-2"
        >
        Back To Home Page
        </button>

    </Link>
  </form>
</div>

  )
}

export default AdminLogin