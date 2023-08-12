interface SearchProps {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    searchTerm: string;
}
    
export const Search = ({ handleChange, searchTerm }: SearchProps) => {
    return (
        <div className="w-full py-8">
            <input placeholder={'Search ......'} className="p-2.5 text-3xl rounded-lg text-black bg-white w-full h-16" type="text" value={searchTerm} onChange={handleChange} />
        </div>
    );
}
