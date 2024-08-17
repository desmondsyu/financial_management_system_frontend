import type { Textfield } from "../lib/definitions";

export default function Textfield(
    {
        type,
        label,
        onChange,
        placeholder,
        disabled,
        required,
        value,
        name,
        step,
        min,
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
                name={name}
                value={value}
                step={step}
            />
        </div>
    );
}