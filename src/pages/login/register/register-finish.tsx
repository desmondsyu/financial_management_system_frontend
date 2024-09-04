import Button from "../../../ui/button";

export default function Page() {
    return (
        <div className="flex justify-center items-center pt-20">
            <div>
                <p className="text-center text-lg font-bold">Congratulations! You have registered!</p>
                <Button label="Go back to login" navigateTo="/" disabled={false} />
            </div>
        </div>
    );
}