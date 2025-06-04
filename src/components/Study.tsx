import { PackageData } from "../data/PackageData"
import { StudyData } from "../data/StudyData"
import ImageViewer from "../misc/ImageViewer";

const Study = () => {
    const heading = PackageData[1]?.desc;
  return (
    <div className="flex flex-col w-full" >
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6578473026963707"
     crossOrigin='anonymous' ></script>
          <div className="flex items-center justify-center md:justify-start md:items-end py-8 w-full bg-no-repeat bg-cover h-60 md:h-96 bg-[linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.7)),url(/packages/people-2557396_1920.jpg)]">
            <span className="ml-0 text-2xl font-bold text-center text-white md:ml-8" >Study Abroad</span>
          </div>
    
          <div className="flex flex-col items-center w-full gap-8 py-8 bg-white">
            <span className="text-[0.8rem] text-center w-[95%]  lg:w-4/5 xl:w-2/3" >{heading}</span>
            <div className="grid place-items-center gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center w-[95%]  lg:w-4/5 xl:w-2/3">
              {
                StudyData &&
                StudyData.map((study)=>(
                <ImageViewer key={study?.id} image={study?.image} title={study?.country} desc={study?.desc} />
                ))
              }
            </div>

            <div className="flex flex-col items-center md:items-start gap-4 w-[95%]  lg:w-4/5 xl:w-2/3">
                <span className='text-2xl font-semibold text-center md:text-left lg:text-4xl' >Prerequisite</span>

                <div className="flex items-center gap-4">
                    <span className="text-[#CB4900] font-bold" >Assessment Fee - </span>
                    <span className="text-[0.9rem] font-bold" >GHS 350</span>
                </div>

                <div className="flex flex-col gap-4">
                    <span className="text-[#CB4900] font-bold" >Requirements (Undergraduate)</span>
                    <div className="flex flex-col gap-3">
                        <span className="text-[0.9rem]" >&#8226;  WASSCE results</span>
                        <span className="text-[0.9rem]" >&#8226;  Transcript (official or non-official)</span>
                        <span className="text-[0.9rem]" >&#8226;  Passport Biodata</span>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <span className="text-[#CB4900] font-bold" >Requirements (Postgraduate)</span>
                    <div className="flex flex-col gap-3">
                        <span className="text-[0.9rem]" >&#8226;  University certificate</span>
                        <span className="text-[0.9rem]" >&#8226;  Transcript (official or non-official)</span>
                        <span className="text-[0.9rem]" >&#8226;  Passport Biodata</span>
                    </div>
                </div>

                <span className='text-2xl font-semibold text-center md:text-left lg:text-4xl' >Admission</span>

                <div className="flex items-center gap-4">
                    <span className="text-[#CB4900] font-bold" >Service Charge - </span>
                    <span className="text-[0.9rem] font-bold" >150USD</span>
                </div>

                <div className="flex flex-col gap-4">
                    <span className="text-[#CB4900] font-bold" >Requirements</span>
                    <div className="flex flex-col gap-3">
                        <span className="text-[0.9rem]" >&#8226;  Senior High School Certificate</span>
                        <span className="text-[0.9rem]" >&#8226;  Bachelor Individual Marksheet</span>
                        <span className="text-[0.9rem]" >&#8226;  Academic Transcript</span>
                        <span className="text-[0.9rem]" >&#8226;  Provisional or Final Degree Certificate</span>
                        <span className="text-[0.9rem]" >&#8226;  Declaration</span>
                        <span className="text-[0.9rem]" >&#8226;  Copy of Passport</span>
                        <span className="text-[0.9rem]" >&#8226;  Statement of Purpose</span>
                        <span className="text-[0.9rem]" >&#8226;  CV</span>
                        <span className="text-[0.9rem]" >&#8226;  Letter of Recommendation</span>
                        <span className="text-[0.9rem]" >&#8226;  Consent Form</span>
                        <span className="text-[0.9rem]" >&#8226;  Scratch Card</span>
                    </div>
                </div>

                <span className="text-[0.8rem] font-semibold" >Please note that admission requirements are institution-specific, and may differ from one school to another.</span>

                <div className="flex items-center gap-4">
                    <span className="text-[#CB4900] font-bold" >English Proficiency Test (TOFEL, GRE, GMAT, IELTS) Registration and Preparation (Virtual) -</span>
                    <span className="text-[0.9rem] font-bold" >75USD</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-[#CB4900] font-bold" >Scholarship Applications - </span>
                    <span className="text-[0.9rem] font-bold" >GHC 5215</span>
                </div>
            </div>
          </div>
        </div>
  )
}

export default Study