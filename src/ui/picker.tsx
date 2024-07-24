type DataPicker = {
    labelFor: HTMLLabelElement,
    labelText: string,
    options: [],
}

export default function Picker(
    {
        labelText,
        options,
    }: DataPicker
) {
    return (
        <label>{labelText}
            <select>
                {options.map((option) => {
                    return (
                        <option value={option}>{option}</option>
                    );
                })}
            </select>
        </label>
    );
}