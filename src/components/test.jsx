
import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { TieredMenu } from 'primereact/tieredmenu';
import {useNavigate} from "react-router-dom";

const Test = () => {
    const navigate = useNavigate();
    const menu = useRef(null);
    const items = [
        // {
        //     label: 'File',
        //     icon: 'pi pi-file',
        //
        //     items: [
        //         {
        //             label: 'New',
        //             icon: 'pi pi-plus',
        //             items: [
        //                 {
        //                     label: 'Document',
        //                     icon: 'pi pi-file'
        //                 },
        //                 {
        //                     label: 'Image',
        //                     icon: 'pi pi-image'
        //                 },
        //                 {
        //                     label: 'Video',
        //                     icon: 'pi pi-video'
        //                 }
        //             ]
        //         },
        //         {
        //             label: 'Open',
        //             icon: 'pi pi-folder-open',
        //             command: () => {navigate('/products/000')}
        //         },
        //         {
        //             label: 'Print',
        //             icon: 'pi pi-print',
        //             command: () => {navigate('/products/111')}
        //         }
        //     ]
        // },
        // {
        //     label: 'Edit',
        //     icon: 'pi pi-file-edit',
        //     items: [
        //         {
        //             label: 'Copy',
        //             icon: 'pi pi-copy'
        //         },
        //         {
        //             label: 'Delete',
        //             icon: 'pi pi-times'
        //         }
        //     ]
        // },
        // {
        //     label: 'Search',
        //     icon: 'pi pi-search'
        // },
        // {
        //     separator: true
        // },
        // {
        //     label: 'Share',
        //     icon: 'pi pi-share-alt',
        //     items: [
        //         {
        //             label: 'Slack',
        //             icon: 'pi pi-slack'
        //         },
        //         {
        //             label: 'Whatsapp',
        //             icon: 'pi pi-whatsapp'
        //         }
        //     ]
        // }
    ];

    function setOnClick(param) {

        console.log(menu);
    }

    return (
        <div className="card flex justify-content-center">
            <TieredMenu model={items} popup ref={menu} breakpoint="767px" onClick={(e) => setOnClick(e)} />
            <Button label="Show" onClick={(e) => menu.current.toggle(e)} />

        </div>
    )
};

export default Test;
