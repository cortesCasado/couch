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

/**
 * @param  {Object} options - Options to be added to the select.
 * @param  {any} value - Value of the field.
 * @param  {function} onChange - Callback function to be called when field is changed.
 * @param  {string} name - Name of the field.
 * @param  {string} label - Label of the field.
 */
 export const FieldSelectorBox = ({ options, value, onChange, name, label = "", multiple = false, required = false }) => {
    return (
        <div className="w-full py-2">
            <label className="pl-2 font-medium">{label}
                <select multiple={multiple} value={value} onChange={onChange} name={name} className="form-select appearance-none
                    w-full
                    text-lg
                    font-normal
                    text-black
                    bg-gray-200 bg-clip-padding bg-no-repeat
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    ml-2
                    px-2
                    py-1
                    focus:text-black focus:bg-white focus:border-amber-50 focus:outline-none" aria-label="Default select example"
                    required={required}>

                    {options.map(option => (<option className='bg-gray-200' key={option.value} value={option.value}>{option.label}</option>))}
                </select>
            </label>
        </div>
    );
};