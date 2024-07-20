import AuthCodeForm from "../../ui/login/authcode-form";

export default function Page(){
    const label = "Reset Password";
    return(
        <div className="flex justify-center items-center justify-center items-center pt-20">
            <AuthCodeForm label={label} />
        </div>
    );
}