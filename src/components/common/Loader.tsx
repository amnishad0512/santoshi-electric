export default function Loader() {
    return (
        <div className="flex flex-col items-center justify-center fixed top-0 left-0 w-full h-full bg-white">
            <div className="flex flex-row gap-2">
                <div className="w-4 h-4 rounded-full bg-[#e69204] animate-bounce"></div>
                <div
                    className="w-4 h-4 rounded-full bg-[#e69204] animate-bounce [animation-delay:-.3s]"
                ></div>
                <div
                    className="w-4 h-4 rounded-full bg-[#e69204] animate-bounce [animation-delay:-.5s]"
                ></div>
            </div>
        </div>
    );
}
