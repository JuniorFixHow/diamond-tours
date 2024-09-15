import { BlogPostProps } from "../types/Types"

export const SearchBlog = (data:BlogPostProps[], query:string)=>{
    return(
        data.filter((item)=>{
            return query === '' ? item : Object.values(item)
            .join(' ')
            .toLowerCase()
            .includes(query.toLowerCase())
        })
    )
}