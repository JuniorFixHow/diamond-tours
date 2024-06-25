const About = () => {
  return (
    <section id="about" className="w-full scroll-mt-14 bg-[#d9d9d9] flex flex-col py-8" >
        <div className="flex bg-[#d9d9d9] items-center justify-center w-full py-4">
            <div className="flex flex-col w-5/6 gap-8">
                <h2 className="text-black text-2xl sm:text-3xl font-bold text-center md:text-left" ><span className="text-[#CB4900]" >About Us</span></h2>
                <div className="flex w-full flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex col flex-col gap-4">
                        <h2 className="text-black text-2xl sm:text-3xl font-semibold text-center md:text-left" >Learn more about our team 
                        and what we have to offer </h2>
                        <h2 className="text-black text-xl sm:text-2xl text-center md:text-left md:w-5/6" ><span className="text-[#CB4900]" >DIAMOND TOURS GHANA</span> has been the leading travel agency with the ability
                            and commitment to helping individuals travel around the world over the years.
                            Over the years, we have helped thousands of people to travel to work, study, and visit abroad with ease. 
                            We hold the records of successful traveling experiences.</h2>
                    </div>
                    <img src="/imgs/meeting-2284501_1280.jpg" className="w-60 h-60 rounded-full object-cover" alt="" />
                </div>
            </div>
        </div>
        <div className="flex bg-white items-center justify-center w-full py-4">
            <div className="w-5/6 flex items-center justify-center flex-col md:grid md:place-items-start gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col gap-4 items-center justify-center w-80">
                    <h2 className="text-black text-xl sm:text-2xl font-bold text-center md:text-left" ><span className="text-[#CB4900]" >MISSION</span></h2>
                    <h2 className="text-black text-xl text-center" >At <span className="text-[#CB4900]" >DIAMOND TOURS GHANA</span>, our mission is to ignite the spirit of adventure, enabling our clients to explore the world with ease, authenticity, and unparalleled joy.
                    We are dedicated to curating seamless travel experiences that cater to the diverse interests and aspirations of our clients.</h2>
                </div>
                <div className="flex flex-col gap-4 items-center justify-center w-80">
                    <h2 className="text-black text-xl font-bold text-center md:text-left" ><span className="text-[#CB4900]" >VISION</span></h2>
                    <h2 className="text-black text-xl text-center" >At <span className="text-[#CB4900]" >DIAMOND TOURS, </span>we envision a world where travel transcends boundaries, creating unforgettable experiences that inspire, connect, and enrich the lives of our clients.
                    Our vision is to be the premier travel agency that transforms dreams into reality, fostering a global community of explorers who seek the extraordinary.</h2>
                </div>
                <div className="flex flex-col gap-4 items-center justify-center w-80">
                    <h2 className="text-black text-xl font-bold text-center" ><span className="text-[#CB4900]" >VALUES</span></h2>
                    <h2 className="text-black text-xl text-center" >Honesty
                        <br/>Quality Services
                        <br/>Integrity
                        <br/>Teamwork
                        <br/>Transparency</h2>
                </div>
            </div>
        </div>
    </section>
  )
}

export default About