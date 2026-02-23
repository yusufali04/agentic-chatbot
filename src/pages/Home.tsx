
const Home = () => {
    return (
        // hide scrollbar but still allow scrolling 
        <div className="text-white container mx-auto max-w-4xl p-4 h-full overflow-y-auto hide-scroll pb-45">

            {/* messages goes here */}
            <div className="my-6 bg-neutral-800 p-3 rounded-xl ml-auto w-fit">
                Hi, How are you doing?
            </div>
            {/* assistant message */}
            <div className="bg-primary p-3 rounded-xl mr-auto w-fit">
                I am fine, How are you doing?
            </div>
            {/* bottom text area goes here */}
            <div className="fixed bottom-5 left-0 right-0 mx-auto max-w-4xl">
                <div className="bg-neutral-800 rounded-xl p-4 mt-6">
                    <textarea className="w-full p-3 rounded-xl text-white resize-none outline-none custom-scroll" placeholder="Type your message here..." rows={2} />
                    <div className="flex justify-end items-center">
                        <button className="bg-white text-black px-4 py-2 rounded-xl mt-2 cursor-pointer hover:bg-gray-200">Send</button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Home;