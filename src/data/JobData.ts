import { IJob, ISideJob } from "../types/Types";

export const JobData: IJob[] = [
    {
        id:'1',
        title:'USA - Joint Account',
        salary:'$2900 - $4500+',
        jobName:'Teaching',
        registerFee:'GHS 10,000',
        cost:'GHS 200,000',
        detail:[
            '2-year Visa',
            'Accommodation',
            'Medical Insurance',
            'Travel Insurance',
        ],
        notices:['Payment via Joint Account'],
        duration:'3 - 4 months',
        requirements:[
            'Passport picture (white background for both applicant and spouse)',
            'Passport bio data scan (both applicant and family: spouse/kids)',
            'Kids birth certificates',
            'Marriage certificate',
            'School documents',
            'Driving license',
            'Reference letters (old school, if applicable and current school)',
            'Employment letter',
            'Police report',
            '3 active phone numbers (2 colleagues, 1 supervisor)',
            '3 applicant\'s phone numbers',
            'Home tie document',
            'Bank statements',
        ],
        images:['/packages/work_usa.jpg']
    },

    {
        id:'2',
        title:'UK - Dependant',
        cost: '9000 Punds',
        duration: '3 - 4 months',
        fee:'4500 Punds',
        registerFee:'GHS 2000',
        images:['/packages/work_main.jpg'],
    },

    {
        id: '3',
        title: 'Middle East (Dubai, Qatar, Kuwait)',
        // fee: 'GHS 2,000.00',
        cost: 'GHS 35,000',
        cost2: 'GHS 65,000',
        detail: [
            '2 years work visa',
            'Job',
            'Accommodation',
            'Flight Ticket',
            'Medical Insurance',
            'Travel Insurance'
        ],
        duration: '3 - 6 weeks',
        salary: '1,100 AED – 5,000 AED + Overtime',
        jobs: [
            'Factory work (field operators and assistants)', 
            'Cleaners', 
            'General helpers', 
            'Construction (mason, electricians, forklift operators, excavator operators, drivers, wheel load operators, truck drivers, etc)', 
            'Hotel Workers (cleaners, waiters, helpers, etc)', 
            'Administrative Works'
        ],
        requirements: [
            'Passport Bio page',
            'Passport size picture (1) white background', 
            'Ghana Card (optional)',
            'Yellow fever card',
            'Medical Report',
            'Police report'
        ],
        images: ['/packages/work_uae.jpg']
    },
    {
        id: '4',
        title:'Australia - Visit',
        cost: '$6500',
        fee:'GHS 35,000',
        duration: '8 - 12 Weeks',
        registerFee:'GHS 2000',
        images:['/packages/work_australia.jpg'],
    },
    {
        id: '5',
        title: 'Australia - Job',
        cost: 'GHS 200,000',
        fee: 'GHS 100,000',
        registerFee:'GHS 2000',
        salary:'$6700 - $9500 monthly',
        detail: [
            'Travel Insurance',
            'Medical Insurance',
            'Accommodation',
            'Food Allowance'
        ],
        duration: '4 - 6 months',
        requirements: [
            'Passport Bio page',
            'Passport size picture (2) white background',
            'Ghana Card (if Any)',
            'Curriculum Vitae (if Any)',
            'Police report',
            'Yellow fever card'
        ],
        jobs: [
            'Security', 'Cleaning', 'Hotel', 'Admin', 'Factory', 'Warehouse', 'Farming', 'Restaurant'
        ],
        images: ['/packages/work_australia.jpg']
    },
    {
        id: '6',
        title:'Ireland - Visit',
        cost:'$7000',
        fee:'GHS 35,000',
        duration:'8 - 10 Weeks',
        registerFee:'GHS 2000',
        images:['/packages/work_main.jpg'],
    },
    {
        id: '7',
        title:'Ireland - Job',
        jobs:[
            'Security', 'Cleaning', 'Hotel', 'Admin', 'Factory', 'Warehouse', 'Farming', 'Restaurant', 'etc'
        ],
        cost:'GHS 150,000',
        fee:'GHS 50,000',
        registerFee:'GHS 2000',
        duration:'3 - 4 months',
        detail:[
           'Travel Insurance',
           'Medical Insurance',
           'Accommodation',
           'Food Allowance'
        ],
        salary:'14 Euros per hour',
        images:['/packages/work_main.jpg']
    },
    {
        id: '8',
        title: 'Luxembourg - Joint Account',
        cost: '13,000 Euros',
        duration: '3 - 4 months',
        detail:[
           '3 years work Visa',
           'Travel Insurance',
           'Medical Insurance',
           'Accommodation',
           'Food Allowance'
        ],
        images:['/packages/work_luxembourg3.jpg', '/packages/work_luxembourg2.jpg'],
        registerFee:'GHS 10,000',
        requirements:[
            'Passport', 'Passport-size picture',
            'European standard CV'
        ],
        notices:[
            '7000 Euros payment via Joint Account after travel',
            '6000 Euros payment after travel',
        ]
    },

    {
        id: '10',
        registerFee:'GHS 2000',
        cost: 'GHS 35,000',
        title: 'UAE (Delivery Bike Riders)',
        detail:[
            '2-Year Work Visa',
            'Job',
            'Accommodation (for the first 2 months)',
            'Medical Insurance',
            'Travel Insurance',
            'Flight Ticket',
        ],
        duration: '3 - 8 Weeks',
        salary: '3,650 AED (7.5 AED per delivery)',
        images:['/packages/work_uae.jpg'],
        requirements:[
            'Passport bio page',
            'Passport-size picture (1) white background',
            'Ghana Card (optional)',
            'Yellow fever card',
            'Medical Report',
            'Police Clearance Report',
            'Cyclist Licence (optional, but the candidate must be able to ride motorcycles)',
            'Must be 20 years and above'
        ]
    },

    {
        id: '11',
        title: 'UAE (Security Guards)',
        registerFee:'GHS 2000',
        cost: 'GHS 45,000',
        duration: '3 - 8 Weeks',
        detail:[
            '2-Year Work Visa',
            'Flight Ticket',
            'Accommodation',
            'Medical Insurance',
            'Travel Insurance',
            'Health Insurance',
            'Transportation'
        ],
        salary:'1800 AED to 2200 AED (GHS 7,000 – GHS 9,000)',
        images:['/packages/work_uae.jpg'],
        requirements:[
            'Must be between 20 and 38 years old',
            'Must be of height of 179cm and above',
            'CV',
            'Self-video presentation',
        ]
    },

    {
        id: '12',
        title: 'UAE (Warehouse Helpers)',
        workingDays:'26',
        registerFee:'GHS 2000',
        cost: 'GHS 35,000',
        salary: '1100AED + 50AED attendance allowance',
        detail:[
            '2-year Work Visa',
            'Job',
            'Accommodation',
            'Flight Ticket',
            'Transportation',
            'Meidcal Insurance',
            'Kitches facility provided'
        ],
        duration: '3 - 8 Weeks',
        requirements:[
            'Must be between 21 and 39 years old',
            'Basic English speaking skills',
            'Passport bio page (Scanned copy)',
            'Passport-size picture (1) white background',
            'Police clearance report',
            'Updated CV',
            'Medical Report',
            'Full picture',
            'Will be interviewed via Zoom'
        ],
        images:['/packages/work_uae.jpg'],
        desc:'Direct employment from Ghana'
    },
    {
        id: '13',
        title: 'UAE (Construction)',
        desc:'Direct employment from Ghana',
        salary:'800 AED',
        cost: 'GHS 35,000',
        registerFee:'GHS 2000',
        duration: '3 - 8 Weeks',
        detail:[
            '2-Year Work Visa',
            'Feeding (3 times daily)',
            'Accommodation',
            'Medical Insurance',
            'Travel Insurance',
            'Flight Ticket',
        ],
        requirements:[
            'Passport bio page (Scanned copy)',
            'Passport-size picture (1) white background',
            'Police Clearance Report',
            'Full picture',
            'Medical Report',
        ],
        images:['/packages/work_uae.jpg'],
    },
    {
        id: '14',
        title: 'UAE (Construction Workers)',
        desc:'Direct employment from Ghana',
        workingDays:'26',
        registerFee:'GHS 2000',
        cost: 'GHS 35,000',
        notices:[
            'No Interview, ONLY Requirements',
            'Candidate travels within 3 weeks after signing the offer letter and MoL',
        ],
        salary: '1200 AED + OT',
        images:['/packages/work_uae.jpg'],
        duration: '3 - 8 Weeks',
        detail:[
            '2-Year Work Visa',
            'Job',
            'Accommodation',
            'Flight Ticket',
            'Transportation',
            'Meidcal Insurance',
            'Kitches facility provided'
        ],
        requirements:[
            'Passport bio page (Scanned copy)',
            'Passport-size picture (1) white background',
            'Police clearance report',
            'Medical Report',
            'Full picture',
        ]
    },
    {
        id: '15',
        title:'UAE (Cleaners)',
        desc:'Direct employment from Ghana',
        salary:'1000 AED',
        cost: 'GHS 35,000',
        registerFee:'GHS 2000',
        duration: '3 - 8 Weeks',
        detail:[
            'Work Visa',
            'Job',
            'Accommodation',
            'Flight Ticket',
            'Transportation',
            'Meidcal Insurance',
            'Kitches facility provided'
        ],
        requirements:[
            'Must be between 19 and 32 years old',
            'Passport bio page (Scanned copy)',
            'Passport-size picture (1) white background',
            'Police clearance report',
            'Medical Report',
            'Full picture',
            'Updated CV',
        ],
        images:['/packages/work_uae.jpg'],
    },
    {
        id: '15',
        title:'Serbia',
        cost: 'GHS 65,000',
        fee: 'GHS 30,000',
        duration: '2 - 3 months',
        pow: ['Belgrade, Subotica'],
        ppt: '7 - 10 working days',
        salary:'(500 EUR - 800 EUR)',
        detail:[
            '1-year work contract',
            'Visa (Visa C Tourist 180 days)',
            'Ticket',
            'Accommodation',
            'Medical Insurance',
            'Travel Insurance'
        ],
        registerFee:'GHS 2000',
        requirements:[
            'Passport (fully scanned)',
            'Diploma/certificate of qualification',
            'A complete 12-month personal bank statement',
            'Hotel/Accommodation booking document (English)',
            'Return Ticket booking document (English)',
            'Professional Certificate (if any)',
        ],
        images:['/packages/work_main.jpg']
    },
   
    {
        id: '16',
        title: 'Hungary',
        cost: 'GHS 150,000',
        fee: 'GHS 30,000',
        
        duration: '1 month',
        detail: [
            '3 years work Visa',
            'Travel Insurance',
            'Medical Insurance',
            'Accommodation',
            'Flight ticket'
        ],
        jobs: [
            'Caregiver', 
            'Cleaners', 
            'Warehouse', 
            'Factory work'
        ],
        requirements: [
            'Passport bio page',
            'Ghana Card (if any)',
            'American passport-size picture (white background)', 
            'Any Certificate (if any)'
        ],
        images: ['/packages/work_main.jpg']
    },
    {
        id:'17',
        title: 'Hungary (Seasonal Jobs)',
        pow:[
            'Pest County: Cegled, Debas, Nagykoros',
            'Szabolcs: Szatmar-Bereg Region (Easten Hungary)',
        ],
        notices:[
            'Only men, women and married couples are eligible',
            'Up to 50 years old, motivated, ready to work, with Basic English.'
        ],
        fee:'GHS 10,000',
        cost: 'GHS 65,000',
        duration: '1 month',
        salary: '1100 EUR (after taxes)',
        detail:[
            '6 months work contract',
            'Airpot pickup in Budapest',
            'Transportation',
            'Accommodation',
            'Legal contract with official visa support',
            'Work uniform and tools provided by the employer',
        ],
        requirements:[
            'All pages of your passport in one PDF'
        ],
        images:['/packages/work_main.jpg']
    },
    {
        id: '18',
        title: 'Europe Work Permit',
        cost: '10,000 Euros',        
        duration: '4-6 months',
        detail: [
            'Visa',
            'Travel Insurance',
            'Medical Insurance',
            'Accommodation'
        ],
        jobs: [
            'Security', 
            'Construction Workers', 
            'Factory Workers', 'Excavator Drivers', 
            'Drivers', 
            'Shop/Mall attendants', 
            'Hotel Workers', 
            'Administrative Works'
        ],
        
        images: ['/packages/work_main.jpg']
    },
    {
        id: '19',
        title: 'Japan (Work and Pay)',
        cost: 'GHS 55,000.00',
        registerFee:'GHS 2000',
        // fee: 'GHS 2,000.00',
        detail: [
            'Visa',
            'Flight ticket',
            'Work',
            'Accommodation',
            'Medical insurance',
            'Travel insurance'
        ],
        duration: '4 - 6 months',
        salary: '$3,800 - $6,700 monthly plus allowances',
        jobs: [
            'Teachers (English)', 
            'Nurses', 
            'Caregivers', 
            'Nannies', 
            'Hotel work', 
            'Construction work', 
            'Warehouse work', 
            'Factory work', 
            'Machinery Operators', 
            'Cleaners', 
            'Security', 
            'Mall/Shop Attendants', 
            'Administrative Work', 
            'Chef/Kitchen Assistant', 
            'Beautician', 
            'Farm work'
        ],
        requirements: [
            'Passport Bio page',
            'Passport size picture',
            'Ghana Card (if Any)',
            'Curriculum Vitae (if Any)',
            'Police report',
            'Yellow fever card'
        ],
        images: ['/packages/work_japan.jpg', '/packages/work_japan2.jpg']
    },
    {
        id: '20',
        title: 'Albania',
        cost: 'GHS 60,000',
        fee:'GHS 30,000',
        registerFee:'GHS 2000',
        detail: [
            'Visa (2 year)',
            'Flight Ticket',
            'Accommodation',
            'Medical Insurance',
            'Travel Insurance'
        ],
        duration: '3 - 4 months',
        salary: '800 - 900 Euros',
        jobs: [
            'Warehouse', 
            'Cleaning', 
            'Factory work', 
            'Hotel work'
        ],
        requirements: [
            'Passport',
            'Ghana card',
            'Passport-size picture',
            'Any professional certificate (if any)'
        ],
        images: ['/packages/work_albania.jpg']
    },

    {
        id:'21',
        title:'Albania (E-Visa)',
        jobName:'Baby Sitter',
        workingDays:'5-6 working days with a day off',
        cost: 'GHS 65,000',
        registerFee:'GHS 2000',
        salary: '500 EUR - 600 EUR',
        duration: '2 - 3 months',
        detail:[
            '1-year work contract',
            'Visa (Visa C Tourist 30-90 days)',
            'Flight Ticket',
            'Accommodation',
            'Medical Insurance',
            'Travel Insurance'
        ],
        requirements:[
            'Candidate must not be above 40 years old',
            'Passport bio page',
            'A complete 12-month personal bank statement',
            'Diploma/certificate',
            'Passport-size picture (3.6 X 4.7 cm JPEG)',
        ],
        images:['/packages/work_albania.jpg']
    },

    {
        id: '22',
        title: 'Malaysia',
        cost: 'GHS 63,000',
        fee: 'GHS 30,000',
        registerFee:'GHS 2000',
        detail: [
            'Visa',
            'Job',
            'Flight Ticket',
            'Accommodation',
            'Medical and Travel Insurance'
        ],
        duration: '2 - 3 months',
        salary: 'GHS 10,000 – 15,000',
        jobs: [
            'Home care', 
            'Cleaning', 
            'Mechanics', 
            'Electricians', 
            'Construction work', 
            'Factory work', 
            'Warehouse work'
        ],
        images:['/packages/work_main.jpg']
    },
    {
        id: '23',
        title: 'Poland',
        cost: 'GHS 150,000',
        fee: 'GHS 13,000',
        detail: [
            'Visa (3 years — Renewal)',
            '⁠Accommodation', 
            '⁠Job', 
            '⁠Medical Insurance', 
            '⁠Travel Insurance', 
            'Flight',

        ],
        duration: '6-9 months',
        salary: '£15 - £20 per hour',
        jobs: [
            "Security", 
            "Warehouse", 
            'Factory', 
            'Cleaning', 
            'Hotel', 
            'Construction', 
            'Shop attendant' 
        ],
        images:['/packages/work_poland.jpg']
    }
];


export const SideJobData: ISideJob[] = [
    {
        id:'1',
        title: 'Japan',
        price: 'GHS 55,000',
        description:'Work and Pay'
    },
    {
        id:'2',
        title:'Germany',
        price:'GHS 5,000',
        description:'Agric'
    },
    {
        id:'3',
        title: 'Germany',
        price:'15,000 EUROS',
        description:'Work'
    },
    {
        id:'4',
        title:'Kuwait',
        price:'GHS 45,000',
    },
    {
        id:'5',
        title:'Qatar',
        price:'GHS 35,000',
    },
    {
        id:'6',
        title:'Poland',
        price:'GHS 10,000',
        description: 'Pay Little'
    }
]