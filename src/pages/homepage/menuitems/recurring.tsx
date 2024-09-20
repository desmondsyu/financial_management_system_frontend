import { getRecurringRules } from "../../../lib/data";

export default function Recurring() {
    const handleClick = async (e: React.MouseEvent<HTMLParagraphElement>)=> {
        try{
            const response = await getRecurringRules();
            console.log(response);
        } catch(error){
            console.error(error);
        }
    }

    return (
        <p onClick={handleClick}>Recurring Transactions</p>
    );
}