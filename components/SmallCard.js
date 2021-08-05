import Image from "next/image"

function SmallCard({ img, location, distance }) {
	return (
		<div className="flex items-center m-2 mt-5 space-x-4 rounded-xl hover:bg-gray-100 cursor-pointer hover:scale-105 transition transform duration-150 ease-out">
			<div className="relative h-16 w-16">
				<Image src={img} layout="fill" className="rounded-lg" />
			</div>

			<div>
				<h2 className="font-bold">{location}</h2>
				<h3>{distance}</h3>
			</div>
		</div>
	)
}

export default SmallCard
