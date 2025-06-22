import { JobData } from "../data/JobData"
import { PackageData } from "../data/PackageData";
import OtherOffers from "../misc/OtherOffers";

const Jobs = () => {
    const heading = PackageData[0]?.desc;
  return (
    <div className="flex flex-col w-full" >
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6578473026963707"
     crossOrigin='anonymous' ></script>
          <div className="flex items-center justify-center md:justify-start md:items-end py-8 w-full bg-no-repeat bg-cover h-60 md:h-96 bg-[linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.7)),url(/packages/dream-job-2904780_1920.jpg)]">
            <span className="ml-0 text-2xl font-bold text-center text-white md:ml-8" >Jobs Abroad</span>
          </div>
    
          <div className="flex justify-center w-full py-8 bg-white">

            
            <div className="flex flex-col gap-16 items-center w-[95%]  lg:w-4/5 xl:w-2/3">
                <span className="text-[0.8rem] text-center">{heading}</span>
                {
                    JobData.map((job, index)=>{
                        const details = job?.detail;
                        const jobs = job?.jobs;
                        const reqs = job?.requirements;
                        const places = job?.pow;
                        const notices = job?.notices;
                        const even = index % 2 ===0;
                        return (
                            <div key={job.id} className="flex flex-col w-full gap-4 pb-4">
                                <span className='text-2xl font-semibold text-center md:text-left lg:text-4xl' >{job?.title}</span>
                                <div className={`flex flex-col gap-6 md:flex-row self-center w-full md:justify-between ${even && 'md:flex-row-reverse'}`}>
                                    <img src={job?.images[0]} alt={job?.title} className=" h-[25rem]" />
                                    <div className="flex flex-col gap-4 ml-10 md:m-0">
                                        {
                                            places &&
                                            <div className="flex flex-col">
                                                <span className="text-[#CB4900] font-bold" >Places</span>
                                                <div className="flex flex-col gap-3">
                                                    {
                                                        places?.map((item)=>(
                                                            <span key={item} className="text-[0.9rem] font-bold" >&#8226; {item}</span>
                                                        ))
                                                    }
                                                </div>
                                            </div>

                                        }
                                        {
                                            job?.jobName &&
                                            <div className="flex justify-between">
                                                <span className="text-[#CB4900] font-bold" >Job Title:</span>
                                                <span className="text-[0.9rem] font-bold" >{job?.jobName}</span>
                                            </div>
                                        }
                                        {
                                            details &&
                                            <div className="flex flex-col">
                                                <span className="text-[#CB4900] font-bold" >Benefits</span>
                                                <div className="flex flex-col gap-3">
                                                    {
                                                        details?.map((item)=>(
                                                            <span key={item} className="text-[0.9rem] font-bold" >&#8226; {item}</span>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        }
                                        <div className="flex flex-col gap-4 mt-8">
                                            <div className="flex justify-between gap-4">
                                                <span className="text-[#CB4900] font-bold" >Price:</span>
                                                <span className="font-bold text-[0.9rem]" >{job?.cost}</span>
                                            </div>
                                            {
                                                job?.cost2 &&
                                                <div className="flex justify-between gap-4">
                                                    <span className="text-[#CB4900] font-bold" >Price (Advanced Jobs):</span>
                                                    <span className="font-bold text-[0.9rem]" >{job?.cost2}</span>
                                                </div>
                                            }
                                            {
                                                job?.fee &&
                                                <div className="flex justify-between gap-4">
                                                    <span className="text-[#CB4900] font-bold" >Initial Deposit:</span>
                                                    <span className="font-bold text-[0.9rem]" >{job?.fee}</span>
                                                </div>
                                            }
                                            {
                                                job?.registerFee &&
                                                <div className="flex justify-between gap-4">
                                                    <span className="text-[#CB4900] font-bold" >Registration Fee:</span>
                                                    <span className="font-bold text-[0.9rem]" >{job?.registerFee}</span>
                                                </div>
                                            }
                                            {
                                                job?.duration &&
                                                <div className="flex justify-between gap-4">
                                                    <span className="text-[#CB4900] font-bold" >Processing:</span>
                                                    <span className="font-bold text-[0.9rem]" >{job?.duration}</span>
                                                </div>
                                            }
                                            {
                                                job?.ppt &&
                                                <div className="flex justify-between gap-4">
                                                    <span className="text-[#CB4900] font-bold" >Preparation:</span>
                                                    <span className="font-bold" >{job?.ppt}</span>
                                                </div>
                                            }
                                            {
                                                job?.workingDays &&
                                                <div className="flex justify-between gap-4">
                                                    <span className="text-[#CB4900] font-bold" >Working Days:</span>
                                                    <span className="font-bold" >{job?.workingDays}</span>
                                                </div>
                                            }
                                            {
                                                job?.salary &&
                                                <div className="flex justify-between gap-4">
                                                    <span className="text-[#CB4900] font-bold" >Salary:</span>
                                                    <span className="font-bold text-[0.9rem]" >{job?.salary}</span>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col w-full gap-8 mt-8 md:flex-row md:justify-between">
                                    {
                                        (reqs || notices) &&
                                        <div className="flex flex-col gap-6">
                                            {
                                                reqs &&
                                                <div className="flex flex-col gap-4 ml-10 md:m-0">
                                                    <span className="text-[#CB4900] font-bold" >Requirements</span>
                                                    <div className="flex flex-col gap-3">
                                                        {
                                                            reqs?.map((item)=>(
                                                                <span key={item} className="text-[0.9rem] font-bold" >&#8226; {item}</span>
                                                            ))
                                                        }
                                                    </div>

                                                    
                                                </div>
                                            }

                                            {
                                            notices &&
                                            <div className="flex flex-col gap-2 ml-10 md:m-0">
                                                <span className="text-[#CB4900] font-bold" >Notice</span>
                                                <div className="flex flex-col gap-3">
                                                    {
                                                        notices?.map((item)=>(
                                                            <span key={item} className="text-[0.9rem] font-bold max-w-80" >&#8226; {item}</span>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            }
                                        </div>
                                    }
                                    {
                                        jobs &&
                                        <div className="flex flex-col gap-4 ml-10 md:m-0">
                                            <span className="text-[#CB4900] font-bold" >Jobs</span>
                                            <div className="flex flex-col gap-3">
                                                {
                                                    jobs?.map((item)=>(
                                                        <span key={item} className="text-[0.9rem] font-bold max-w-80" >&#8226; {item}</span>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    }
                                    
                                </div>
                                
                                {
                                    job?.desc &&
                                    <div className="flex flex-col ml-10 md:m-0">
                                        <span className="text-[#CB4900] font-bold" >Package Description</span>
                                        <span  className="text-[0.9rem] font-bold" > {job?.desc}</span>
                                    </div>
                                }
                            </div>
                        )
                    })
                }

                <OtherOffers/>
            </div>
          </div>
        </div>
  )
}

export default Jobs