/**
 * Return the field text object.
 * @param  {string} label - Label of the field.
 * @param  {any} value - Value of the field.
 * @param  {string} placeholder - Placeholder of the field.
 * @param  {string} name - Name of the field.
 * @param  {function} onChange - Callback function to be called when field is changed.
 */
export const FieldTextBox = ({ label, value, id, placeholder = "", min = null, pattern = null, type = "text", name, onChange, required = false }) => {
    return (
        <div className="w-full">
            <label className="pl-2 font-medium" htmlFor={id}>{label}
                <input type={type} name={name} id={id} value={value} min={min} maxLength="20" pattern={pattern} onChange={onChange} placeholder={placeholder} className="mx-2 my-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-blue-bondi" required={required}></input>
            </label>
        </div>
    );
};

export const FieldTextAreaBox = ({ label, value, id, placeholder = "", min = null, pattern = null, type = "text", name, onChange, required = false }) => {
    return (
        <div className="w-full">
            <label className="pl-2 font-medium" htmlFor={id}>{label}
                <textarea name={name} id={id} value={value} min={min} pattern={pattern} maxLength="250" onChange={onChange} placeholder={placeholder} className="mx-2 my-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-blue-bondi" required={required}></textarea>
            </label>
        </div>
    );
};