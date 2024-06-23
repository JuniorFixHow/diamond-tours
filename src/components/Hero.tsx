const Hero = () => {
  return (
    <section id="hero" className=" flex items-center bg-[url(/imgs/Rectangle100.png)] bg-cover bg-center bg-no-repeat h-[calc(100vh-56px)] w-full" >
        <div className="flex flex-col items-center md:items-start gap-20 ml-2 sm:ml-20">
            <span className="text-black text-4xl sm:text-6xl font-semibold text-center md:text-left" >World Awaits <br />Stress-free Travel Starts Here </span>
            <a href="#services">
              <button className="bg-[#CB4900] border-none rounded-2xl p-4 text-white font-medium w-36 hover:bg-orange-400" >Learn More</button>
            </a>
        </div>
    </section>
  )
}

export default Hero