import clsx from "clsx";

interface PaginationProps  {
    current : number;
    total : number;
    onTapPrev? : ()=> void,
    onTapNext? : ()=> void,
}

const Pagination =({current, total, onTapPrev, onTapNext} : PaginationProps)=>{
    const ItemPagination = ({isCurrent, value, onClick} : {isCurrent : boolean, value :number,  onClick? : ()=> void,
       })=>{
        return  <div onClick={onClick} className={clsx('rounded-full  px-3 py-1 mx-2 flex items-center justify-center', isCurrent && 'bg-primary text-white')}>{value}</div>;
    }
    return (
        <div className="flex flex-row">
            {current > 1 && <ItemPagination onClick={onTapPrev} value={current -1 } isCurrent={false}/>}
            <ItemPagination value={current  } isCurrent={true}/>
            {(current  < total) && <ItemPagination onClick={onTapNext} value={current  +1} isCurrent={false}/>}
        </div>
    );
}

export default Pagination;