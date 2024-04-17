import { useSelector } from "react-redux"
const Profile = () => {
  const  {currentUser} = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex  flex-col  gap-4 justify-center">
        <img className="w-20 h-20 rounded-full self-center object-cover mt-2" src={currentUser?.photo} alt={currentUser?.username} />
        <input type="text" placeholder="username" id="username" className="border p-3 rounded-lg"/>
        <input type="email" placeholder="email" id="email" className="border p-3 rounded-lg"/>
        <input type="password" placeholder="password" id="password" className="border p-3 rounded-lg"/>
        <button className="bg-slate-700 p-3 text-white rounded-lg uppercase">Update</button>
      </form>
      <div className="flex text-red-700 justify-between mt-5 font-medium">
        <span>Delete account</span>
        <span>Sign out</span>
      </div>
    </div>
  )
}

export default Profile