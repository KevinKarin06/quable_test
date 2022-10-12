import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import { Delete } from '@mui/icons-material';
import Image from 'next/image';
import img from '../public/default_product.png'

export default function Table(props) {

    const router = useRouter()

    const columns = [
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'title', headerName: 'Title', width: 300 },
        { field: 'type', headerName: 'Type', width: 300 },
        { field: 'body', headerName: 'Description', width: 500, },
        {
            field: 'image', headerName: 'Thumbnail', sortable: false, width: 100,
            renderCell: (cellValues) => {
                return (
                    <>
                        <Image src={cellValues.row.image}
                            alt={cellValues.row.title}
                            height={100}
                            width={100}
                        />
                    </>
                );
            },
        },
        {
            field: 'delete', headerName: 'Action', sortable: false, width: 100,
            renderCell: (cellValues) => {
                return (
                    <>
                        <IconButton
                            color="secondary"
                            aria-label="add an alarm"
                            onClick={(event) => props.handelDeleteClicked(event, cellValues)}
                        >
                            <Delete />
                        </IconButton>
                    </>
                );
            },
        },
    ];

    const rows = props.products.map(el => {
        return {
            id: el.id,
            title: el.title,
            type: el.product_type ?? "Test",
            body: el.body_html,
            image: (el.image) ? el.image.src : img,
            delete: el.id
        }
    })

    return (
        <div style={{ height: '70vh', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', aligItems: 'center' }}>
                <h2>Product List</h2>
                <Box sx={{ '& button': { m: 1 } }}>
                    <Button variant="contained" size="large" onClick={() => { router.push('/products/create') }}>Add New</Button>
                </Box>
            </div>
            <DataGrid
                rows={rows}
                columns={columns}
                autoPageSize
                rowsPerPageOptions={[10]}
                disableColumnMenu
            />
        </div>
    )
}

