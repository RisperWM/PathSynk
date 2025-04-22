import { useAuthStore } from '../store/useAuthStore';

const TopNav = () => {
    const user = useAuthStore((state: any) => state.user);

    return (
        <div className='flex flex-row justify-between items-center'>
            <div className="flex justify-start items-center">
                <p className="text-blue-950 text-xl font-bold">Welcome Back, {user?.username} 👋</p>
            </div>
            <div className=' flex flex-row'>
                <input type="search" name="search" id="search" placeholder='Search here ...' className='p-2 border border-gray-600 w-80 h-10 rounded-md  mr-7' />
                <div className='flex flex-col mr-2 text-right'>
                    <span className='text-sm text-blue-950 font-semibold m-0 p-0'>{user?.username}</span>
                    <span className='text-sm text-blue-950 font-semibold m-0 p-0'>{user?.email}</span>
                </div>
                <span className='border border-blue-950 px-4 py-2 rounded-full text-white font-bold bg-blue-900 mr-2 text-lg'>{user?.username?.charAt(0).toUpperCase()}</span>
            </div>
        </div>
    );
};
export default TopNav;
