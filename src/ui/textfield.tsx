type Textfield = {
    type: "text" | "email" | "number" | "date" | "button",
    label?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    placeholder?: string,
    disabled: boolean,
    required: boolean,
};

export default function Textfield(
    {
        type,
        label,
        onChange,
        placeholder,
        disabled,
        required,
    }: Textfield
) {
    return (
        <div className="p-2.5">
            <label className="block mb-2 text-md font-medium text-gray-900">{label}</label>
            <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type={type}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
            />
        </div>
    );
}