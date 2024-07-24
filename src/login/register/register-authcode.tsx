import AuthCodeForm from "../../ui/login/authcode-form";

export default function Page() {
    const label = "Register";
    return (
        <div className="flex justify-center items-center pt-20">
            <AuthCodeForm label={label} />
        </div>
    );
}