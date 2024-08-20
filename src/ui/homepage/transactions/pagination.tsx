import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface PaginationParams {
    page: number,
    size: number,
    sort: string[],
}

interface PaginationProps {
    paginationParams: PaginationParams;
    setPaginationParams: React.Dispatch<React.SetStateAction<PaginationParams>>;
    totalPages: number;
}

export default function Pagination({ paginationParams, setPaginationParams, totalPages }: PaginationProps,) {
    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPaginationParams((prevData) => ({
                ...prevData,
                page: newPage,
            }));
        }
    };

    if (totalPages === 0) {
        return null
    };

    return (
        <div className="flex justify-center space-x-2 mt-3 w-full">
            <ArrowLeftIcon
                className={clsx('w-6 h-6 cursor-pointer', {
                    'text-gray-300 pointer-events-none': paginationParams.page === 0,
                })}
                onClick={() => handlePageChange(paginationParams.page - 1)}
            />
            <span className="text-md font-medium">
                Page {paginationParams.page + 1} of {totalPages}
            </span>
            <ArrowRightIcon
                className={clsx('w-6 h-6 cursor-pointer', {
                    'text-gray-300 pointer-events-none': paginationParams.page === totalPages - 1,
                })}
                onClick={() => handlePageChange(paginationParams.page + 1)}
            />
        </div>
    );
}