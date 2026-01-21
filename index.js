

document.addEventListener("DOMContentLoaded", loaded_document_handler);


function loaded_document_handler()
{
    const image = document.querySelector('img');
    image.addEventListener("mouseover", function(e){
        e.target.style.scale = 2;
    })
    image.addEventListener("mouseout", function(e){
        e.target.style.scale = 1;
    })
    document.addEventListener("change", inductotance_react_resist_table_build);
    setInterval(color_toggle, 2000);
    inductotance_react_resist_table_build()
    

}

function color_toggle()
{
    
    const text = document.getElementById("text");
    if(text.style.color == "red")
    {
        text.style.color = "green";
    }
    else
    {
        text.style.color = "red";
    }
}

function inductotance_react_resist_table_build()
{
    const f_start = Number(document.getElementById("frequency_start_value_range").value);
    const f_count = Number(document.getElementById("frequency_values_count").value);
    const f_step = Number(document.getElementById("frequency_step_value_range").value);
    const L_uH_start = Number(document.getElementById("inductance_start_value_range").value);
    const L_count = Number(document.getElementById("inductance_values_count").value);
    const L_uH_step = Number(document.getElementById("inductance_step_value_range").value);

    HTML = `
        <tr> 
            <th> Frequency (Hz) </th> <th> Inductance (uH) </th> <th> Reactivity (Ohm) </th> 
        </tr>
    `;

    const Pi = 3.14;
    for (let f_number = 0, f = f_start;  f_number < f_count; f_number++, f += f_step)
    {    
        const color_property_text = (f_number & 1) ? `bgcolor= #EBDFCE` : `bgcolor="#EEEEDD"`;
        for(let L_number = 0, L_uH = L_uH_start; L_number < L_count; L_number++, L_uH += L_uH_step)
        {
            const L = L_uH / 1000000.0;
            XL = (2 * Pi * f * L).toFixed(2);
            HTML += `<tr ${color_property_text}> 
                        <td> ${f} </td> <td> ${L_uH} </td> <td> ${XL} </td> 
                    </tr>`;
        }
    }
    let table_div = document.getElementById("table_div");
    
    const table_new = document.createElement("table")
    table_new.innerHTML = HTML;
    
    const table_old = table_div.firstElementChild;
    if((table_div.childElementCount > 0) && (table_old != null) && (table_old != undefined))
    {
        table_div.removeChild(table_old);
    }
    table_div.appendChild(table_new);
}