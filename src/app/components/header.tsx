import Link from "next/link";


function Header() {
    return (
        <div className="flex justify-between items-center bg-gray-800 text-white p-4 shadow-md ">
            <Link href="/" className="">
                <h1 className="text-3xl font-bold">My Restaurant</h1>
            </Link>
     
        </div>
    );
}

export default Header;