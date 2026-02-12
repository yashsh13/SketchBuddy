interface SearchBarProps{
    reference: any,
    onChangeHandler?: ()=> void 
}

export default function SearchBar({ reference, onChangeHandler}: SearchBarProps){
    return(
        <input type="text" placeholder="Search" ref={reference} onChange={onChangeHandler} className="w-[80%] border focus:outline-none border-gray-500 rounded-2xl shadow-xl py-2 px-4 text-lg" />
    )
}