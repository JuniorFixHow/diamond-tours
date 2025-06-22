import { ICard } from "../types/Types";

export const CardData:ICard[] = [
    {
        id:'1',
        name:'Passport',
        requirements:[
            'Ghana Card',
            'Birth Certificate',
            'Passport Pictures',
        ],
        prices:[
          {duration:'24 hours', cost:'GHC 3000'},
          {duration:'3 days', cost:'GHC 2800'},
          {duration:'1 week', cost:'GHC 2300'},
          {duration:'1 week', note:'Without birth certificate', cost:'GHC 3000'},
        ]
    },

    {
        id:'2',
        name:'Birth Certificate',
        requirements:[
            'Mother\'s Ghana Card',
            'Application Details'
        ],
        prices:[
            {duration:'1 week', cost:'GHC 650'},
            {duration:'2 weeks to 3 weeks', cost:'GHC 550'}
        ]
    },

    {
        id:'3',
        name:'Ghana Card',
        price:'Variable',
        status:['New', 'Replacement', 'Name Change']
    },

    {
        id:'4',
        name:'Marriage Certificate',
        prices:[
            {duration:'5 to 7 days', cost:'GHC 2100'}
        ]
    },
    {
        id:'5',
        name:'Bank Statement',
        status:[
            'Sponserhip Statement',
            'Personal Statement',
            'Live Statement'
        ]
    }
]