import React from 'react'

 const SellerSidebar = (props) => {

    const handleListClick = ({target}) => {
        const listItems = document.querySelectorAll("li");
        listItems.forEach(item => {
            item.classList.remove("bg-slate-700");
        });
        target.classList.add("bg-slate-700");
        props.selector(target.id.split("-")[2]);
    }

    const listClasses = "pl-10 border-b-2 border-slate-800 p-3 pt-4 active:bg-slate-700 hover:bg-slate-800 transition-all ease-in  hover:cursor-pointer"

    const sideItems = ["dashboard", "add Product", "products", "orders", "ratings"]

  return (
    <div className="w-62 text-gray-200">
    <ul style={{listStyleType:"none"}}>
        {sideItems.map(item => (
            <li
                id={`seller-side-${item}`}
                className={listClasses}
                onClick={handleListClick}
               >
                {String.prototype.charAt.call(item, 0).toUpperCase() + item.slice(1)}
            </li>
        ))}
    </ul>
</div>
  )
}

export default SellerSidebar;