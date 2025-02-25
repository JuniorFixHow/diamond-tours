import { IJob } from "../types/Types";

export const JobData: IJob[] = [
    {
        id: '1',
        title: 'Middle East (Dubai, Qatar, Kuwait)',
        // fee: 'GHS 2,000.00',
        cost: 'GHS 35,000.00',
        cost2: 'GHS 65,000.00',
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
        id: '2',
        title: 'Australia',
        cost: 'GHS 250,000',
        fee: 'GHS 100,000',
        detail: [
            '3 years work Visa',
            'Travel Insurance',
            'Medical Insurance',
            'Accommodation'
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
            'Factory work (field operators and assistants)', 
            'Construction (mason, electricians, forklift operators, excavator operators, drivers, wheel load operators, truck drivers, etc)', 
            'Hotel Workers (cleaners, waiters, helpers, etc)'
        ],
        images: ['/packages/work_australia.jpg']
    },
    {
        id: '3',
        title: 'Luxembourg & Finland',
        cost: 'GHS 120,000',
        fee: 'GHS 35,000',
        detail: [
            '3 years work Visa',
            'Travel Insurance',
            'Medical Insurance',
            'Accommodation',
            'Flight ticket'
        ],
        duration: 'Close to instant',
        salary: '14 Euros per hour',
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
        images: ['/packages/work_luxembourg.jpg', '/packages/work_luxembourg2.jpg']
    },
    {
        id: '4',
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
        id: '5',
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
        id: '6',
        title: 'Japan (Work and Pay)',
        cost: 'GHS 53,000.00',
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
        id: '7',
        title: 'Albania',
        cost: 'GHS 150,000.00',
        detail: [
            'Visa (2 year - Renewable)',
            'Ticket',
            'Accommodation',
            'Medical Insurance',
            'Travel Insurance'
        ],
        duration: '3 - 4 months',
        salary: '1500 Euros',
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
        id: '8',
        title: 'Malaysia',
        cost: 'GHS 63,000',
        fee: 'GHS 2,000',
        detail: [
            'Visa',
            'Job',
            'Flight Ticket',
            'Accommodation',
            'Medical and Travel Insurance'
        ],
        duration: '1 - 2 months',
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
    }
];