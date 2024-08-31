
import Link from "next/link";

import {FaHome} from "react-icons/fa"
import {FaUserFriends} from "react-icons/fa"
import { FaCoins } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";

const Navbar = () => {
  return (
    
      <div className="fixed bottom-0 left-0 right-0 h-[80px] bg-[#202020] grid grid-cols-4 justify-center justify-items-center items-center text-gray-400 font-bold ">
      <Link href="/">
        <div>
          <FaHome className=" w-[30px] h-[30px] ml-1.5" color="gray"/>
          <p>Home</p>
        </div>
      </Link>
      <Link href="/friends">
        <div>
          <FaUserFriends className=" w-[30px] h-[30px] ml-2" color="gray"/>
          <p>Friends</p>
        </div>
      </Link>
      <Link href="/earn">
        <div>
          <FaCoins className=" w-[25px] h-[25px] ml-1.5" color="gray"/>
          <p>Earn</p>
        </div>
      </Link>
      <Link href="/">
        <div>
          <FaWallet className=" w-[25px] h-[25px] ml-1.5" color="gray"/>
          <p>Wallet</p>
        </div>
      </Link>
          
      
    </div>

    
  )
}

export default Navbar;
