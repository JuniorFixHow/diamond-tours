import { ICard } from "../types/Types";

export const cardData:ICard[] = [
    {
        id:'1',
        name:'Passport',
        requirements:[
            'Ghana Card',
            'Birth Certificate',
            '2 White Background Passport Pictures'
        ],
        prices:[
          {duration:'24 hours', cost:'GHC 3000'},
          {duration:'3 days', cost:'GHC 2800'},
          {duration:'1 week', cost:'GHC 2300'},
        ]
    },

    {
        id:'2',
        name:'Birth Certificate',
        prices:[
            {duration:'3 days to 1 week', cost:'GHC 650'},
            {duration:'2 days to 3 weeks', cost:'GHC 550'}
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
            {duration:'3 to 5 days', cost:'GHC 2100'}
        ]
    }
]