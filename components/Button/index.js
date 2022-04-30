/**
 * Returns the button object
 * @param  {string} type - The type of the button.
 * @param  {string} color - The color of the button: primary, secondary or grey.
 * @param  {string} className - The aditional class name of the button.
 * @param  {function} onClick - The function to be executed when the button is clicked.
 * @param  {any} children - The content of the button.
 * @param  {boolean} disabled - If the button is disabled or not.
 */
 export const Button = ({type = "button", color = "primary", disabled = false, className = "", onClick, children}) =>
 {
     const colorStyle = {
         "primary": "mx-2 my-2 bg-[#ffaa00] transition duration-150 ease-in-out hover:[bg-#ffaa00] rounded text-white px-6 py-2 text-s",
     };
 
     return(
         <button type={type}
         disabled={disabled}
         className={colorStyle[color]+ " " + className}
         onClick={onClick}> {children} </button>  
     );
 };