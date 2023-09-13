import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { Button,Breadcrumb } from 'react-bootstrap';
import axios from 'axios';
function paginator(items, current_page, per_page_items) {
    let page = current_page || 1,
        per_page = per_page_items,
        offset = (page - 1) * per_page,
        paginatedItems = items.slice(offset).slice(0, per_page_items),
        total_pages = Math.ceil(items.length / per_page);
    console.log();

    return {
        page: page,
        per_page: per_page,
        pre_page: page - 1 ? page - 1 : null,
        next_page: total_pages > page ? page + 1 : null,
        total: items.length,
        total_pages: total_pages,
        data: paginatedItems
    };

}
export default function Shop() {
    const[carrierDetails,setCarrierDetails]=useState([])

    useEffect(() => {
        axios.get("http://localhost:4000/order/view-product")
            .then((response) => {
                console.log(response);
                const details = response.data.details;
                setCarrierDetails(details)
            })
    }, [])
    const count = Math.ceil(carrierDetails.length / 3);
    console.log(count);
    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        setPage(paginator(carrierDetails, value, 3).page);
    };
    const [checked, setChecked] = React.useState([]);
    const handleOnChange = (e, index) => {
        let prev = checked;
        let itemIndex = prev.indexOf(index);
        if (itemIndex !== -1) {
            prev.splice(itemIndex, 1);
        } else {
            prev.push(index);
        }
        setChecked([...prev]);
    };
    return (
        <>
         {/* <Breadcrumb style={{ marginTop: 150 }}>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/add-items">
                    Add items
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/add-items">
                    Back to Page
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Data</Breadcrumb.Item>
            </Breadcrumb> */}
           
               <div>
                <div className='col-6 col-md-6 col-lg-6'>
                 <img src=''></img>
                </div>
                <div className='col-6 col-md-6 col-lg-6'>

                </div>
               </div>
           
        </>
    )
}
