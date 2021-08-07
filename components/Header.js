import Image from "next/image"
import {
	GlobeAltIcon,
	SearchIcon,
	MenuIcon,
	UserCircleIcon,
	UsersIcon,
} from "@heroicons/react/solid"
import { useState } from "react"
import "react-date-range/dist/styles.css" // main style file
import "react-date-range/dist/theme/default.css" // theme css file
import { DateRangePicker } from "react-date-range"
import { useRouter } from "next/dist/client/router"

function Header({placeholder}) {
	const [searchInput, setSeacrhInput] = useState("")
	const [startDate, setStartDate] = useState(new Date())
	const [endDate, setEndDate] = useState(new Date())
	const [noOfGuests, setNoOfGuests] = useState(1)
	const router = useRouter()

	const handleSelect = (ranges) => {
		setStartDate(ranges.selection.startDate)
		setEndDate(ranges.selection.endDate)
	}

	const search = () => {
		router.push({
			pathname: "/search",
			query: {
				location: searchInput,
				startDate: startDate.toISOString(),
				endDate: endDate.toISOString(),
				noOfGuests,
			},
		})
	}

	const selectionRange = {
		startDate: startDate,
		endDate: endDate,
		key: "selection",
	}

	const resetInput = () => {
		setSeacrhInput("")
	}

	return (
		<header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
			<div
				onClick={() => router.push("/")}
				className="relative flex items-center h-10 cursor-pointer"
			>
				<Image
					src="https://links.papareact.com/qd3"
					layout="fill"
					objectFit="contain"
					objectPosition="left"
				/>
			</div>

			<div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
				<input
					value={searchInput}
					onChange={(e) => setSeacrhInput(e.target.value)}
					type="text"
					placeholder={placeholder || "Search your search! "}
					className="flex-grow pl-5 bg-transparent outline-none text-gray-600 placeholder-gray-400"
				/>
				<SearchIcon className="h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer hidden md:inline-flex md:mx-2" />
			</div>

			<div className="flex items-center space-x-4 justify-end text-gray-500">
				<p className="hidden md:inline cursor-pointer">Become a host</p>
				<GlobeAltIcon className="h-6" />
				<div className="flex items-center p-2 border-2 space-x-2 rounded-full">
					<UserCircleIcon className="h-6" />
					<MenuIcon className="h-6" />
				</div>
			</div>

			{searchInput && (
				<div className="flex flex-col col-span-3 mx-auto p-3 shadow-lg my-3 rounded-xl">
					<DateRangePicker
						ranges={[selectionRange]}
						minDate={new Date()}
						rangeColors={["#FD5B61"]}
						onChange={handleSelect}
					/>
					<div className="flex items-center border-b">
						<h2 className="text-2xl flex-grow font-semibold">
							Number of Guest
						</h2>

						<UsersIcon className="h-5" />
						<input
							value={noOfGuests}
							onChange={(e) => setNoOfGuests(e.target.value)}
							type="number"
							className="w-12 pl-2 text-lg outline-none text-red-400 font-semibold"
							min={1}
						/>
					</div>
					<div className="flex items-center mt-3">
						<button
							className="flex-grow text-gray-500 hover:text-gray-600"
							onClick={resetInput}
						>
							Cancel
						</button>
						<button
							onClick={search}
							className="flex-grow text-red-400 hover:text-white hover:bg-red-400 p-3 rounded-full transition duration-150 active:scale-90"
						>
							Search
						</button>
					</div>
				</div>
			)}
		</header>
	)
}

export default Header
